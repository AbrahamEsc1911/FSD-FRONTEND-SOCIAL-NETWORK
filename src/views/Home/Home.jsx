import React, { useContext, useEffect } from 'react'
import { CInputs } from '../../components/CInputs/CInputs'
import { useNavigate } from 'react-router-dom'
import { PassportContext } from '../../Context/Passport/PassportContext'

export const Home = () => {

    const { passport } = useContext(PassportContext)

    const navigate = useNavigate()

    const navRegister = () => {
        navigate("/register")
    }

    const navLogin = () => {
        navigate("/login")
    }

    useEffect(() => {
        if (passport) {
            navigate("/profile")
        }
    }, [passport])

    return (
        <>
            <h3>Habla con el mundo, y comparte lo que ocurre en tu mundo</h3>
            <CInputs type="button" value="Registrate" onClick={navRegister} />
            <CInputs type="button" value="ingresar" onClick={navLogin} />
        </>
    )
}
