const express = require('express')
const router = express.Router()

const Reviews = require('../services/reviews')
const Shopify = require('../services/shopify')

const init = connection => {
    router.get('/', async (req, res) => {
        res.json({ 'status': 'You are in the API route' })
    });

    router.get('/db/get/reviews', (req, res) => {
        Reviews.getReviews()
            .then(data => res.send(data))
            .catch(err => console.log('error', err))
    });

    router.get('/shopify/get/reviews', (req, res) => {
        //connect to Shopify to get updated reviews
        Shopify.getReviews(req.query.app)
            .then(data => res.send(data))
            .catch(err => console.log('error', err))

        //connect to database to store the infomation
    })




    return router;
}



module.exports = init