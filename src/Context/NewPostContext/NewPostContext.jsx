import { createContext, useState } from "react";

export const NewPostContext = createContext()

export const NewPostProvider = ({children}) => {

const [newPostPop, setNewPostPop] = useState(false)

return <NewPostContext.Provider value={{newPostPop, setNewPostPop}}>

    {children}

</NewPostContext.Provider>

}