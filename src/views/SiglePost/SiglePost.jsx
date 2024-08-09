import React, { useEffect, useState } from 'react'
import { getPostById } from '../../Services/posts.services'
import { useParams } from 'react-router-dom'

export const SiglePost = () => {

    const {id} = useParams()
    const [post, setPost] = useState(
        {

        }
    )

    useEffect(() => {
     
        const bringPostById = async () => {
            const res = await getPostById(id)
            console.log(res)
        };

         bringPostById()

    }, )
    

  return (
    <div>SiglePost</div>
  )
}
