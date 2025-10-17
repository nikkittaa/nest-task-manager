import { Test } from "@nestjs/testing";
import { TaskRepository } from "./task.repository";
import { TasksService } from "./tasks.service";

const mockTaskRepository = () => ({
    getAllTasks: jest.fn(),
});

const mockUser = {
    username: 'Alice',
    id: '123',
    password: '123456',
    tasks: [],
}

describe('TasksService', () => {
    let tasksService: TasksService;
    let taskRepository: jest.Mocked<TaskRepository>;

    beforeEach(async() => {
        const module = await Test.createTestingModule({
            providers: [TasksService, {provide: TaskRepository, useFactory: mockTaskRepository} ],
        }).compile();
        tasksService = await module.get(TasksService);
        taskRepository = await module.get(TaskRepository);
    });

    describe('getAllTasks', () => {
        it('should return all tasks of a user', async () => {
            (taskRepository.getAllTasks as jest.Mock).mockResolvedValue([]);
            const result = await tasksService.getAllTasks(mockUser);
            expect(result).toEqual([]);
        });
    });

    
});
