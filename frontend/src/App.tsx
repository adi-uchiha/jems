import "./styles/App.css"
import "./index.css"
import { Route, Routes } from 'react-router-dom'
import Dashboard from "@/pages/Dashboard"
import Auth from "@/pages/Auth"
import NavBar from "@/components/NavBar/NavBar"
import PrivateRoute from "@/components/PrivateRoute"
import { useAuth } from "@/hooks/useAuth"
import Footer from "@/components/layout/footer"
import About from "./pages/About"
import ServiceTypes from "@/pages/service/service-types/ServiceTypes"
import { Toaster } from "@/components/ui/sonner"


const App = () => {
  const { user } = useAuth()
  return (
    <>
      <div lang="en" className="w-screen min-h-screen font-medium flex flex-col">
        {user ? <NavBar /> : null}
        <div className="flex-grow">
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path='/auth' element={<Auth />} />
            <Route path='/about' element={<About />} />

            <Route path='/services'>
              <Route path='service-type' element={<ServiceTypes />} />
            </Route>
          </Routes>
        </div>
        <Footer />
        <Toaster />
      </div>
    </>

  )
}

export default App