import React from 'react'

import s from './SingleUnit.module.css'

import { Todo } from '../../types/Todo'
import { AiFillDelete } from 'react-icons/ai'
import { MdUndo } from 'react-icons/md'
import { Draggable } from 'react-beautiful-dnd'
import { removeTodoAction, setUndoneAction } from '../../store/reducers/todoReducer'
import { deleteTodoAsync, setUndoneAsync } from '../../asyncActions/todos'
import { useTypedDispatch } from '../../hooks/useTypedDispatch'
import { useTypedSelector } from '../../hooks/useTypedSelector'

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

        <form className={s.container} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <div className={s.textarea}>
            <s className={s.textareaText}>{todo.todo}</s>
          </div>
          <div className={s.iconsContainer}>
            <button className={s.icon} onClick={(e) => {
                setUndone(todo.createdAt)
            }}>
              <MdUndo/>
            </button>
            <button className={s.icon} onClick={() =>removeTodo(todo.createdAt)}>
              <AiFillDelete/>
            </button>
          </div>
        </form>
      )}
    </Draggable>
  )
}

export default CompletedTodo