import React from 'react'
import { useNavigate } from 'react-router-dom';
import s from './SideButton.module.css'

interface Props {
  name: string
  location: string
}
const SideButton: React.FC<Props> = ({name, location}) => {

  let navigate = useNavigate();


  return (
    <button className={s.sideButton} onClick={() => navigate(location)}>{name}</button>
  )
}

export default SideButton