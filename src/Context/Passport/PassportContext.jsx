import { createContext, useState } from "react";

export const PassportContext = createContext()

export const PassportProvider = ({children}) => {

   const [passport, setPassport] = useState(null)

   return <PassportContext.Provider value={{passport, setPassport}} >

    {children}

   </PassportContext.Provider>
}