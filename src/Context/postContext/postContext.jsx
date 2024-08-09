import { createContext, useState } from "react";


export const PostContext = createContext()

export const PostProvider = ({ children }) => {

    const [postId, setPostId] = useState("blank")

    return < PostContext.Provider value={{ postId, setPostId }}>
        {children}
    </PostContext.Provider>

}