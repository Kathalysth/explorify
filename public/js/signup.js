import axios from 'axios'
import { showAlert } from './alerts'

export const signup = async (name, email, password, passwordConfirm) => {
    try {
        const res = await axios.post('/api/v1/users/signup', {name, email, password, passwordConfirm}, {withCredentials: true})
    
        if(res.data.status === 'success') {
            // alert('Logged in successfully')
            showAlert('success', 'Signed up successfully')
            window.setTimeout(() => {
                location.assign('/')
            }, 600)
        }
    } catch(err) {
        showAlert('error', err.response.data.message)
    }
}

