import $api from "../http";
import { AxiosResponse } from "axios";
import { IEvent } from "../types/events";

export default class EventService {
    static async addEvent(name: string, createdAt: number, startsAt: number): Promise<AxiosResponse<IEvent>>{
        return $api.post('/addEvent', {name, createdAt, startsAt})
    }
    static async getEvents(): Promise<AxiosResponse<IEvent[]>> {
        return $api.get('/getEvents')
    }
    static async deleteEvent(createdAt: number): Promise<AxiosResponse<IEvent>> {
        return $api.delete('/deleteEvent?createdAt=' + createdAt)
    }
    static async editEvent(createdAt: number, editedTodo: string): Promise<AxiosResponse<IEvent>>{
        return $api.put('/editEvent?createdAt=' + createdAt, {editedTodo})
    }
    static async deleteAll(): Promise<AxiosResponse<any>> {
        return $api.delete('/deleteAll')
    }
}