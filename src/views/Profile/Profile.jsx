import React, { useContext, useEffect, useState } from 'react'
import { PassportContext } from '../../Context/Passport/PassportContext'

export const Profile = () => {

    const {passport} = useContext(PassportContext)
    console.log(passport)

    const [userData, setUserData] = useState(
        {
            name: "",
            email: "",
            createdAt: "",
            posts: "",
            followers: ""
        }
    )

    useEffect(() => {


    }, [])

    return (
        <>

        </>
    )
}
