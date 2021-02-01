import axios from "axios"
import { showAlert} from './alerts'

const stripe = Stripe('pk_test_51IFWSYClTg5Ink3ENwAn8qmwKAdYPSo3c7YDGfO9zbHuQHAj66EjnGZK5ndxCxU65LVN5crMkBbpHfoX1XyV7LQj00IJqbRuK3')

export const bookTour = async tourId => {
    try {
        const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`)
    
    // 1) Getcheckout session from api
    
    //console.log(session)

    // 2) create checkout form + charge credit card
        await stripe.redirectToCheckout({
            sessionId: session.data.session.id
        })


    } catch(err) {
        console.log(err)
        showAlert('error', err)
    }
}