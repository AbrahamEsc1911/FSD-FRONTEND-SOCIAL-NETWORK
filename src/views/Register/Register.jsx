import React, { useState } from 'react'
import { CInputs } from '../../components/CInputs/CInputs'
import './Register.css'
import { useNavigate } from 'react-router-dom'
import { register } from '../../Services/auth.services'

export const Register = () => {

    const [credentials, setCredentials] = useState(
        {
            name: "",
            email: "",
            password: ""
        }
    )

    const [emailAndPassRequired, setEmailAndPassRequired] = useState(false)
    const [passwordLong, setPasswordLong] = useState(false)
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState("")

    const handleChange = (e) => {

        setCredentials(prevState => (
            {
                ...prevState,
                [e.target.name]: e.target.value
            }
        ))
    }

    const registerButton = async () => {

        if (credentials.email.length === 0 || credentials.password.length === 0) {
            setEmailAndPassRequired(true)
            setPasswordLong(false)
        }
        else if (credentials.password.length < 8 || credentials.password.length > 12) {
            setEmailAndPassRequired(false)
            setPasswordLong(true)
        }
        else {
            setEmailAndPassRequired(false)
            const response = await register(credentials)
            if (response.success) {
                navigate("/login")
            } else if (response.message === "Coulnt create a new user") {
                setErrorMessage("No fue posible registrarse, intenta de nuevo con otro email")
            }
        }
    }

    return (
        <>
            <h1>Registro</h1>
            <p>{errorMessage}</p>
            <CInputs type="text" name="name" placeholder="Nombre" onChange={handleChange} />
            <CInputs type="email" name="email" placeholder="Email" onChange={handleChange} />
            <CInputs type="password" name="password" placeholder="Password" onChange={handleChange} />
            <p className={emailAndPassRequired ? "" : "hidden-content"}>Email y contraseña son requeridos</p>
            <p className={passwordLong ? "" : "hidden-content"}>La contraseña debe ser entre 8 y 12 caracteres</p>
            <CInputs type="button" value="Registrarse" onClick={registerButton} />
        </>
    )
}
