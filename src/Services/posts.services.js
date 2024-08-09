const URL = "http://localhost:4000/api/v1/posts/"

export const likeDislike = async (token, postId) => {
    const response = await fetch(`${URL}/like/${postId}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    return await response.json()
}

export const getPostById = async (postId) => {
    const response = await fetch(`${URL}/${postId}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
        }
    })

    return await response.json()
}

export const timeline = async (token) => {
    try {
        const response = await fetch(`${URL}/timeline`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })

        return await response.json()

    } catch (error) {
        console.error("error retriving posts")
    }
}