
if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config({path: './.env'})
}

// how to call variables from .env
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY


// console.log(stripeSecretKey, stripePublicKey)

const fs = require('fs')
const express = require ('express')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const app = express()
app.set('view engine', 'ejs')









// app.use takes a middleware function that is passed through request, response and then next
app.use(express.static(process.env.STATIC_DIR))
app.use(express.json())

const {resolve} = require('path')

// basic routing

app.get('/about', (req,res) => {
    const path = resolve(process.env.STATIC_DIR + '/about.html')
    res.sendFile(path)
})

app.get('/', (req,res) => {
    const path = resolve(process.env.STATIC_DIR + '/index.html')
    res.sendFile(path)
})


// routing for stripe

app.get('/public-keys', (req, res) =>{
    res.send({key: process.env.STRIPE_PUBLIC_KEY})

})

app.post('/my-route', (req, res) =>{
    console.log('body', req.body)
    // usually whats done:
    // put data in DB
    // make an API call
    res.send(req.body)

})

// push notifications to you, event notifications

app.post('/webhook', (req, res) =>{
    const event = req.body

    switch (event.type){
        case 'checkout.session.completed':
            const session = event.data.object
            console.log('Checkout Session ID: ', session.id)
            break;
        case 'payment_intent.created':
            const paymentIntent = event.data.object
            console.log('Payment Intent Created: ', paymentIntent.id)
        default:
            console.log('Unknown event type: ' + event.type)
    }

    res.send({ message: 'success'})
})


app.get('/test', (req, res) =>{
    const path = resolve('test.html')
    res.sendFile(path)
    
})


// CREATES PAYMENT INTENT

// const paymentIntent = await stripe.paymentIntents.create({
//     amount: 1099,
//     currency: 'usd',
//     // Verify your integration in this guide by including this parameter
//     metadata: {integration_check: 'accept_a_payment'},
//   });



  // CREATE SERVER ENDPOINT THAT SERVERS CLIENT SECRET


//   app.get('/secret', async (req, res) => {
//     const intent = // ... Fetch or create the PaymentIntent
//     res.json({client_secret: intent.client_secret});
//   });
  

//   // 











// app.post('/create-checkout-session', async (req, res) => {
//     const session = await stripe.checkout.sessions.create({
//         success_url: 'https://localhost:3000',
//         cancel_url: 'https://localhost:3000',
//         payment_method_types: ['card'],
//         mode: 'payment',
//         line_items: [
//             // how to load from json file?
//             // how to load multiple items?
//             {price: 'price_1I2oixKYgawD41Gal2YrhR4j', 
//             quantity: req.body.quantity, },
//         ],
//     })
    
//     res.json({
//         id: session.id,
//     })
// })

// app.post('/create-checkout-session', async (req, res) => {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [{
//           price: 'price_1I2t5bKYgawD41Gadoo4SChV',
//           quantity: 1,
//       }],
//       mode: 'payment',
//       success_url: 'https://localhost:3000/success?id={CHECKOUT_SESSION_ID}',
//       cancel_url: 'https://localhost:3000/cancel',
//     });
  
//     res.json({ id: session.id, });
//   });












// to use values in our server inside html, use templating language such as ejs
app.get('/store', function(req, res){
    fs.readFile('items.json', function(error, data){
        if (error){
            res.status(500).end()
        } else{
            res.render('store.ejs', {
                items: JSON.parse(data) //this method requires the file to be in views
            })
        }
    })
})




app.listen(3000, () =>
{
    console.log("Server started and being automatically updated with changes")
    // console.log(stripe.plans.list())
    // above tests if stripe is initialized
})

// to listen in stripe: stripe listen --forward-to localhost:3000/webhook
// trigger event in stripe: stripe trigger payment_intent.created
