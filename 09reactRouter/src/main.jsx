import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx' // Make sure to import Home
import About from './components/About/About.jsx' // Make sure to import About
import Contact from './components/Contact/Contact.jsx'
import GitHub from './components/GitHub/GitHub.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children : [
      {
        path: "",
        element: <Home />
      },
      {
        path : "about",
        element: <About/>
      },
      {
        path : "contact",
        element : <Contact/>
      },

      {
        path : "GitHub",
        element : <GitHub/>
      }
    ]
  }
])

// const router = createBrowserRouter(
//   createRoutesFromElements (
//     < Route path = '/' element = {<Layout />} >
//       <Route path='' element = {<Home /> } />
//       <Route path = 'about' element = {<About />} />
//       < Routh path = 'contact' element = {<Contact />} />
//       < Route path = 'user/:userid' element = {<User />} />
//     </Route>
//   )
// )


const root = createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)