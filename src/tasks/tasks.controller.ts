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
import { Task, TaskStatus, TaskStatus as TaskStatusEnum } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task as TaskEntity } from './task.entity';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, description: 'Return all tasks.', type: [TaskEntity] })
  @ApiQuery({ name: 'filterDto', type: GetTasksFilterDto, required: false })
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
  @ApiOperation({ summary: 'Get a task by id' })
  @ApiResponse({ status: 200, description: 'Returns a task with given id', type: [TaskEntity] })
  @ApiParam({ name: 'id', type: String, description: 'The id of the task' })
  getTaskById(@Param('id') id: string): Promise<TaskEntity> {
    return this.tasksService.getTaaskById(id);
  }

  // @Get('/:id')
  // getTaskById(@Param('id') id : string) : Task {
  //     return this.tasksService.getTaskById(id);
  // }

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'Returns the created task.', type: TaskEntity })
  @ApiBody({ schema: { type: 'object', properties: { title: { type: 'string' }, description: { type: 'string' } } } })
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.tasksService.createTask(createTaskDto);
  }

  // @Post()
  // createTask(@Body() createTaskToDo: CreateTaskDto) : Task{
  //     return this.tasksService.createTask(createTaskToDo);
  // }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a task by id' })
  @ApiResponse({ status: 200, description: 'Returns nothing', type: TaskEntity })
  @ApiParam({ name: 'id', type: String, description: 'The id of the task' })
  deleteTaskById(@Param('id') id: string): void {
    this.tasksService.deleteTaskById(id);
  }

  // @Delete('/:id')
  // deleteTaskById(@Param('id') id : string) : void{
  //     this.tasksService.deleteTaskById(id);
  // }

  @Patch('/:id/status')
  @ApiOperation({ summary: 'Update the status of a task by id' })
  @ApiResponse({ status: 200, description: 'Returns the updated task.', type: TaskEntity })
  @ApiParam({ name: 'id', type: String, description: 'The id of the task' })
  @ApiBody({ schema: { type: 'object', properties: { status: { type: 'string', enum: Object.values(TaskStatus) } } } })
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
