import React from 'react'
import {Link} from 'react-router-dom'
import About from '../components/About'
import Services from '../components/Services'
import Home from '../components/Home'
import Doctors from '../components/Doctors'
const HomeScreen = () => {
  return (
    <>
      <div id="home">
          <Home />
        </div>

        <div id="about">
          <About />
        </div>

        <div id="services">
          <Services />
        </div>

        <div id="doctors">
          <Doctors />
        </div>
    </>
  )
}

export default HomeScreen
