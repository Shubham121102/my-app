import jwt_decode from 'jwt-decode'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export async function authenticateUser(user, password) {
    const res = await fetch(`${BASE_URL}/login`, {
        body: JSON.stringify({ userName: user, password: password }),
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST'
    })

    const data = await res.json()

    if (user != '' && password != '') {
        if (res.status === 200) {
        setToken(data.token);
        return true;
        } else {
          throw new Error(data.message);
        }
    }
    else {
        throw new Error('Wrong credentials, enter again')
    }
}

function setToken(token) {
    localStorage.setItem('access_token', token)
}

export function getToken() {
    try {
        return localStorage.getItem('access_token')
    } catch (err) {
        return null
    }
}

export function removeToken() {
    localStorage.removeItem('access_token')
}

export function readToken() {
    try {
        const token = getToken()
        return token ? jwt_decode(token) : null
    } catch (err) {
        return null
    }
}

export function isAuthenticated() {
    const token = readToken()
    return token ? true : false
}

export async function registerUser(user, password, password2) {
    const res = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        body: JSON.stringify({ userName: user, password, password2 }),
        headers: {
            'content-type': 'application/json'
        }
    })

    const data = await res.json()

    if (res.status === 200) {
        return true
    } else {
        throw new Error(data.message)
    }
}
