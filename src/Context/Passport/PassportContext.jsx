import { createContext, useEffect, useState } from "react";

export const PassportContext = createContext()

export const PassportProvider = ({ children }) => {

    const [passport, setPassport] = useState(JSON.parse(localStorage.getItem("passport")) || null)

    return <PassportContext.Provider value={{ passport, setPassport }} >

        {children}

    </PassportContext.Provider>
}