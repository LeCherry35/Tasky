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
      onSubmit={(e) => {
        handleAdd(e)
        inputRef.current?.blur()
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
      <button 
        ref={submitRef} 
        className={todo ? "input__submit input__submit_red " : "input__submit"}
        type='submit' 
      >Go</button>
    </form>
  )
}

export default InputField