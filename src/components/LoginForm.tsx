import React, {FC, useState} from 'react'

const LoginForm: FC = () => {
    const [email,setEmail] = useState<string>('')
    const [password,setPassword] = useState<string>('')
    return (
        <div>
            <input
                placeholder='Email'
                onChange={e => setEmail(e.target.value)}    
                value={(email)}
                type='text'
            />
            <input
                placeholder='Pass'
                onChange={e => setPassword(e.target.value)}    
                value={(password)}
                type='text'
            />
            <button>REG</button>
            <button>LOG</button>
        </div>
    )
}

export default LoginForm