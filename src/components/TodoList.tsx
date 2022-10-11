import React, { useEffect, useState } from 'react'
import './styles.css'
import { Todo } from '../types/Todo'
import SingleTodo from './SingleTodo';
import { Droppable } from 'react-beautiful-dnd';
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from 'react-icons/md'
import { useTypedSelector } from '../hooks/useTypedSelector';



const TodoList: React.FC = () => {

  // const todos = useTypedSelector(state => state.todos.todos)
  
  
  const {todos, completedTodos} = useTypedSelector(state => state.todos)
  
  const [isHidden,setIsHidden] = useState<boolean>(true)
  
  const toggleRemoved = () => {
    setIsHidden(!isHidden)
  }

  useEffect(() => {
    if(todos.length === 0 && completedTodos.length !== 0) {
      setIsHidden(false)
    } 
  }, [todos.length])
  
  return (
    <div className="container">
      <Droppable droppableId='TodosList'>
        {
          (provided, snapshot) => (
            <div className={`todos ${todos.length !== 0 ? 'shown' : ''}`} ref={provided.innerRef} { ...provided.droppableProps}>
              <span className={`todos__heading ${snapshot.isDraggingOver ? 'dragactive' : ''}`}>
                Active tasks
                <span className='arrow' onClick={() => {toggleRemoved()}}>{isHidden && completedTodos.length !== 0 ? <MdOutlineArrowForwardIos/> : ''}</span>
              </span>
              
              {todos.map((todo, id) => <SingleTodo index={id} todo={todo} key={todo.id}/>)}
              {provided.placeholder}
            </div>

          )
        }

      </Droppable>
      
      <Droppable droppableId='CompletedTodosList'>
        {
          (provided, snapshot) => (
            <div className={`todos ${!isHidden && completedTodos.length !== 0 ? 'shown' : ''}`} ref={provided.innerRef} { ...provided.droppableProps}>
              <span className={`todos__heading ${snapshot.isDraggingOver ? 'dragcompleted' : ''}`}>
                {!isHidden ? 'Completed tasks' : ''}
                {!isHidden && todos.length !== 0 ? <span className='arrow' onClick={() => {toggleRemoved()}}><MdOutlineArrowBackIos/></span> : ''}
              </span>
              {completedTodos.map((todo, id) => <SingleTodo index={id} todo={todo} key={todo.id}/>)}
              {provided.placeholder}
            </div>

          )
        }

      </Droppable>
    </div>
  )
}

export default TodoList