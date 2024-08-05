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