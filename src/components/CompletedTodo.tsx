import React from 'react'

import { Todo } from '../types/Todo'
import { AiFillDelete } from 'react-icons/ai'
import { MdUndo } from 'react-icons/md'
import './styles.css'
import { Draggable } from 'react-beautiful-dnd'
import { removeTodoAction, setUndoneAction } from '../store/reducers/todoReducer'
import { deleteTodoAsync, setUndoneAsync } from '../asyncActions/todos'
import { useTypedDispatch } from '../hooks/useTypedDispatch'
import { useTypedSelector } from '../hooks/useTypedSelector'

interface Props {
  index: number;
  todo: Todo;
}

const CompletedTodo: React.FC<Props> = ({index, todo}) => {

  const dispatch = useTypedDispatch()
  const {isAuth} = useTypedSelector(state => state.user)
  const setUndone = (createdAt:number) => {
    if (isAuth) dispatch(setUndoneAsync(createdAt))
    dispatch(setUndoneAction(createdAt))
  }
  const removeTodo = (createdAt:number) => {
    if (isAuth) dispatch(deleteTodoAsync(createdAt))
    dispatch(removeTodoAction(createdAt))
  }

  return (
    <Draggable draggableId={todo.createdAt.toString()} index={index}>
      {(provided) => (

        <form className='todo' {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <div className='todo__textarea'>
            <s className='todo__textarea--text'>{todo.todo}</s>
          </div>
          <div className="todo__icons">
            <button className='icon' onClick={(e) => {
                setUndone(todo.createdAt)
            }}>
              <MdUndo/>
            </button>
            <button className="icon" onClick={() =>removeTodo(todo.createdAt)}>
              <AiFillDelete/>
            </button>
          </div>
        </form>
      )}
    </Draggable>
  )
}

export default CompletedTodo