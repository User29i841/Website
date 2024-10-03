import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './App';

import './styles/NavBar.css'
import './styles/SideBar.css'
import './styles/Modals/LoginModal.css'
import './styles/Modals/VerifyModal.css'
import './styles/ProfileDropDown.css'
import './styles/ChatWindow.css'
import './styles/App.css'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Toaster />
    <App />
  </React.StrictMode>
);