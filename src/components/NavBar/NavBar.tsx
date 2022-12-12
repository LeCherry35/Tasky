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
                <button className={s.sideButton} onClick={() => navigate('/calendar')} disabled={location.pathname === '/calendar'}>calendar</button>
                <button className={s.sideButton} onClick={() => navigate('/')} disabled={location.pathname === '/'}>todos</button>
                <button className={s.sideButton} onClick={() => navigate('/events')} disabled={location.pathname === '/events'}>events</button>
            </div>
            <div className={s.user}>
                {location.pathname !== '/auth' && <button className={s.sideButton} onClick={() => navigate('/auth')}>{isAuth ? 'log out' : 'log in'}</button>}

            </div>
        </div>
    )
}

export default NavBar