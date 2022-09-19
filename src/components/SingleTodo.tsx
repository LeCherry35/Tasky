import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { Todo } from '../model'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { MdDone, MdDownloadDone, MdOutlineCancel, MdOutlineArrowBackIos } from 'react-icons/md'
import TextareaAutosize from 'react-textarea-autosize';
import './styles.css'
import { Draggable } from 'react-beautiful-dnd'

interface Props {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  othTodos: Todo[];
  setOthTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({index, todo, todos, setTodos, othTodos, setOthTodos}) => {
  const [edit, setEdit] = useState<boolean>(false)
  const [editTodo, setEditTodo] = useState<string>(todo.todo)
  
  const saveInLocalStorage = (tds: Todo[], oTds: Todo[]) => {
    localStorage.setItem(!todo.isDone ? 'todos' : 'completedTodos', JSON.stringify(tds))
    localStorage.setItem(todo.isDone ? 'todos' : 'completedTodos', JSON.stringify(oTds))
  }

  const handleDone = (id:number) => {
    todo.isDone = !todo.isDone
    setOthTodos([...othTodos, todo])
    setTodos(todos.filter(todo => todo.id !== id))
  }
  const handleDelete = (id:number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault()

    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo} : todo))
    )
    setEdit(false)
  }

  

  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [edit])

  useEffect(() => {
    saveInLocalStorage(todos, othTodos)
    // const lst: string | null = localStorage.getItem('todos')
    // lst ? console.log('t', JSON.parse(lst)) : console.log('empty');
    // const lsct: string | null = localStorage.getItem('completedTodos')
    // lsct ? console.log('c',JSON.parse(lsct)) : console.log('empty');
  }, [todos, othTodos])

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (

        <form className='todo' {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <div className='todo__textarea'>
            {edit ? (
              <TextareaAutosize
                ref={inputRef}
                value={editTodo} 
                onChange={e => setEditTodo(e.target.value)}
                onKeyDown={(e) => {
                  switch (e.code) {
                    case 'Enter': 
                      handleEdit(e,todo.id)
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
          <div className='todo__icons'>
            
            {edit ? (
              <>
                <button className="icon" type='submit' onClick={e => handleEdit(e,todo.id)} > <MdDownloadDone style={{color: 'red'}}/></button>
                <button className="icon" style={{color: 'red'}} onClick={(e) =>{
                  e.preventDefault()
                  setEdit(!edit)
                }}><MdOutlineCancel/></button>
              </>
            ) : todo.isDone ? (
              <button className='icon' onClick={(e) => {
                e.preventDefault()
                  handleDone(todo.id)
              }}>
                <MdOutlineArrowBackIos/>
              </button>
            ) : (
              <button className="icon" style={edit ? {color: 'red'} : {}} onClick={(e) =>{
                e.preventDefault()
                if (!todo.isDone){
                  setEdit(!edit)
                }
              }}>
                <AiFillEdit/>
              </button>
            )}
            {edit ? (
              <></>
            ) : (
              <button className="icon" onClick={() =>handleDelete(todo.id)}>
                <AiFillDelete/>
              </button>

            )}
            {(todo.isDone || edit) ? (
              <></>
            ) : (
            <button className="icon" onClick={(e) => {
              e.preventDefault()
              
                handleDone(todo.id)
              
            }} >
              <MdDone/>
            </button>
            )}
          </div>
        
        </form>
      )}
    </Draggable>
  )
}

export default SingleTodo