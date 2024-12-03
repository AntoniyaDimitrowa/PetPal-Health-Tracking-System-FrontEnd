import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Account from './pages/Account';
import AddPet from './pages/AddPet';
import UpdatePet from './pages/UpdatePetInformation';
import PetVaccines from './pages/PetVaccines';
import UpdateAccountPage from './pages/UpdateAccount';
import DailyUpdate from './pages/DailyUpdate';
import { PetProvider } from './context/PetContext';
import { AuthProvider } from './context/AuthContext';
import BreedManagement from './pages/BreedManagement';
import MoodManagement from './pages/MoodManagement';

function App() {
  return (
    <AuthProvider>
      <PetProvider>
        <Router>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/addPet' element={<AddPet />} />
            <Route path='/updatePet' element={<UpdatePet />} />
            <Route path='/account' element={<Account />} />
            <Route path='/account/edit' element={<UpdateAccountPage />} />
            <Route path='/pet/vaccines' element={<PetVaccines />} />
            <Route path='/dailyUpdate' element={<DailyUpdate />} />
            <Route path='/breeds' element={<BreedManagement />} />
            <Route path='/moods' element={<MoodManagement />} />
          </Routes>
          <Footer />
        </Router>
      </PetProvider>
    </AuthProvider>

  );
}

export default App;
