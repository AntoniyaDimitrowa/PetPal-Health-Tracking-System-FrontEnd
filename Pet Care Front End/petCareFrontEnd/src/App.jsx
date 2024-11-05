import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Breeds from './pages/Breeds';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Account from './pages/Account';
import AddPet from './pages/AddPet';
import PetVaccines from './pages/PetVaccines';
import UpdateAccountPage from './pages/UpdateAccount';
import { PetProvider } from './context/PetContext'; 

function App() {
  return (
    <PetProvider> 
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/breeds' element={<Breeds />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/addPet' element={<AddPet />} />
          <Route path='/account' element={<Account />} />
          <Route path='/account/edit' element={<UpdateAccountPage />} />
          <Route path='/pet/vaccines' element={<PetVaccines />} />
        </Routes>
        <Footer />
      </Router>
    </PetProvider>
  );
}

export default App;
