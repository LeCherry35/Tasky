import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { Todo } from '../../types/Todo'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { MdDone, MdDownloadDone } from 'react-icons/md'
import TextareaAutosize from 'react-textarea-autosize';
import s from './Todo.module.css'
import { Draggable } from 'react-beautiful-dnd'
import { editTodoAction, removeTodoAction, setDoneAction } from '../../store/reducers/todoReducer'
import { deleteTodoAsync, editTodoAsync, setDoneAsync } from '../../asyncActions/todos'
import { useTypedDispatch } from '../../hooks/useTypedDispatch'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { timestampToString } from '../../helpers/timestampToString'

interface Props {
  index: number;
  todo: Todo;
}

const ActiveTodo: React.FC<Props> = ({index, todo}) => {  
  
  const [edit, setEdit] = useState<boolean>(false)
  const [editedTodo, setEditedTodo] = useState<string>(todo.todo)
  const dispatch = useTypedDispatch()
  const {isAuth} = useTypedSelector(state => state.user)
  const [expiresIn, setExpiresIn] = useState<number>( todo.deadline ? todo.deadline - Date.now() : Infinity)
  
  
  const setDone = (createdAt:number) => {
    if (isAuth) dispatch(setDoneAsync(createdAt))
    dispatch(setDoneAction(createdAt))
  }
  const removeTodo = (createdAt:number) => {
    if (isAuth) dispatch(deleteTodoAsync(createdAt))
    dispatch(removeTodoAction(createdAt))
  }
  const editTodo = (e: React.FormEvent, createdAt: number) => {
    e.preventDefault()
    if (isAuth) dispatch(editTodoAsync(createdAt, editedTodo))
    dispatch(editTodoAction(createdAt, editedTodo))
    setEdit(false)
  }
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [edit])

  if (todo.deadline && expiresIn > 0) {
    setTimeout(() => setExpiresIn(expiresIn - 1000), 1000)
  }
  return (
    <Draggable draggableId={todo.createdAt.toString()} index={index}>
      {(provided) => (

        <form className={expiresIn > 0 && !todo.isDone ? `${s.todo}` : `${s.todo} ${s.todo__expired}`} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <div className={s.todo__textarea}>
            {edit 
            ? (
              <TextareaAutosize
                ref={inputRef}
                value={editedTodo} 
                onChange={e => setEditedTodo(e.target.value)}
                onKeyDown={(e) => {
                  switch (e.code) {
                    case 'Enter': 
                      editTodo(e,todo.createdAt)
                      inputRef.current?.blur()
                      break
                    case 'Escape':
                      setEdit(!edit)
                      break
                  }
                }} 
                className={s.todo__textarea__text}
              />
            ) 
            :  <span className={s.todo__textarea__text}>{todo.todo}</span>}
            {expiresIn > 0 && expiresIn !== Infinity && <><br />{'deadline: ' + timestampToString(expiresIn)}</>}
          </div>
          <div className={s.todo__icons}>
              {edit 
              ? <button className={s.icon} type='submit' onClick={e => editTodo(e,todo.createdAt)} > 
                <MdDownloadDone style={{color: 'red'}}/>
              </button>
              : <></>}
              <button className={s.icon} style={edit ? {color: 'red'} : {}} onClick={(e) =>{
                e.preventDefault()
                setEdit(!edit)
              }}>
                <AiFillEdit/>
              </button>
              {edit
              ? <></>
              : <button className={s.icon} onClick={(e) => {
                setDone(todo.createdAt)
              }} >
                <MdDone/>
              </button>}
              <button className={s.icon} onClick={() =>{
                removeTodo(todo.createdAt)}}>
                <AiFillDelete/>
              </button> 
          </div>
        </form>
      )}
    </Draggable>
  )
}

export default ActiveTodo