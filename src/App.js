import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import Navigationbar from './componenets/Navigationbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FieldTwoInfo from './pages/FieldTwoInfo'; //tunnelma
import FieldOneInfo from './pages/FieldOneInfo'; //palvelu
import FieldThreeInfo from './pages/FieldThreeInfo'; //ruoka

const App = () =>{

  return(
    <BrowserRouter>
    <div className='app'>
    <Navigationbar/>
      <Routes>
      <Route path='/' element={<Home/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/fieldtwoinfo' element={<FieldTwoInfo/>}></Route>
        <Route path='/fieldoneinfo' element={<FieldOneInfo/>}></Route>
        <Route path='/fieldthreeinfo' element={<FieldThreeInfo/>}></Route>
        </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App;