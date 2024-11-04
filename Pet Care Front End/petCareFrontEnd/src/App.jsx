import { useState } from 'react'
import './App.css'
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Breeds from './pages/Breeds.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Account from './pages/Account.jsx';
import AddPet from './pages/AddPet.jsx';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import UpdateAccountPage from './pages/UpdateAccount.jsx';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/breeds' element={<Breeds/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/addPet' element={<AddPet/>}/>
        <Route path='/users/:id' element={<Account/>}/>
        <Route path='/updateAccount/:id' element={<UpdateAccountPage />}/>
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
