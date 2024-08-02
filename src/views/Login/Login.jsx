import React from 'react'
import { CInputs } from '../../components/CInputs/CInputs'

export const Login = () => {

    const handleChangeLog = () => {

    }

    const loginButton = () => {
        
    }

  return (
    <>
    <h3>Ingresar</h3>
    <CInputs type="email" name="email" placeholder="Email" onChange={handleChangeLog} />
    <CInputs type="password" name="password" placeholder="Email" onChange={handleChangeLog} />
    <CInputs type="button" name="login" value="ingresar" onClick={loginButton} />

    </>
  )
}
