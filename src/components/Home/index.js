import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

class Home extends Component {
  render() {
    return (
      <div className="bg-home-container">
        <Header />
        <div className="container-details-home">
          <h1 className="home-header">
            Find The Job
            <br /> That Fits Your Life
          </h1>
          <p className="home-description">
            Millions of people are searching for jobs,salary, information,
            <br />
            company reviews.Find the job that fits your abilities and potential.
          </p>
          <Link to="/jobs">
            <button type="button" className="btn-findJobs">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Home
