import { Body } from "../views/Body/Body"

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

export const updateProfile = async (token, data) => {
    try { 
        const response = await fetch (`${URL}/profile`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        
        return await response.json()

    } catch (error) {
        console.log("error updating user" + error)
    }
}