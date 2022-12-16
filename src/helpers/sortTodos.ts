import { Todo } from './../types/Todo';
export const sortTodos = (a: Todo,b: Todo):number => {
    if (a.deadline && b.deadline) return a.deadline - b.deadline
    else if(a.deadline && !b.deadline ) return -1
    else if(!a.deadline && b.deadline ) return 1
    return 0
}