import $api from "../http";
import { AxiosResponse } from "axios";
import { Todo } from "../types/Todo";

export default class TodoService {
    static async addTodo(todo: string, deadline: number, createdAt: number): Promise<AxiosResponse<Todo>>{
        return $api.post('/addTodo', {todo, createdAt, deadline})
    }
    static async getTodos(): Promise<AxiosResponse<Todo[]>> {
        return $api.get('/getTodos')
    }
    static async deleteTodo(createdAt: number): Promise<AxiosResponse<Todo>> {
        return $api.delete('/deleteTodo?createdAt=' + createdAt)
    }
    static async editTodo(createdAt: number, editedTodo: string): Promise<AxiosResponse<Todo>>{
        return $api.put('/editTodo?createdAt=' + createdAt, {editedTodo})
    }
    static async setDone(createdAt: number): Promise<AxiosResponse<Todo>> {
        return $api.put('/setDone?createdAt=' + createdAt)
    }
    static async setUndone(createdAt: number): Promise<AxiosResponse<Todo>> {
        return $api.put('/setDone?createdAt=' + createdAt)
    }
    static async deleteAll(): Promise<AxiosResponse<any>> {
        return $api.delete('/deleteAll')
    }
}