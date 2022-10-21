import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { Todo } from '../types/Todo'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { MdDone, MdDownloadDone, MdOutlineCancel, MdOutlineArrowBackIos } from 'react-icons/md'
import TextareaAutosize from 'react-textarea-autosize';
import './styles.css'
import { Draggable } from 'react-beautiful-dnd'
import { useDispatch } from "react-redux"
import { editTodoAction, removeTodoAction, setDoneAction, setUndoneAction } from '../store/reducers/todoReducer'
import { deleteTodoAsync, editTodoAsync, setDoneAsync, setUndoneAsync } from '../asyncActions/todos'
import { useTypedDispatch } from '../hooks/useTypedDispatch'
import { useTypedSelector } from '../hooks/useTypedSelector'

interface Props {
  index: number;
  todo: Todo;
}

const SingleTodo: React.FC<Props> = ({index, todo}) => {
  const [edit, setEdit] = useState<boolean>(false)
  const [editedTodo, setEditedTodo] = useState<string>(todo.todo)
  const dispatch = useTypedDispatch()
  const {isAuth} = useTypedSelector(state => state.user)
  
  const saveInLocalStorage = (tds: Todo[], oTds: Todo[]) => {
    localStorage.setItem(!todo.isDone ? 'todos' : 'completedTodos', JSON.stringify(tds))
    localStorage.setItem(todo.isDone ? 'todos' : 'completedTodos', JSON.stringify(oTds))
  }

  const setDone = (id:number) => {
    if (isAuth) dispatch(setDoneAsync(id))
    dispatch(setDoneAction(id))
  }
  const setUndone = (id:number) => {
    if (isAuth) dispatch(setUndoneAsync(id))
    dispatch(setUndoneAction(id))
  }
  const removeTodo = (id:number) => {
    if (isAuth) dispatch(deleteTodoAsync(id))
    dispatch(removeTodoAction(id))
  }

  const editTodo = (e: React.FormEvent, id: number) => {
    e.preventDefault()
    if (isAuth) dispatch(editTodoAsync(id, editedTodo))
    dispatch(editTodoAction(id, editedTodo))
    setEdit(false)
  }

  

  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [edit])

  // useEffect(() => {
  //   saveInLocalStorage(todos, othTodos)
  //   // const lst: string | null = localStorage.getItem('todos')
  //   // lst ? console.log('t', JSON.parse(lst)) : console.log('empty');
  //   // const lsct: string | null = localStorage.getItem('completedTodos')
  //   // lsct ? console.log('c',JSON.parse(lsct)) : console.log('empty');
  // }, [todos, othTodos])

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (

        <form className='todo' {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <div className='todo__textarea'>
            {edit ? (
              <TextareaAutosize
                ref={inputRef}
                value={editedTodo} 
                onChange={e => setEditedTodo(e.target.value)}
                onKeyDown={(e) => {
                  switch (e.code) {
                    case 'Enter': 
                      editTodo(e,todo.id)
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

          </div>
          <div className="todo__icons">
            {todo.isDone 
            ? <>
              <button className='icon' onClick={(e) => {
                  setUndone(todo.id)
              }}>
                <MdOutlineArrowBackIos/>
              </button>
              <button className="icon" onClick={() =>removeTodo(todo.id)}>
                <AiFillDelete/>
              </button>
            </>
            : <>
              {edit 
              ? <button className="icon" type='submit' onClick={e => editTodo(e,todo.id)} > 
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
                setDone(todo.id)
              }} >
                <MdDone/>
              </button>}
              <button className="icon" onClick={() =>{
                console.log(todo);
                removeTodo(todo.id)}}>
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