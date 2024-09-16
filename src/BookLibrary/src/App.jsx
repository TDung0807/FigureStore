import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

const App = () => {
  return (
    <div id="wrapper">
      <div id="header">
        <Navbar/>
      </div>
      <div id="main">
        <h1>This is a Heading 1</h1>
        <h1>This is a Heading 2</h1>
        <h1>This is a Heading 3</h1>
        <h1>This is a Heading 4</h1>
        <h1>This is a Heading 5</h1>
        <h1>This is a Heading 6</h1>
        <h1>This is a Heading 7</h1>
        <h1>This is a Heading 8</h1>
        <h1>This is a Heading 9</h1>
      </div>
      <div id="footer">
        <Footer/>
      </div>
    </div>
  )
}

export default App