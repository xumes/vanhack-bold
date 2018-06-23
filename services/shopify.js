const axios = require('axios')

const uri = 'https://apps.shopify.com/'

exports.getReviews = (appName) => {
    var promise = new Promise((resolve, reject) => {

        axios
            .get(`${uri}/${appName}/reviews.json`)
            .then(data => resolve(data.data))
            .catch(err => reject(err))
    });

    return promise;
};

