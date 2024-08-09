import { createContext, useState } from "react";

export const PostContext = createContext()

export const PostProvider = ({children}) => {
const [postId, setPostId] = useState(null)

return <PostContext.Provider value={{postId, setPostId}}>

    {children}

</PostContext.Provider>

}