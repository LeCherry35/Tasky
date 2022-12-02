export interface Todo {
    _id: string
    createdAt: number
    deadline?: number
    completedAt?: number
    todo: string
    isDone: boolean

}