import React, { useState, Component } from "react";
import './App.css';
import {Login} from "./components/login";
import {Register} from "./components/register";
import { Profile } from "./components/profile";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';


export default function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/profile" element={<Profile/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}
