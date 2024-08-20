import { createContext, useState } from "react";

export const NavigationContext = createContext()

export const NavigationProvider = ({children}) => {

const [navitagion, setNavigation] = useState(false)

return <NavigationContext.Provider value={{navitagion, setNavigation}}>

    {children}

</NavigationContext.Provider>

}