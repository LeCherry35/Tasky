import React from 'react'
import './styles.css'
import { Todo } from '../model'
import SingleTodo from './SingleTodo';
import { Droppable } from 'react-beautiful-dnd';

interface Props{
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    completedTodos: Todo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  }

const TodoList: React.FC<Props> = ({todos, setTodos, completedTodos, setCompletedTodos}) => {
  return (
    <div className="container">
      <Droppable droppableId='TodosList'>
        {
          (provided) => (
            <div className='todos' ref={provided.innerRef} { ...provided.droppableProps}>
              <span className="todos__heading">Active tasks</span>
              {todos.map((todo, id) => <SingleTodo index={id} todo={todo} key={todo.id} todos={todos} setTodos={setTodos}/>)}
            </div>

          )
        }

      </Droppable>
      
      <Droppable droppableId='CompletedTodosList'>
        {
          (provided) => (
            <div className='todos remove' ref={provided.innerRef} { ...provided.droppableProps}>
              <span className="todos__heading">Completed tasks</span>
              {completedTodos.map((todo, id) => <SingleTodo index={id} todo={todo} key={todo.id} todos={completedTodos} setTodos={setCompletedTodos}/>)}
            </div>

          )
        }

      </Droppable>
    </div>
  )
}

export default TodoList