import { Todo } from './Todo';
export interface IDate {
    date: number
    todos?: Todo []
}
export interface IWeekday {
    day: string
}
export interface IMonth {
    name: string
    days: number
}
