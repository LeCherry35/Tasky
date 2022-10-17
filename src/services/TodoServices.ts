import $api from "../http";
import axios, { AxiosResponse } from "axios";
import { TodoResponse } from "../models/response/TodoResponse";
import { Todo } from "../types/Todo";

export default class TodoService {
    static async addTodo(todo: string, userId: string): Promise <void>{
        return $api.post('/addTodo', {todo, userId})
    }
    static async getTodos(userId: string): Promise<AxiosResponse<Todo[]>>{
        return $api.get('/getTodos?userId=' + userId)
    }
}