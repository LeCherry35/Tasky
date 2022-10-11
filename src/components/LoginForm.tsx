import React, {FC, useState} from 'react'
import { login, logout, register } from '../asyncActions/user';
import { useTypedDispatch } from '../hooks/useTypedDispatch';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { hidePanel } from '../store/reducers/authPanelReducer';


const LoginForm: FC = () => {
    
    const dispatch = useTypedDispatch();
    const [email,setEmail] = useState<string>('')
    const [password,setPassword] = useState<string>('')
    const {isAuth, user, error, isLoading} = useTypedSelector(state => state.user)
    const {shown} = useTypedSelector(state => state.authPanel)

    return (
        <div className={shown ? "user user--shown" : 'user'}>
            <button className="user__closeButton" onClick={()=>{
                dispatch(hidePanel())
            }
            }>x</button>
            {isAuth 
            ? <div className='user__box'> 
                {user.isActivated 
                ? <><button className='user__button' onClick={() => {
                    dispatch(logout())
                    setEmail('')
                    setPassword('')
                }}>LOG OUT</button></>
                :<div className="user__error">Tasky has sent activation link to {user.email}</div>}
                <button className='user__button' onClick={() => {
                    dispatch(logout())
                    setEmail('')
                    setPassword('')
                }}>LOG OUT</button>
            </div>
            : <>
            <form className='user__box'>
                <div className="user__error">{error}</div>
                <input
                    className='user__input'
                    placeholder='Email'
                    onChange={e => setEmail(e.target.value)}    
                    value={(email)}
                    type='text'
                />
                <input
                    className='user__input'
                    placeholder='Pass'
                    onChange={e => setPassword(e.target.value)}    
                    value={(password)}
                    type='password'
                />
                <button className='user__button' onClick={(e) => {
                    e.preventDefault()
                    dispatch(register(email, password))
                    setEmail('')
                    setPassword('')
                }}>Register</button>
                <button className='user__button' onClick={(e) => {
                    e.preventDefault()
                    dispatch(login(email, password))
                    setEmail('')
                    setPassword('')
                }}>Log in</button>

            </form>
            </>}
            {isLoading 
            ? <div className="user__loading">Loading</div>
            : <></>}
        </div>
    )
}

export default LoginForm