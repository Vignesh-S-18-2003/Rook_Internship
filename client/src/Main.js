import React, { useEffect } from 'react'
import Topbar from './Topbar'
import { Outlet, useNavigate } from 'react-router-dom'

function Main({products}) {
  const navigate = useNavigate();

  useEffect(() => {
      navigate('/home');
  },[]);
  return (
    <div>
        <Topbar/>
        <Outlet  />
    </div>
  )
}

export default Main