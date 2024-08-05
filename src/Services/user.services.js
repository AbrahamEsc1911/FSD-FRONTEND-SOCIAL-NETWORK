const URL = "http://localhost:4000/api/v1/users"

export const userProfile = async (token) => {

    const response = await fetch(`${URL}/profile`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    return await response.json()
}