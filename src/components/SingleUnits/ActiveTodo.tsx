import React, { useEffect, useRef } from 'react'
import s from './SingleUnit.module.css'
import { useState } from 'react'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { MdDone, MdDownloadDone } from 'react-icons/md'
import TextareaAutosize from 'react-textarea-autosize';
import { Draggable } from 'react-beautiful-dnd'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useTypedDispatch } from '../../hooks/useTypedDispatch'
import { Todo } from '../../types/Todo'
import { editTodoAction, removeTodoAction, setDoneAction } from '../../store/reducers/todoReducer'
import { deleteTodoAsync, editTodoAsync, setDoneAsync } from '../../asyncActions/todos'
import { timestampToString } from '../../helpers/timestampToString'
import DateTimePicker from '../DateTimePicker/DateTimePicker'

interface Props {
  index: number;
  todo: Todo;
}

const ActiveTodo: React.FC<Props> = ({index, todo}) => {  
  
  const [edit, setEdit] = useState<boolean>(false)
  const [isDateTimeInputShown, setIsDateTimeInputShown] = useState(false)
  const [editedTodo, setEditedTodo] = useState<string>(todo.todo)
  const [expiresIn, setExpiresIn] = useState<number>( todo.deadline ? todo.deadline - Date.now() : Infinity)
  const [newDeadline, setNewDeadline] = useState<number | null>(todo.deadline || null)

  const dispatch = useTypedDispatch()
  const {isAuth} = useTypedSelector(state => state.user)  

  let countdown: NodeJS.Timeout
  console.log(todo.deadline,'###');
  
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
    if (isAuth) dispatch(editTodoAsync(createdAt, editedTodo, newDeadline))
    dispatch(editTodoAction(createdAt, editedTodo))
    setEdit(false)
    countdown && clearTimeout(countdown)
    setExpiresIn(newDeadline ? newDeadline - Date.now() : Infinity)
  }
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [edit])
  useEffect(() => {
    if (todo.deadline && expiresIn > 0) {
      countdown = setTimeout(() => setExpiresIn(expiresIn - 1000), 1000)
    }
  },[expiresIn, todo.deadline])

  return (
    <Draggable draggableId={todo.createdAt.toString()} index={index}>
      {(provided) => (

        <div className={expiresIn > 0 ? `${s.container}` : `${s.container} ${s.expired}`} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <div className={s.textarea}>
            {edit 
            ? <>
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
                className={s.textareaText}
              />
              <div className={s.dateInputContainer}>
              <div>Deadline: </div>
              {isDateTimeInputShown || !todo.deadline ? <DateTimePicker setDateAndTime={setNewDeadline}/> : <div onClick={() => setIsDateTimeInputShown(true)} className={s.dateTimeInputReady}>{new Date(todo.deadline).toDateString()}</div>}
              </div>
            </> 
            :  <>
              <span className={s.textareaText}>{todo.todo}</span>
              {expiresIn > 0 && expiresIn !== Infinity && <><br />{'deadline: ' + timestampToString(expiresIn)}</>}
            </>}
          </div>
          <div className={s.iconsContainer}>
            <button className={s.icon} style={edit ? {color: 'red'} : {}} onClick={(e) =>{
              e.preventDefault()
              setEdit(!edit)
            }}>
              <AiFillEdit/>
            </button>
            {edit
            ? <button className={s.icon} type='submit' onClick={e => editTodo(e,todo.createdAt)} > 
              <MdDownloadDone style={{color: 'red'}}/>
              </button>
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
        </div>
      )}
    </Draggable>
  )
}

export default ActiveTodo