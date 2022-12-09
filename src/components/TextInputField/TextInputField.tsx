import React from 'react'
import s from './TextInputField.module.css'
import TextareaAutosize from 'react-textarea-autosize';

interface Props {
  text: string,
  setText: React.Dispatch<React.SetStateAction<string>>
}
const TextInputField: React.FC<Props> = ({text, setText}) => {

  return (
    <form className={s.input} >
      <TextareaAutosize
        className={s.input__box}
        placeholder='enter the name of the event' 
        value={text}
        onChange={(e) => {
          setText(e.target.value)
        }}
      />
    </form>
  )
}

export default TextInputField