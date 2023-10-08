import React, { useEffect, useState } from 'react'

import { Navbar } from './components/Navbar';
import { ThemeProvider } from './context/ThemeContext';
import { Route, Routes } from 'react-router-dom';
import { Home } from './routes/Home';
import { Signin } from './routes/Signin';
import { Signup } from './routes/Signup';
import {  Accounts } from './routes/Accounts';
import axios from 'axios';
import { Coinpage } from './components/Coinpage';
import { Footer } from './components/Footer';
import { AuthContextProvider } from './context/AuthContext';

function App() {

  const [coins ,setcoins]=useState([])

  const url=" https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true&locale=en "
   
  useEffect(()=>{
    axios.get(url).then((response)=>{
      setcoins(response.data)
    })
  },[url])


  return (


<ThemeProvider>
  <AuthContextProvider>
  <Navbar/>
  <Routes>
  <Route path='/' element={<Home coins={coins}/>}/>
  <Route path='/signin' element={<Signin/>}/>
  <Route path='/signup' element={<Signup/>}/>
  <Route path='/account' element={<Accounts/>}/>
  <Route path='/coin/:coinId'  element={<Coinpage/>}>
     <Route path=':coinId'/>
  </Route>
  </Routes>
  <Footer/>
  </AuthContextProvider>
</ThemeProvider>

  );
}

export default App;
