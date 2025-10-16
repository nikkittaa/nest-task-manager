import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task as TaskEntity } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    if (Object.keys(filterDto).length > 0) {
      return this.tasksService.getTasksWithFilters(filterDto);
    }

    return this.tasksService.getAllTasks();
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
  getTaskById(@Param('id') id: string): Promise<TaskEntity> {
    return this.tasksService.getTaaskById(id);
  }

  // @Get('/:id')
  // getTaskById(@Param('id') id : string) : Task {
  //     return this.tasksService.getTaskById(id);
  // }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.tasksService.createTask(createTaskDto);
  }

  // @Post()
  // createTask(@Body() createTaskToDo: CreateTaskDto) : Task{
  //     return this.tasksService.createTask(createTaskToDo);
  // }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): void {
    this.tasksService.deleteTaskById(id);
  }

  // @Delete('/:id')
  // deleteTaskById(@Param('id') id : string) : void{
  //     this.tasksService.deleteTaskById(id);
  // }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<TaskEntity> {
    return this.tasksService.updateTaskStatus(id, updateTaskStatusDto.status);
  }
  // @Patch('/:id/status')
  // updateStatus(@Param('id') id : string ,@Body() updateTaskStatusDto : UpdateTaskStatusDto ) : Task | string{
  //     const {status} = updateTaskStatusDto;
  //     return this.tasksService.updateStatus(id, status);
  // }
}
