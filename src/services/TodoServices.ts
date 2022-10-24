import $api from "../http";
import { AxiosResponse } from "axios";
import { Todo } from "../types/Todo";

export default class TodoService {
    static async addTodo(todo: string, id: number): Promise<AxiosResponse<Todo>>{
        return $api.post('/addTodo', {todo, id})
    }
    static async getTodos(): Promise<AxiosResponse<Todo[]>> {
        return $api.get('/getTodos')
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
    static async deleteAll(): Promise<AxiosResponse<any>> {
        return $api.delete('/deleteAll')
    }
}