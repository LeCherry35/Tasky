import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import NavButton from '../Button/NavButton';
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
                <NavButton onClick={() => navigate('/calendar')} disabled={location.pathname === '/calendar'} name={'calendar'} />
                <NavButton onClick={() => navigate('/')} disabled={location.pathname === '/'} name={'todos'} />
                <NavButton onClick={() => navigate('/events')} disabled={location.pathname === '/events'} name={'events'} />
            </div>
            <div className={s.user}>
                {location.pathname !== '/auth' && <NavButton onClick={() => navigate('/auth')} name={isAuth ? 'log out' : 'log in'} />}

            </div>
        </div>
    )
}

export default NavBar