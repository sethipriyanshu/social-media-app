// import all required libraries and components
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Main } from './pages/main/main';
import { Login } from './pages/login';
import { Navbar } from './components/navbar';
import { CreatePost } from './pages/create-post/create-post';
import { MySubmission } from './pages/my-post/mysubmission';

function App() {
  // declare the router with navbar and routes inside it
  // add every individual route to the routes section
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path = "/" element={<Main/>}/>
          <Route path = "/login" element={<Login/>}/>
          <Route path = "/createpost" element={<CreatePost/>}/>
          <Route path = "/my-post" element ={<MySubmission/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
