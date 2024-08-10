import { createContext, useState } from "react";

export const NewPostContext = createContext()

export const NewPostProvider = ({children}) => {

const [newPost, setNewPost] = useState(false)

return <NewPostContext.Provider value={{newPost, setNewPost}}>

    {children}

</NewPostContext.Provider>

}