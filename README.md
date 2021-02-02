# Explorify Dynamic Web APP

Explorify is a web application where you can buy tours on multiple locations on the USA. The page has a **nice Front End design**, but most importantly it has a lot of functionalities made possible thanks to its **own made API**. This page was made with **JavaScript, Node.js, Express, MongoDB for the database, mongoose, pug, JWT, webpack** and a lot more modern technologies (you can see them all on package.json file)

# What can i do in this page?

This is the list of things that you can try on this page:

- Sign up
- Login
- Look at all the tours details (including a map supported by Mapbox API)
- Book a Tour (only logged in)(made possible with Stripe API)
- Update your user information (only logged in)
- Update your password (only logged in)
- Update your profile picture (only logged in)
- See your bookings (only logged in)
- Keep being logged in thanks to cookies and jwt

## What pages does this web have?

This APP consist of this pages for now:

- The Home
- Each Tour
- User Profile
- Signup
- Login
- My Bookings
- My Reviews (not yet implemented)
- Billing Page (will never be implemented because this is not a real business page)
- Tour Guides and Admins Private Adminitrative Pages (not yet implemented)

There are alot more API functionalities that aren't implemented in the page yet, which are every CRUD operation on the 4 collections: Reviews, Users, Tours and Bookings. You can try some on postman if you like.

## How does it work?

The pages are Server Side Rendered by Node.js with Pug as the view engine. Almost all data seen on the pages are not strictly written but dynamically brought from the API. When the user hits one of the routes a request is made to the API and it GETS, POST, PATCH or DELETES according to the specific route. Every password is encrypted before saving it to the database. There is a huge amount of effort put in making this page really secure. Also every possible error is covered.

## What other technologies did you use?

I used:

- Postman
- Mapbox
- Nodemailer
- SendGrid
- Stripe
- Axios
- Multer
- Morgan
- Sharp
- Slugify

## Is all the code in this repository?

Every line of code is in this repository except for the node_modules folder and the .env files where all the sensitive data should be.

## I want to try the page but without signin up

You can try one of this test users if you wish:

- laura@example.com pass: test1234
- leo@example.com pass: test1234

For security measures this are on "user" roles. If you want to try lead-guides permission contact me personally.

## Thank you for reading! Remember to contact me on LinkedIn or my email. The live page should be on the repository description.

Made in Argentina by Felipe Stuart.
