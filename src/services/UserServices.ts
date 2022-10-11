import $api from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import AuthService from "./AuthServises";
import { IUser } from "../types/IUser";
export default class UserServices {
    static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get('/users')
    }
}