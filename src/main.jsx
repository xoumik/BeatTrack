import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import App from '../App.jsx'
import './index.css'
import ImagePrediction from './screens/ImagePrediction.jsx'
import AI from './screens/AI.jsx'
import HomeScreen from './screens/HomeScreen.jsx'
import HeartForm from './screens/HeartForm.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen/>}/>
      <Route path='/tumorPrediction' element={<ImagePrediction/>}/>
      <Route path='/healthai' element={<AI/>}/>
      <Route path='/bpm' element={<HeartForm/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
