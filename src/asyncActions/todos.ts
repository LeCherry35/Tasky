import { TodosAction, TodosActionTypes } from './../types/todos';
import { Dispatch } from 'redux';
import TodoService from '../services/TodoServices';

export const addTodoAsync = (todo: string, id:number) => {
    return async (dispatch: Dispatch<TodosAction>) => {
        try {
            const response = await TodoService.addTodo(todo, id)
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
export const deleteTodoAsync = (id:number) => {
    return async (dispatch: Dispatch<TodosAction>) => {
        try {
            const response = await TodoService.deleteTodo(id)
            console.log(`Todo '${response.data.todo}' deleted`);
        } catch(e) {
            console.log(e)
        }
    }

}
export const editTodoAsync = (id:number, editTodo: string) => {
    return async (dispatch: Dispatch<TodosAction>) => {
        try {
            const response = await TodoService.editTodo(id, editTodo)
            console.log(`Todo '${response.data.todo}' changed to '${editTodo}'`);
        } catch(e) {
            console.log(e)
        }
    }

}
export const setDoneAsync = (id:number) => {
    return async (dispatch: Dispatch<TodosAction>) => {
        try {
            const response = await TodoService.setDone(id)
            console.log(`Todo '${response.data.todo}' is done`);
        } catch (e) {
            console.log(e)
        }
    }
}

export const setUndoneAsync = (id:number) => {
    return async (dispatch: Dispatch<TodosAction>) => {
        try {
            const response = await TodoService.setDone(id)
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