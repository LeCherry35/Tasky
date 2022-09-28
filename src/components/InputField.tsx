import React from 'react'
import './styles.css'
import { useRef } from 'react'
import TextareaAutosize from 'react-textarea-autosize';

interface Props{
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void
} 
const InputField: React.FC<Props> = ({todo, setTodo, handleAdd}) => {

  const inputRef = useRef<HTMLTextAreaElement>(null)
  const submitRef = useRef<HTMLButtonElement>(null)
  return (
    <form 
      className="input" 
      onKeyDown={(e) => {
        if(e.code === 'Enter') {
          handleAdd(e)
          inputRef.current?.blur()
        }
      }}
    >
      
      <TextareaAutosize 
        ref={inputRef}
        className='input__box' 
        placeholder='enter a task' 
        value={todo}
        onChange={(e) => {
          setTodo(e.target.value)
        }}
      />
      {todo 
        ? <button 
          ref={submitRef} 
          className='input__submit'
          type='submit' 
          onClick={(e) => {
            handleAdd(e)
            inputRef.current?.blur()
          }}
          
        >Add</button>
        : <></>
      }
    </form>
  )
}

export default InputField