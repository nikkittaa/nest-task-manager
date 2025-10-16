import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { Task as TaskEntity } from './task.entity';
import { v4 as uuidv4} from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';


@Injectable()
export class TasksService {
    
    constructor(
        private taskRepository : TaskRepository){}
    // private tasks : Task[]= [];

    getAllTasks() : Promise<Task[]>{
        return this.taskRepository.getAllTasks();
    }

    // getAllTasks(): Task[]{
    //     return this.tasks;
    // }

    async createTask(createTaskToDo: CreateTaskDto) : Promise<TaskEntity>{
        return this.taskRepository.createTask(createTaskToDo.title, createTaskToDo.description);
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

    async getTaaskById(id : string) : Promise<TaskEntity>{
        return this.taskRepository.findOne(id);

    }

    // getTaskById(id : string) : Task {
    //     const task = this.tasks.find(task => task.id === id);

    //     if(!task){
    //         throw new NotFoundException('Task not found');
    //     }

    //     return task;
    // }

    getTasksWithFilters(filterDto: GetTasksFilterDto) : Promise<Task[]>{
        return this.taskRepository.getTasksWithFilters(filterDto);
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

    deleteTaskById(id: string) : Promise<void>{
        return this.taskRepository.deleteTask(id);
    }

    // deleteTaskById(id : string) : void {
    //     const task = this.getTaskById(id);
    //     this.tasks = this.tasks.filter(task => task.id !== id);
    // }

    updateTaskStatus(id: string, status: TaskStatus) : Promise<TaskEntity>{
        return this.taskRepository.updateTaskStatus(id, status);
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
