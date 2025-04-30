import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { Root } from './Pages/Root.jsx'
import { Messenger } from './Pages/Messenger/Messenger.jsx'
import { Auth } from './Pages/Auth.jsx'
import { persistor, store } from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { Profile } from './Pages/Profile.jsx'
import { Home } from './Pages/Home.jsx'
import { ProtectiveRoute } from './Components/ProtectiveRoute.jsx'
import { LandingPage } from './Pages/LandingPage.jsx'




const size = screen.width
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [

      {
        path:'/',
        element:<LandingPage></LandingPage>
      },
      {
        path: "/home",
        element: <ProtectiveRoute><Home></Home></ProtectiveRoute> 
      },
      {
        element:<ProtectiveRoute><Messenger></Messenger></ProtectiveRoute>,
        path: '/msg'

      },
      {
        element: <ProtectiveRoute><Profile></Profile></ProtectiveRoute>,
        path:'/profile'
      },
     
      {
        element: <Auth></Auth>,
        path: "/auth"
      }
    ]
  }

])

createRoot(document.getElementById('root')).render(


  <Provider store={store}>

    <PersistGate loading={<p>Loading From Redux.....</p>} persistor={persistor} >


      <RouterProvider router={router} />
    </PersistGate>
  </Provider>





)
