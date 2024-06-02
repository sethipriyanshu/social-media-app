import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Main } from './pages/main/main';
import { Login } from './pages/login';
import { Navbar } from './components/navbar';
import { CreatePost } from './pages/create-post/create-post';
import { MyPost } from './pages/my-post/my-post';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path = "/" element={<Main/>}/>
          <Route path = "/login" element={<Login/>}/>
          <Route path = "/createpost" element={<CreatePost/>}/>
          <Route path = "/my-post" element ={<MyPost/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
