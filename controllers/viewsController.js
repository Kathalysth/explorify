const Tour = require('../models/tourModel')
const User = require('../models/userModel')
const Booking = require('../models/bookingModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  const tours = await Tour.find()


  // 2) Build template

  // 3) render template using tour data from step 1


  res.status(200).render('overview', {
      title: 'Home',
      titulo: 'Explorify',
      description: 'LOOKING FOR A NEW ADVENTURE? LOOK OUR TOURS AND FIND ONE THAT SUITS YOU!',
      tours
  })
})

exports.getTour = catchAsync(async (req, res, next) => {
  // 1) Get data for requested tour (including reviews and guides)
  const tour = await Tour.findOne({ slug: req.params.slug}).populate({
    path: 'reviews',
    fields: 'reviews rating user'
  })

  if(!tour) {
    return next(new AppError('There is no tour with that name', 400))
  }

  // console.log(tour)



  // 2) Build template

  // 3) Render template using the data from 1

  res.status(200).render('tour', {
      title: tour.name,
      tour
  })
})

exports.getLogin = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account'
  })
}

exports.getSignup = (req, res) => {
  res.status(200).render('signup', {
    title: 'Sign up your new account'
  })
}

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account'
  })
}

exports.getMyTours = catchAsync(async (req, res, next) => {
  // 1) find all bookings
  const bookings = await Booking.find({ user: req.user.id })

  // 2) find tours with the returned IDs
  const tourIDs = bookings.map(el => el.tour)
  const tours = await Tour.find({ _id: { $in: tourIDs}}) // in tourIDs array
  res.status(200).render('overview', {
    titulo: 'My Bookings',
    title: 'My Bookings',
    description: 'This are the tours you booked!',
    tours
  })
})

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(req.user.id, {
    name: req.body.name,
    email: req.body.email
  },
  {
    new: true,
    runValidators: true
  }
 )

  res.status(200).render('account', {
    title: 'Your Account',
    user: updatedUser
  })

})