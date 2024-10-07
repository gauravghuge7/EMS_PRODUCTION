import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios'



axios.defaults.baseURL = 'http://13.235.142.116:5200';

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

