import { IUser } from '../../types/IUser';
export interface AuthResponse{
    accessToken: string
    refreshToken: string
    user: IUser
}