const express = require('express');
const router = express.Router();
const moment = require('moment');

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
        const appSlug = req.query.app
        Shopify.getReviews(appSlug)
            .then(data => {

                //check if this review is already on the database
                Reviews.getOneReview(
                    storeData(data.reviews[0], appSlug)
                )
                    .then(review => {
                        if (review.length > 0) {
                            // save the reviews on the database
                            Reviews.updateReview(
                                updateData(data.reviews[0], review[0], appSlug)
                            )
                                .then(status => res.send(data))
                                .catch(err => res.send(err))
                        } else {
                            console.log("there is no previous review for that")
                            Reviews.saveReviews(
                                storeData(data.reviews[0], appSlug)
                            )
                                .then(status => res.send(data))
                                .catch(err => res.send(err))
                        }
                    })
            })
            .catch(err => console.log('error', err))
    })

    return router;
}

const storeData = (data, appSlug) => {
    const currentDate = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    const info = {
        shopify_domain: data.shop_domain,
        app_slug: appSlug,
        star_rating: data.star_rating,
        created_at: currentDate
    }
    return info
}

const updateData = (data, review, appSlug) => {
    const currentDate = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    const info = {
        shopify_domain: data.shop_domain,
        app_slug: appSlug,
        star_rating: data.star_rating,
        previous_star_rating: review.star_rating,
        updated_at: currentDate 
    }
    return info
}

module.exports = init