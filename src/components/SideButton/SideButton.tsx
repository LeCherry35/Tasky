import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import s from './SideButton.module.css'

const SideButton: React.FC = () => {

  let navigate = useNavigate();
  let location = useLocation()

    useEffect(() => {
    
  },[location])
  return (
    <>
    {location.pathname === '/calendar'
      ? <button className={s.sideButton} onClick={() => navigate('/')}>todos</button>

      : <button className={s.sideButton} onClick={() => navigate('/calendar')}>calendar</button>
    }
    </>

  )
}

export default SideButton