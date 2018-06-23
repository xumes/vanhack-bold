import React, { Component } from 'react'
import axios from 'axios'

import Review from './Review'

class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            reviews: {}
        }

        axios
            .get('/api/db/get/reviews')
            .then(reviews => {
                console.log("all reviews", reviews)
                this.setState({ reviews })
            })
    }

    render() {
        return (
            <div>
                <h1>Dashboard</h1>
                {
                    Object.keys(this.state.reviews)
                    .map(key => {
                        return <Review key={key} review={this.state.reviews[key]} />
                    })
                }
            </div>

        )
    }
}

export default Dashboard