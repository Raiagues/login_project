import { useEffect, useState } from 'react';
import { AppContext } from './AppContext.jsx';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import MainPage from './views/MainPage.jsx'

import './styles/App.css'

function App() {
  const [token, setToken]=useState(null);
  const [backend, setBackend]=useState('http://localhost:3000');
  const [projectId, setProjectId]=useState(null);

  useEffect( () => {
    function fetchToken() {
      const token_ = localStorage.getItem("token")
      setToken(token_)
    }
    function fetchProjectId() {
      const projectId = localStorage.getItem('projectId');
      setProjectId(projectId)
    }

    fetchToken()
    fetchProjectId()
  }, []); 


  return (
    <>
    <AppContext.Provider value = {{ token, setToken, backend, setBackend, projectId, setProjectId }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage backend={backend} token={token}/>}/>
          </Routes>
        </BrowserRouter>
    </AppContext.Provider>
    </>
  )
}

export default App
