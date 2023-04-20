import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {
  createBrowserRouter, 
  createRoutesFromElements,
  Route, 
  RouterProvider
} from 'react-router-dom'

// PAGES //
import Blackjack from './pages/Blackjack'

// LAYOUTS //
import RootLayout from './layouts/RootLayout'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="blackjack" element={<Blackjack />}/>
    </Route>
  )
)

function App() {

   return (
     <div className="App">
       <RouterProvider router={router} />
     </div>
   )
}

export default App