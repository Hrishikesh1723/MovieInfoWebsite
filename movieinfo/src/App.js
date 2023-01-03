import React from 'react'
import Home from './Home'
import Error from './Error'
import MovieDisplay from './MovieDisplay'
import { Routes, Route } from "react-router-dom"

const App = () => {
  return (
    <div>
      <> 
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/movies/:id" element={<MovieDisplay/>}/>
          <Route path='*' element={<Error/>}/>
        </Routes>
      </>
    </div>
  )
}

export default App