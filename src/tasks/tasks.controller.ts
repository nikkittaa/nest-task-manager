import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus, TaskStatus as TaskStatusEnum } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task as TaskEntity } from './task.entity';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TasksController');
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query() filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    this.logger.verbose(
      `User "${user.username}" retrieving all tasks. Filters: ${JSON.stringify(filterDto)}`,
    );
    if (Object.keys(filterDto).length > 0) {
      return this.tasksService.getTasksWithFilters(filterDto, user);
    }

    return this.tasksService.getAllTasks(user);
  }

  // @Get()
  // getTasks(@Query() filterDto: GetTasksFilterDto) : Task[]{
  //     if(Object.keys(filterDto).length > 0){
  //         //filter tasks
  //         return this.tasksService.getFilteredTasks(filterDto);
  //     }

  //     return this.tasksService.getAllTasks();
  // }

  @Get('/:id')
  getTaskById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<TaskEntity> {
    return this.tasksService.getTaskById(id, user);
  }

  // @Get('/:id')
  // getTaskById(@Param('id') id : string) : Task {
  //     return this.tasksService.getTaskById(id);
  // }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<TaskEntity> {
    this.logger.verbose(
      `User "${user.username}" creating a new task. Data: ${JSON.stringify(createTaskDto)}`,
    );
    return this.tasksService.createTask(createTaskDto, user);
  }

  // @Post()
  // createTask(@Body() createTaskToDo: CreateTaskDto) : Task{
  //     return this.tasksService.createTask(createTaskToDo);
  // }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string, @GetUser() user: User): void {
    this.tasksService.deleteTaskById(id, user);
  }

  // @Delete('/:id')
  // deleteTaskById(@Param('id') id : string) : void{
  //     this.tasksService.deleteTaskById(id);
  // }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: User,
  ): Promise<TaskEntity> {
    return this.tasksService.updateTaskStatus(
      id,
      user,
      updateTaskStatusDto.status,
    );
  }
  // @Patch('/:id/status')
  // updateStatus(@Param('id') id : string ,@Body() updateTaskStatusDto : UpdateTaskStatusDto ) : Task | string{
  //     const {status} = updateTaskStatusDto;
  //     return this.tasksService.updateStatus(id, status);
  // }
}
