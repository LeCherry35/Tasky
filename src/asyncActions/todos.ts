import { TodosAction, TodosActionTypes } from './../types/todos';
import { Dispatch } from 'redux';
import TodoService from '../services/TodoServices';
export const addTodo = (todoText: string) => {

}

export const getTodos = (userId: string)=> {
    
    return async (dispatch: Dispatch<TodosAction>) => {
        try {
            console.log(userId);
            const response = await TodoService.getTodos(userId)
            dispatch({type: TodosActionTypes.SET_TODOS, payload: response.data})
            
        } catch(e) {

        }
    }
}