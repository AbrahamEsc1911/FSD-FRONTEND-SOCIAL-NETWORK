import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getUserById } from '../../Services/user.services'

export const AnyUserProfile = () => {

    const { id } = useParams()

    useEffect(() => {
      
        const bringUser = async () => {
            const res = await getUserById(id)
            console.log(res)
        };
        bringUser()

    }, [])
    

  return (
    <div>AnyUserProfile</div>
  )
}
