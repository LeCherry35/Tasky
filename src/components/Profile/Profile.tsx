import React from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'

const Profile = () => {
    const {user} = useTypedSelector(state => state.user)
    console.log('#$#$#', user);
    
  return (
    <div>
    </div>
  )
}

export default Profile