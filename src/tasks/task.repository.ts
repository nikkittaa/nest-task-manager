import { Repository } from 'typeorm';
import { Task } from './task.entity';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatus } from './task.model';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from '../auth/user.entity';

@Injectable()
export class TaskRepository {
  private logger = new Logger('TaskRepository');
  constructor(
    @InjectRepository(Task)
    private repository: Repository<Task>,
  ) {}

  async findOne(id: string, user: User): Promise<Task> {
    const found = await this.repository.findOne({ where: { id, user } });

    if (!found) {
      throw new NotFoundException('Task not found');
    }

    return found;
  }

  async getAllTasks(user: User): Promise<Task[]> {
    return this.repository.find({ where: { user } });
  }

  async getTasksWithFilters(
    filterDto: GetTasksFilterDto,
    user: User,
  ): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.repository.createQueryBuilder('task');

    query.where({ user });

    if (status) {
      query.andWhere('(task.status = :status)', { status });
    }

    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      this.logger.error(
        `Error fetching tasks for user "${user.username}". Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createTask(
    title: string,
    description: string,
    user: User,
  ): Promise<Task> {
    const task = await this.repository.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user: user,
    });

    await this.repository.save(task);
    return task;
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const found = await this.findOne(id, user);
    await this.repository.delete(id);
  }

  async updateTaskStatus(
    id: string,
    user: User,
    status: TaskStatus,
  ): Promise<Task> {
    const task = await this.findOne(id, user);
    task.status = status;
    await this.repository.save(task);
    return task;
  }
}
