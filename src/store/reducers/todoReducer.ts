import { TodosState, TodosAction, TodosActionTypes } from '../../types/todos';

import { Todo } from '../../types/Todo'
import _ from 'lodash'
import { DropResult } from 'react-beautiful-dnd'




// const initTodosJSON: string | null = localStorage.getItem('todos')
// const initTodos: Todo[] = initTodosJSON ? JSON.parse(initTodosJSON) : []
// const initCompletedTodosJSON: string | null = localStorage.getItem('completedTodos')
// const initCompletedTodos: Todo[] = initCompletedTodosJSON ? JSON.parse(initCompletedTodosJSON) : []



const initialState: TodosState = {
    todos: [],
    completedTodos: [],
    error: null
}

export const todoReducer = (state = initialState, action: TodosAction): TodosState => {
    switch (action.type) {
        case TodosActionTypes.SET_TODOS: 
            const activeTodos = action.payload.filter(todo => todo.isDone === false)
            const completedTodos = action.payload.filter(todo => todo.isDone === true)
            return { ...state, todos: activeTodos, completedTodos: completedTodos}
        case TodosActionTypes.ADD_TODO:
            return { ...state, todos: [...state.todos , action.payload]}
        
        case TodosActionTypes.EDIT_TODO:
            const editedTodos = state.todos.map((todo) => (todo.id === action.payload.id ? { ...todo, todo:  action.payload.editedTodo} : todo))
            return { ...state, todos: editedTodos}
            
        case TodosActionTypes.REMOVE_TODO:
            const tds = state.todos.filter(todo => todo.id !== action.payload)
            const cTds = state.completedTodos.filter(todo => todo.id !== action.payload)
            return{ ...state, todos: tds, completedTodos: cTds}
        
        case TodosActionTypes.SET_DONE:
            const doneTodo: Todo | undefined = state.todos.find(todo => todo.id === action.payload) 
            let doneTodoCopy
            let updatedCompletedTodos: Todo[] = []
            if(doneTodo) {
                doneTodoCopy = _.cloneDeep(doneTodo)
                doneTodoCopy.isDone = true
                updatedCompletedTodos = _.cloneDeep(state.completedTodos || [])
                updatedCompletedTodos.push(doneTodoCopy)
            }
            const leftTodos = _.cloneDeep(state.todos)
            leftTodos.splice(leftTodos.findIndex(todo => todo.id === action.payload), 1)
            return { ...state, todos: leftTodos, completedTodos: updatedCompletedTodos}
            
        case TodosActionTypes.SET_UNDONE:
            const undoneTodo: Todo | undefined = state.completedTodos.find(todo => todo.id === action.payload) 
            let undoneTodoCopy
            let updatedTodos: Todo[] = []
            if(undoneTodo) {
                undoneTodoCopy = _.cloneDeep(undoneTodo)
                undoneTodoCopy.isDone = false
                updatedTodos = _.cloneDeep(state.todos || [])
                updatedTodos.push(undoneTodoCopy)
            }
            const leftCompletedTodos = _.cloneDeep(state.completedTodos)
            leftCompletedTodos.splice(leftCompletedTodos.findIndex(todo => todo.id === action.payload), 1)
            return { ...state, todos: updatedTodos, completedTodos: leftCompletedTodos}

        case TodosActionTypes.DRAG_END:
            const {source, destination} = action.payload
            if (!destination) return state
            if (destination.droppableId === source.droppableId && destination.index === source.index) return state

            let add, 
            active = _.cloneDeep(state.todos),
            completed = _.cloneDeep(state.completedTodos)
            
            if (source.droppableId === 'TodosList') {
                add = active[source.index]
                active.splice(source.index, 1)
            } else {
                add = completed[source.index]
                completed.splice(source.index, 1)
            }
            
            if (destination.droppableId === 'TodosList') {
                add.isDone = false
                active.splice(destination.index, 0, add)
            } else {
                add.isDone = true
                completed.splice(destination.index, 0, add)
            }
            return { ...state, todos: active, completedTodos: completed}
        default:
            return state
    }
}

export const addToodoAction = (todo:string, id:number) => {
    return {type: TodosActionTypes.ADD_TODO, payload: {id: id, todo: todo, isDone: false}}
}
export const setDoneAction = (id:number) => {
    return {type: TodosActionTypes.SET_DONE, payload: id}
}
export const setUndoneAction = (id:number) => {
    return {type: TodosActionTypes.SET_UNDONE, payload: id}
}
export const removeTodoAction = (id:number) => {
    return {type: TodosActionTypes.REMOVE_TODO, payload: id}
}
export const editTodoAction = (id:number, editedTodo:string) => {
    return {type: TodosActionTypes.EDIT_TODO, payload: {id: id , editedTodo: editedTodo}}
}
export const dragEndAction = (result:DropResult) => {
    return {type: TodosActionTypes.DRAG_END, payload: result}
}
export const clearTodos = () => {
    return {type: TodosActionTypes.SET_TODOS, payload: []}
}