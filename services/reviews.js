const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'mysql472.umbler.com',
    port: 41890,
    user: 'bold',
    password: 'VanhackJun18',
    database: 'bold-vanhack'
})

exports.getReviews = () => {
    var promise = new Promise((resolve, reject) => {

        //connect to database
        connection.connect()

        //run the query
        const sql = `SELECT id, shopify_domain, app_slug, star_rating, previous_star_rating, updated_at, created_at FROM shopify_app_reviews;`
        connection.query(sql, (err, results, fields) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        })

        //terminates the connection
        connection.end();

    });

    return promise;
};

exports.saveReviews = () => {
    var promise = new Promise((resolve, reject) => {

        //connect to database
        connection.connect()

        //run the query
        const sql = `SELECT id, shopify_domain, app_slug, star_rating, previous_star_rating, updated_at, created_at FROM shopify_app_reviews;`
        connection.query(sql, (err, results, fields) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        })

        //terminates the connection
        connection.end();

    });

    return promise;
};
