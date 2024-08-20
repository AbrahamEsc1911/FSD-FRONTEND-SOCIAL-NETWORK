import { createContext, useState } from "react";

export const NavBarContext = createContext()

export const NavBarProvider = ({children}) => {
const [navBar, setNavBar] = useState(false)

return <NavBarContext.Provider value={{navBar, setNavBar}}>

    {children}

</NavBarContext.Provider>

}