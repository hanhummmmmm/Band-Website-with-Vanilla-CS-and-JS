
if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config({path: './.env'})
}

// how to call variables from .env
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY


// console.log(stripeSecretKey, stripePublicKey)


const express = require ('express')
const app = express()
const fs = require('fs')


app.set('view engine', 'ejs')
app.use(express.static(process.env.STATIC_DIR))


// to use values in our server inside html, use templating language such as ejs
app.get('/store', function(req, res){
    fs.readFile('items.json', function(error, data){
        if (error){
            res.status(500).end()
        } else{
            res.render('store.ejs', {
                stripePublicKey: stripePublicKey,
                items: JSON.parse(data) //this method requires the file to be in views
            })
        }
    })
})


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const {resolve} = require('path')

app.get('/about', (req,res) => {
    const path = resolve(process.env.STATIC_DIR + '/about.html')
    res.sendFile(path)
})

// const session = await stripe.checkout.sessions.create({
//     success_url: 'https://example.com/success',
//     cancel_url: 'https://example.com/cancel',
//     payment_method_types: ['card'],
//     line_items: [
//         {price: 'price', quantity: 2 },
//     ],
//     mode: 'payment'
// })


app.listen(3000)
