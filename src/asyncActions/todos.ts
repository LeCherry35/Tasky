import { TodosAction, TodosActionTypes } from './../types/todos';
import { Dispatch } from 'redux';
import TodoService from '../services/TodoServices';

export const addTodoAsync = (todo: string, deadline: number | null, createdAt: number) => {
    return async (dispatch: Dispatch<TodosAction>) => {
        try {
            const response = await TodoService.addTodo(todo, deadline, createdAt)
        } catch (e) {
            console.log(e);
        }
    }
    
}

export const getTodosAsync = () => {
    
    return async (dispatch: Dispatch<TodosAction>) => {
        try {
            const response = await TodoService.getTodos()
            dispatch({type: TodosActionTypes.SET_TODOS, payload: response.data})
        } catch(e) {
            console.log(e)
        }
    }
}
export const deleteTodoAsync = (createdAt:number) => {
    return async (dispatch: Dispatch<TodosAction>) => {
        try {
            const response = await TodoService.deleteTodo(createdAt)
        } catch(e) {
            console.log(e)
        }
    }

}
export const editTodoAsync = (createdAt:number, editTodo: string, deadline: number | null) => {
    return async (dispatch: Dispatch<TodosAction>) => {
        try {
            const response = await TodoService.editTodo(createdAt, editTodo, deadline)
        } catch(e) {
            console.log(e)
        }
    }

}
export const setDoneAsync = (createdAt:number) => {
    return async (dispatch: Dispatch<TodosAction>) => {
        try {
            const response = await TodoService.setDone(createdAt)
        } catch (e) {
            console.log(e)
        }
    }
}

export const setUndoneAsync = (createdAt:number) => {
    return async (dispatch: Dispatch<TodosAction>) => {
        try {
            const response = await TodoService.setUndone(createdAt)
        } catch (e) {
            console.log(e)
        }
    }
}
export const deleteAllAsync = () => {
    return async (dispatch: Dispatch<TodosAction>) => {
        try {
            const response = await TodoService.deleteAll()
        } catch(e) {
            console.log(e)
        }
    }
}