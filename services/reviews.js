const mysql = require('mysql2')
const bluebird = require('bluebird');

const connection = mysql.createConnection({
    host: 'mysql472.umbler.com',
    port: 41890,
    user: 'bold',
    password: 'VanhackJun18',
    database: 'bold-vanhack',
    Promise: bluebird
})

exports.getReviews = () => {
    var promise = new Promise((resolve, reject) => {

        //run the query
        const sql = `SELECT id, shopify_domain, app_slug, star_rating, previous_star_rating, updated_at, created_at FROM shopify_app_reviews;`
        connection.execute(sql, (err, results, fields) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        })

    });

    return promise;
};

exports.getOneReview = (params) => {
    var promise = new Promise((resolve, reject) => {


        //run the query
        const sql = `SELECT id, shopify_domain, app_slug, star_rating, previous_star_rating, updated_at, created_at 
                    FROM shopify_app_reviews
                    WHERE shopify_domain = '${params.shopify_domain}' and app_slug = '${params.app_slug}';`
        connection.execute(sql, (err, results, fields) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        })


    });

    return promise;
};

exports.saveReviews = (info) => {
    var promise = new Promise((resolve, reject) => {

        console.log('saving this reviews: ', info)


        //run the query
        const sql = `INSERT INTO 
                        shopify_app_reviews (
                            shopify_domain, app_slug, star_rating, created_at
                        ) VALUES (
                            '${info.shopify_domain}', 
                            '${info.app_slug}', 
                            ${info.star_rating},
                            '${info.created_at}'
                        );`

        connection.execute(sql, (err, results, fields) => {
            if (err) {
                reject(err);
            }
            resolve(true);
        })


    });

    return promise;
};

exports.updateReview = (info) => {
    var promise = new Promise((resolve, reject) => {

        console.log('updating this review: ', info)

        //run the query
        const sql = `UPDATE shopify_app_reviews SET
                             star_rating = ${info.star_rating}, updated_at = '${info.updated_at}'
                        WHERE 
                        shopify_domain = '${info.shopify_domain}' AND
                        app_slug = '${info.app_slug}'
                        ;`

        console.log("UPDATE SQL", sql)
        connection.execute(sql, (err, results, fields) => {
            if (err) {
                reject(err);
            }
            resolve(true);
        })


    });

    return promise;
};