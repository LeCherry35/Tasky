import React from 'react'
import s from './NameInputField.module.css'
import TextareaAutosize from 'react-textarea-autosize';
import NavButton from '../Button/NavButton';

interface Props {
  placeholder: string,
  setText: React.Dispatch<React.SetStateAction<string>>,
  text: string,
  onSubmit: React.MouseEventHandler<HTMLButtonElement> | undefined
  disabled?: boolean

}
const NameInputField: React.FC<Props> = ({ placeholder, setText, text, onSubmit, disabled = false}) => {

  return (
    <div className={s.container}>
      <TextareaAutosize
        className={s.nameInput}
        placeholder={placeholder}
        value={text}
        onChange={(e) => {
          setText(e.target.value)
        }}
      />
      <NavButton disabled={disabled} onClick={onSubmit} name={'add'} />
      
    </div>
  )
}

export default NameInputField