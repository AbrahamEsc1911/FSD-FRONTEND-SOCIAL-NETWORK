import { createContext, useState } from "react";

export const NavigationContext = createContext()

export const NavigationProvider = ({children}) => {

const [navigation, setNavigation] = useState(false)

return <NavigationContext.Provider value={{navigation, setNavigation}}>

    {children}

</NavigationContext.Provider>

}