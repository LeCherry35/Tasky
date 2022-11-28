import { TodosAction, TodosActionTypes } from './../types/todos';
import { Dispatch } from 'redux';
import TodoService from '../services/TodoServices';

export const addTodoAsync = (todo: string, deadline: number, createdAt:number) => {
    return async (dispatch: Dispatch<TodosAction>) => {
        try {
            const response = await TodoService.addTodo(todo, deadline, createdAt)
            console.log(`Todo '${response.data.todo}' added`);
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
            console.log(`Todo '${response.data.todo}' deleted`);
        } catch(e) {
            console.log(e)
        }
    }

}
export const editTodoAsync = (createdAt:number, editTodo: string) => {
    return async (dispatch: Dispatch<TodosAction>) => {
        try {
            const response = await TodoService.editTodo(createdAt, editTodo)
            console.log(`Todo '${response.data.todo}' changed to '${editTodo}'`);
        } catch(e) {
            console.log(e)
        }
    }

}
export const setDoneAsync = (createdAt:number) => {
    return async (dispatch: Dispatch<TodosAction>) => {
        try {
            const response = await TodoService.setDone(createdAt)
            console.log(`Todo '${response.data.todo}' is done`);
        } catch (e) {
            console.log(e)
        }
    }
}

export const setUndoneAsync = (createdAt:number) => {
    return async (dispatch: Dispatch<TodosAction>) => {
        try {
            const response = await TodoService.setDone(createdAt)
            console.log(`Todo '${response.data.todo}' set back to undone`);
        } catch (e) {
            console.log(e)
        }
    }
}
export const deleteAllAsync = () => {
    return async (dispatch: Dispatch<TodosAction>) => {
        try {
            const response = await TodoService.deleteAll()
            console.log(response.data.deletedCount + ' todos deleted')
        } catch(e) {
            console.log(e)
        }
    }
}