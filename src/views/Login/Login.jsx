import React, { useContext, useState } from 'react'
import { CInputs } from '../../components/CInputs/CInputs'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import { login } from '../../Services/auth.services'
import { jwtDecode } from 'jwt-decode'
import { PostContext } from '../../Context/postContext/postContex'
import { AnyUserContex} from '../../Context/AnyUserProfileContext/anyUserProfileContext'


export const Login = () => {
    const [credentials, setCredentials] = useState(
        {
            email: "",
            password: ""
        }
    )

    const [warningMessage, setWarningMessage] = useState(false)
    const [invalidAccesMessage, setInvalidAccesMessage] = useState(false)
    const [passwordChart, setPasswordChart] = useState(false)
    const navigate = useNavigate()
    const { postId } = useContext(PostContext)
    const { navigationPath } = useContext(AnyUserContex)

    const handleChangeLog = (e) => {
        setCredentials(prevState => (
            {
                ...prevState,
                [e.target.name]: e.target.value
            }
        ))
    }

    const loginButton = async () => {
        if (credentials.email.length === 0 || credentials.password.length === 0) {
            setWarningMessage(true)
            setInvalidAccesMessage(false)
        } else if (credentials.password.length < 8 || credentials.password.length > 12) {
            setWarningMessage(false)
            setPasswordChart(true)
            setInvalidAccesMessage(false)
        } else {
            const response = await login(credentials)
            setPasswordChart(false)

            if (response.success) {
                const tokenDecoded = jwtDecode(response.data)
                const passport = {
                    token: response.data,
                    tokenData: tokenDecoded
                }
                localStorage.setItem('passport', JSON.stringify(passport))
                if (postId !== null) {
                    navigate(`/post/${postId}`)
                } else if(navigationPath !== null) {
                    navigate(`/user/${navigationPath}`)
                }
                 else {
                    navigate("/profile")
                }

            } else {
                setInvalidAccesMessage(true)
            }
        }
    }

    return (
        <>
            <h3>Ingresar</h3>
            <CInputs type="email" name="email" placeholder="Email" onChange={handleChangeLog} />
            <CInputs type="password" name="password" placeholder="Constraseña" onChange={handleChangeLog} />
            <p className={warningMessage ? "" : "hidden-content"}>Email y contraseña son requeridos</p>
            <p className={passwordChart ? "" : "hidden-content"}>la contraseña debe ser mayor a 8 y menor a 12 caracteres</p>
            <p className={invalidAccesMessage ? "" : "hidden-content"}>Correo o contraseña incorrectos</p>
            <CInputs type="button" name="login" value="ingresar" onClick={loginButton} />

        </>
    )
}
