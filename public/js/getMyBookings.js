import axios from 'axios'
import {showAlert} from './alerts'

export const getMyBookings = async (tourId) => {
    try {
        const res = await axios.get('/api/v1/bookings/my-bookings')

        const tour = res.data.tours.find(tour => tour.id === tourId)

        return tour

        
    } catch(err) {
        showAlert('error', err.response.data.message)
    }
    

    

}