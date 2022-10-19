import { Todo } from './Todo';
import { DropResult } from 'react-beautiful-dnd';

export interface TodosState {
    todos: Todo[]
    completedTodos: Todo[]
    error: null | boolean
}

export enum TodosActionTypes {
    SET_TODOS = 'SET_TODOS',
    ADD_TODO = 'ADD_TODO',
    EDIT_TODO = 'EDIT_TODO',
    REMOVE_TODO = 'REMOVE_TODO',
    SET_DONE = 'SET_DONE',
    DRAG_END = 'DRAG_END',
    SET_UNDONE = 'SET_UNDONE'
}
interface SetTodoActionInterface {
    type: TodosActionTypes.SET_TODOS
    payload: Todo []
}
interface AddToodoActionInterface {
    type: TodosActionTypes.ADD_TODO
    payload: Todo
}
interface EditToodoActionInterface {
    type: TodosActionTypes.EDIT_TODO
    payload: {
        id: number
        editedTodo: string
    }
}
interface RemoveToodoActionInterface {
    type: TodosActionTypes.REMOVE_TODO
    payload: number
}
interface SetDoneActionInterface {
    type: TodosActionTypes.SET_DONE
    payload: number
}
interface SetUnoneActionInterface {
    type: TodosActionTypes.SET_UNDONE
    payload: number
}
interface DragEndActionInterface {
    type: TodosActionTypes.DRAG_END
    payload: DropResult
}

export type TodosAction = AddToodoActionInterface | EditToodoActionInterface | RemoveToodoActionInterface | 
    SetDoneActionInterface | SetUnoneActionInterface | DragEndActionInterface | SetTodoActionInterface 