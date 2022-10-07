import React , {FC, useState} from 'react'
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../hooks/useTypedSelector';

const InfoBar: FC = () => {
    const [email,setEmail] = useState<string>('')
    const [password,setPassword] = useState<string>('')
    const {isAuth, user} = useTypedSelector(state => state.user)  
    const {shown} = useTypedSelector(state => state.authPanel) 
    
const dispatch = useDispatch()

    return (
        <>
        {isAuth
            ? <div 
            className='infobar'
            onMouseEnter={() => {
                dispatch({type: 'SHOW_PANEL'})
        }}> OK </div>
        : <div 
        className='infobar infobar--warning'
        onMouseEnter={() => {
            dispatch({type: 'SHOW_PANEL'})
        }}>Please log in</div>
        }</>
    )
}

export default InfoBar