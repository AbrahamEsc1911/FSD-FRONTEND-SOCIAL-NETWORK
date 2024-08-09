import { createContext, useState } from "react";

export const AnyUserContex = createContext()

export const AnyUserProvider = ({ children }) => {

    const [navigationPath, setNavigationPath] = useState(null)

    return <AnyUserContex.Provider value={{ navigationPath, setNavigationPath }}>

        {children}

    </AnyUserContex.Provider>

}