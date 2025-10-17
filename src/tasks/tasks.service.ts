import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { Task as TaskEntity } from './task.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
  constructor(private taskRepository: TaskRepository) {}
  // private tasks : Task[]= [];

  getAllTasks(user: User): Promise<Task[]> {
    return this.taskRepository.getAllTasks(user);
  }

  // getAllTasks(): Task[]{
  //     return this.tasks;
  // }

  async createTask(
    createTaskToDo: CreateTaskDto,
    user: User,
  ): Promise<TaskEntity> {
    return this.taskRepository.createTask(
      createTaskToDo.title,
      createTaskToDo.description,
      user,
    );
  }

  // createTask(createTaskToDo: CreateTaskDto) : Task{
  //     const task : Task = {
  //         id : uuidv4().toString(),
  //         title: createTaskToDo.title,
  //         description: createTaskToDo.description,
  //         status: TaskStatus.OPEN,
  //     }

  //     this.tasks.push(task);
  //     return task;
  // }

  async getTaskById(id: string, user: User): Promise<TaskEntity> {
    return this.taskRepository.findOne(id, user);
  }

  // getTaskById(id : string) : Task {
  //     const task = this.tasks.find(task => task.id === id);

  //     if(!task){
  //         throw new NotFoundException('Task not found');
  //     }

  //     return task;
  // }

  getTasksWithFilters(
    filterDto: GetTasksFilterDto,
    user: User,
  ): Promise<Task[]> {
    return this.taskRepository.getTasksWithFilters(filterDto, user);
  }

  // getFilteredTasks(filterDto:  GetTasksFilterDto) : Task[]{
  //     const { status, search} = filterDto;
  //     let tasks : Task[] = this.tasks;

  //     if(status){
  //         tasks = tasks.filter(task => task.status === status);
  //     }

  //     if(search){
  //         tasks = tasks.filter(task => task.title.toLowerCase().includes(search.toLowerCase()) || task.description.toLowerCase().includes(search.toLowerCase()));
  //     }

  //     return tasks;

  // }

   deleteTaskById(id: string, user: User): Promise<TaskEntity> {
    return this.taskRepository.deleteTask(id, user);
  }

  // deleteTaskById(id : string) : void {
  //     const task = this.getTaskById(id);
  //     this.tasks = this.tasks.filter(task => task.id !== id);
  // }

  updateTaskStatus(
    id: string,
    user: User,
    status: TaskStatus,
  ): Promise<TaskEntity> {
    return this.taskRepository.updateTaskStatus(id, user, status);
  }

  // updateStatus(id: string, status : TaskStatus) : Task | string{
  //     const task = this.getTaskById(id);
  //     if(!task){
  //         return "No such task exists";
  //     }

  //     task.status = status;
  //     return task;

  //}
}
