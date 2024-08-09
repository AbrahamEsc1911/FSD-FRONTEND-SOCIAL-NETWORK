const URL = "http://localhost:4000/api/v1/comments"

export const newComments = async (token, postId, newComment) => {
    const response = await fetch(`${URL}/${postId}`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(newComment)
    })

    return await response.json()
}