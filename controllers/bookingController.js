const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const Tour = require('../models/tourModel')
const Booking = require('../models/bookingModel')
const catchAsync = require('../utils/catchAsync')
const factory = require('./handlerFactory')

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
    // 1) get the currently booked tour
    const tour = await Tour.findById(req.params.tourId)


    // 2) create checkout session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url: `${req.protocol}://${req.get('host')}/?tour=${req.params.tourId}&user=${req.user.id}&price=${tour.price}`,
        cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
        customer_email: req.user.email,
        client_reference_id: req.params.tourId,
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: `${tour.name} Tour`,
                        images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
                        description: tour.summary
                    },
                unit_amount: tour.price * 100,
            },
                quantity: 1
            }
        ],
        mode: 'payment'
    });


    // 3) create session as response
    res.status(200).json({
        status: 'success',
        session
    })
});

exports.createBookingCheckout = catchAsync(async (req, res, next) => {
    // This is only TEMPORARY, bc it is insecure: everyone can make bookings without paying
    const {tour, user, price} = req.query

    if(!tour && !user && !price) return next()
    await Booking.create({ tour, user, price })

    res.redirect(req.originalUrl.split('?')[0])
})

exports.createBooking = factory.createOne(Booking)
exports.getBooking = factory.getOne(Booking)
exports.getAllBooking = factory.getAll(Booking)
exports.updateBooking = factory.updateOne(Booking)
exports.deleteBooking = factory.deleteOne(Booking)


exports.getMyBookings = catchAsync(async (req, res, next) => {
    // 1) find all bookings
    const bookings = await Booking.find({ user: req.user.id })
  
    // 2) find tours with the returned IDs
    const tourIDs = bookings.map(el => el.tour)
    const tours = await Tour.find({ _id: { $in: tourIDs}}) // in tourIDs array
    res.status(200).json({
      tours
    })
  })