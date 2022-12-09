import React, {FC, useEffect, useState} from 'react'
import { login, logout, register } from '../../asyncActions/user';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { clearErrorAction } from '../../store/reducers/userReducer';
import s from './LoginForm.module.css'



const LoginForm: FC = () => {
    
    const dispatch = useTypedDispatch();
    const [email,setEmail] = useState<string>('')
    const [password,setPassword] = useState<string>('')
    const {isAuth, user, error, isLoading} = useTypedSelector(state => state.user)

    useEffect(() => {
        dispatch(clearErrorAction())
    }, [dispatch])
    
    return (
        <div className={s.user}>
            {isAuth 
            ? <div className={s.user__box}> 
                {user.isActivated 
                ? <>{user.email}</>
                :<div>
                    Tasky has sent activation link to {user.email}
                </div>}
                <button className={s.user__button} onClick={() => {
                    dispatch(logout())
                    setEmail('')
                    setPassword('')
                }}>LOG OUT!</button>
            </div>
            : <>
            <form className={s.user__box}>
                <div className={s.user__error}>{error}</div>
                <input
                    className={s.user__input}
                    placeholder='Email'
                    onChange={e => setEmail(e.target.value)}    
                    value={(email)}
                    type='text'
                />
                <input
                    className={s.user__input}
                    placeholder='Password'
                    onChange={e => setPassword(e.target.value)}    
                    value={(password)}
                    type='password'
                />
                <div className={s.buttonContainer}>
                    <button className={s.user__button} onClick={(e) => {
                        e.preventDefault()
                        dispatch(register(email, password))
                        if (isAuth) setEmail('')
                        setPassword('')
                    }}>Register</button> or
                    <button className={s.user__button} onClick={(e) => {
                        e.preventDefault()
                        dispatch(login(email, password))
                        if (isAuth) setEmail('')
                        setPassword('')
                    }}>Log in</button>
                </div>

            </form>
            </>}
            {isLoading 
            ? <div className={s.user__loading}>Loading</div>
            : <></>}
        </div>
    )
}

export default LoginForm