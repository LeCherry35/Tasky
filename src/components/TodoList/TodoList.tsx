import React, { useEffect, useState } from 'react'
import s from './TodoList.module.css'
import ActiveTodo from '../SingleUnits/ActiveTodo';
import { Droppable } from 'react-beautiful-dnd';
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from 'react-icons/md'
import { useTypedSelector } from '../../hooks/useTypedSelector';
import CompletedTodo from '../SingleUnits/CompletedTodo';



const TodoList: React.FC = () => {
  
  const [completedIsHidden,setCompletedIsHidden] = useState<boolean>(true)
  const {todos, completedTodos} = useTypedSelector(state => state.todos)

  useEffect(() => {
    if(todos.length === 0 && completedTodos.length !== 0) {
      setCompletedIsHidden(false)
    } 
  }, [todos.length, completedTodos.length])
  
  const toggleRemoved = () => {
    setCompletedIsHidden(!completedIsHidden)
  }

  return (
    <div className={s.todosContainer}>
      
      <Droppable droppableId='TodosList'>
        {
          (provided, snapshot) => (
            <div className={`${s.todos} ${todos.length !== 0 ? s.shown : ''}`} ref={provided.innerRef} { ...provided.droppableProps}>
              <span className={`${s.heading} ${snapshot.isDraggingOver ? 'dragactive' : ''}`}>
                Active tasks
                <span className={s.arrow} onClick={() => {toggleRemoved()}}>{completedIsHidden && completedTodos.length !== 0 ? <MdOutlineArrowForwardIos/> : ''}</span>
              </span>
              
              {todos.map((todo, id) => <ActiveTodo index={id} todo={todo} key={todo.createdAt}/>)}
              {provided.placeholder}
            </div>

          )
        }

      </Droppable>
      
      <Droppable droppableId='CompletedTodosList'>
        {
          (provided, snapshot) => (
            <div className={`${s.todos} ${!completedIsHidden && completedTodos.length !== 0 ? s.shown : ''}`} ref={provided.innerRef} { ...provided.droppableProps}>
              <span className={`${s.heading} ${snapshot.isDraggingOver ? 'dragcompleted' : ''}`}>
                {!completedIsHidden ? 'Completed' : ''}
                {!completedIsHidden && todos.length !== 0 ? <span className={s.arrow} onClick={() => {toggleRemoved()}}><MdOutlineArrowBackIos/></span> : ''}
              </span>
              {completedTodos.map((todo, id) => <CompletedTodo index={id} todo={todo} key={todo.createdAt}/>)}
              {provided.placeholder}
            </div>
          )
        }

      </Droppable>
    </div>
  )
}

export default TodoList