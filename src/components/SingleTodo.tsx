import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { Todo } from '../types/Todo'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { MdDone, MdDownloadDone, MdUndo } from 'react-icons/md'
import TextareaAutosize from 'react-textarea-autosize';
import './styles.css'
import { Draggable } from 'react-beautiful-dnd'
import { editTodoAction, removeTodoAction, setDoneAction, setUndoneAction } from '../store/reducers/todoReducer'
import { deleteTodoAsync, editTodoAsync, setDoneAsync, setUndoneAsync } from '../asyncActions/todos'
import { useTypedDispatch } from '../hooks/useTypedDispatch'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { timestampToString } from '../helpers/timestampToString'

interface Props {
  index: number;
  todo: Todo;
}

const SingleTodo: React.FC<Props> = ({index, todo}) => {
  todo.deadline && todo.deadline < Date.now() && console.log('kk');
  
  
  const [edit, setEdit] = useState<boolean>(false)
  const [editedTodo, setEditedTodo] = useState<string>(todo.todo)
  const dispatch = useTypedDispatch()
  const {isAuth} = useTypedSelector(state => state.user)
  const [expiresIn, setExpiresIn] = useState<number>( todo.deadline ? todo.deadline - Date.now() : Infinity)

  
  const setDone = (createdAt:number) => {
    if (isAuth) dispatch(setDoneAsync(createdAt))
    dispatch(setDoneAction(createdAt))
  }
  const setUndone = (createdAt:number) => {
    if (isAuth) dispatch(setUndoneAsync(createdAt))
    dispatch(setUndoneAction(createdAt))
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

        <form className={expiresIn > 0 && !todo.isDone? 'todo' : 'todo todo-expired'} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <div className='todo__textarea'>
            {edit ? (
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
                className='todo__textarea--text'
              />
              
            ) :  todo.isDone ? (
              <s className='todo__textarea--text'>{todo.todo}</s>
            ): (
              <span className='todo__textarea--text'>{todo.todo}</span>
            )}
            <br></br>expires in {timestampToString(expiresIn)}
          </div>
          <div className="todo__icons">
            {todo.isDone 
            ? <>
              <button className='icon' onClick={(e) => {
                  setUndone(todo.createdAt)
              }}>
                <MdUndo/>
              </button>
              <button className="icon" onClick={() =>removeTodo(todo.createdAt)}>
                <AiFillDelete/>
              </button>
            </>
            : <>
              {edit 
              ? <button className="icon" type='submit' onClick={e => editTodo(e,todo.createdAt)} > 
                <MdDownloadDone style={{color: 'red'}}/>
              </button>
              : <></>}
              <button className="icon" style={edit ? {color: 'red'} : {}} onClick={(e) =>{
                e.preventDefault()
                setEdit(!edit)
              }}>
                <AiFillEdit/>
              </button>
              {edit
              ? <></>
              : <button className="icon" onClick={(e) => {
                setDone(todo.createdAt)
              }} >
                <MdDone/>
              </button>}
              <button className="icon" onClick={() =>{
                removeTodo(todo.createdAt)}}>
                <AiFillDelete/>
              </button> 
            </>}
          </div>
        </form>
      )}
    </Draggable>
  )
}

export default SingleTodo