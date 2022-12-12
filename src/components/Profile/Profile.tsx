import React from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'

const Profile = () => {
    const {user} = useTypedSelector(state => state.user)
  return (
    <div>
    </div>
  )
}

export default Profile