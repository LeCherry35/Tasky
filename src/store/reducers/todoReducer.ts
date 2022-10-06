import { Todo } from '../../models/Todo'
import _ from 'lodash'

const ADD_TODO = 'ADD_TODO'
const EDIT_TODO = 'EDIT_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const SET_DONE = 'SET_DONE'
const SET_UNDONE = 'SET_UNDONE'
const DRAG_END = 'DRAG_END'


// const initTodosJSON: string | null = localStorage.getItem('todos')
// const initTodos: Todo[] = initTodosJSON ? JSON.parse(initTodosJSON) : []
// const initCompletedTodosJSON: string | null = localStorage.getItem('completedTodos')
// const initCompletedTodos: Todo[] = initCompletedTodosJSON ? JSON.parse(initCompletedTodosJSON) : []

interface TodosState {
    todos: Todo[]
    completedTodos: Todo[]
    error: null | boolean
}

interface TodosAction {
    type: string
    payload?: any
}

const initialState: TodosState = {
    todos: [],
    completedTodos: [],
    error: null
}

export const todoReducer = (state = initialState, action: TodosAction): TodosState => {
    switch (action.type) {
        case ADD_TODO:
            return { ...state, todos: [...state.todos , action.payload]}
        
        case EDIT_TODO:
            const editedTodos = state.todos.map((todo) => (todo.id === action.payload.id ? { ...todo, todo:  action.payload.editedTodo} : todo))
            return { ...state, todos: editedTodos}
            
        case REMOVE_TODO:
            const tds = state.todos.filter(todo => todo.id !== action.payload)
            const cTds = state.completedTodos.filter(todo => todo.id !== action.payload)
            return{ ...state, todos: tds, completedTodos: cTds}
        
        case SET_DONE:
            const doneTodo: Todo | undefined = state.todos.find(todo => todo.id === action.payload) 
            if(doneTodo) doneTodo.isDone = true
            const leftTodos = _.cloneDeep(state.todos)
            leftTodos.splice(leftTodos.findIndex(todo => todo.id === action.payload), 1)
            let updatedCompletedTodos: Todo[] = []
            if(doneTodo) {   
                updatedCompletedTodos = _.cloneDeep(state.completedTodos || [])
                updatedCompletedTodos.push(doneTodo)
            }
            return { ...state, todos: leftTodos, completedTodos: updatedCompletedTodos}
            
        case SET_UNDONE:
            const undoneTodo: Todo | undefined = state.completedTodos.find(todo => todo.id === action.payload) 
            if(undoneTodo) undoneTodo.isDone = false
            const leftCompletedTodos = _.cloneDeep(state.completedTodos)
            leftCompletedTodos.splice(leftCompletedTodos.findIndex(todo => todo.id === action.payload), 1)
            let updatedTodos: Todo[] = []
            if(undoneTodo) {
                updatedTodos = _.cloneDeep(state.todos || [])
                updatedTodos.push(undoneTodo)
            }
            return { ...state, todos: updatedTodos, completedTodos: leftCompletedTodos}

        case DRAG_END:
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