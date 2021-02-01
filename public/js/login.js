import axios from 'axios'
import { showAlert } from './alerts'

export const login = async (email, password) => {
    // console.log(email, password)
    try {
        const res = await axios.post('http://127.0.0.1:3000/api/v1/users/login', {email, password}, {withCredentials: true})

        if(res.data.status === 'success') {
            // alert('Logged in successfully')
            showAlert('success', 'Logged in successfully')
            window.setTimeout(() => {
                location.assign('/')
            }, 600)
        }
    } catch(err) {
        showAlert('error', err.response.data.message)
    }
    
    
}

export const logout = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: 'http://127.0.0.1:3000/api/v1/users/logout'
        })

        if(res.data.status === 'success') location.assign('/')
    }   
    catch(err) {
        showAlert('error', 'Error logging out! Try again.')
    }
}