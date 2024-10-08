const URL = "http://localhost:4000/api/v1/users"

export const register = async (credentials) => {
    try {
        const response = await fetch(`${URL}/register`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(credentials)
        })

        return await response.json()

    } catch (error) {
        console.error(`Error fetching data ${error}`)
    }
}

export const login = async (credenitials) => {
    try {
        const response = await fetch(`${URL}/login`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(credenitials)
        })

        return await response.json()

    } catch (error) {
        console.error(`Error fetching data ${error}`)
    }
}