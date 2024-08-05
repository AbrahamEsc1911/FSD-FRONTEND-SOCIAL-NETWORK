import { createContext, useEffect, useState } from "react";

export const PassportContext = createContext()

export const PassportProvider = ({ children }) => {

    const [passport, setPassport] = useState(null)

    useEffect(() => {
        const passport = JSON.parse(localStorage.getItem("passport"))

        if (passport) {
            setPassport(passport)
        }

    }, [])

    return <PassportContext.Provider value={{ passport, setPassport }} >

        {children}

    </PassportContext.Provider>
}