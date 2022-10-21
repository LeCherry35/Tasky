import $api from "../http";
import axios, { AxiosResponse } from "axios";
import { TodoResponse } from "../models/response/TodoResponse";
import { Todo } from "../types/Todo";

export default class TodoService {
    static async addTodo(todo: string, userId: string, id: number): Promise<AxiosResponse<Todo>>{
        return $api.post('/addTodo', {todo, userId, id})
    }
    static async getTodos(userId: string): Promise<AxiosResponse<Todo[]>> {
        return $api.get('/getTodos?userId=' + userId)
    }
    static async deleteTodo(id: number): Promise<AxiosResponse<Todo>> {
        return $api.delete('/deleteTodo?id=' + id)
    }
    static async editTodo(id: number, editedTodo: string): Promise<AxiosResponse<Todo>>{
        return $api.put('/editTodo?id=' + id, {editedTodo})
    }
    static async setDone(id: number): Promise<AxiosResponse<Todo>> {
        return $api.put('/setDone?id=' + id)
    }
    static async setUndone(id: number): Promise<AxiosResponse<Todo>> {
        return $api.put('/setDone?id=' + id)
    }
    static async deleteAll(userId: string): Promise<AxiosResponse<any>> {
        return $api.delete('/deleteAll?userId=' + userId)
    }
}