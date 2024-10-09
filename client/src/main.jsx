import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios'



// axios.defaults.baseURL = 'http://13.202.64.146:5200';
axios.defaults.baseURL = 'http://localhost:5200';

axios.defaults.withCredentials = true;




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>


    {/* <ThemeProvider> */}
    <div className="min-h-screen ">
      <App />
    </div>
    {/* </ThemeProvider> */}

  </React.StrictMode>
)

