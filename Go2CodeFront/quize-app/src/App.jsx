import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'


import Header from './components/Header/header'
import Footer from './components/Footer/footer'

import Signup from './Pages/SignUp/signup'
import Login from './Pages/Login/login'
import Dashboard from './Pages/Dashboard/dashboard'
import Question from './Pages/Question/question'
import AddQuestions from './Pages/AddQuestions/addQuestion'



import './App.css'

function App() {

  return (
    
      <div className="appcontainer">
        <Router>
          <Header />
          <Routes className='routeClass'>
            <Route path='/' exact element={<Signup/>}/>
            <Route path='/signup' exact element={<Signup/>} />
            <Route path='/login' element={<Login/>}/>
            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path='/showQuestions' element={<Question/>} />
            <Route path='/addQuestions' element={<AddQuestions/>} />
          </Routes>
          <Footer />
        </Router>
      </div>
  )
}

export default App
