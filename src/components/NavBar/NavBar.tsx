
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import s from './NavBar.module.css'

const NavBar = () => {
    const {isAuth} = useTypedSelector(state => state.user) 

    let navigate = useNavigate();
    let location = useLocation()

    useEffect(() => {
    
    },[location])
    return (
        <div className={s.container}>
            <div className={s.navButtonContainer}>
                {location.pathname !== '/calendar' && <button className={s.sideButton} onClick={() => navigate('/calendar')}>calendar</button>}
                {location.pathname !== '/' && <button className={s.sideButton} onClick={() => navigate('/')}>todos</button>}
                {location.pathname !== '/events' && <button className={s.sideButton} onClick={() => navigate('/events')}>events</button>}

            </div>
            <div className={s.user}>
                {location.pathname !== '/auth' && <button className={s.sideButton} onClick={() => navigate('/auth')}>{isAuth ? 'log out' : 'log in'}</button>}

            </div>
        </div>
    )
}

export default NavBar