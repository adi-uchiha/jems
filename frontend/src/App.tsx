import "./styles/App.css"
import "./index.css"
import { Route, Routes, useLocation } from 'react-router-dom'
import Dashboard from "@/pages/Dashboard"
import Auth from "@/pages/Auth"
import NavBar from "@/components/NavBar/NavBar"
import PrivateRoute from "@/components/PrivateRoute"
import Footer from "@/components/layout/footer"
import About from "./pages/About"
import ServiceTypes from "@/pages/service/service-types/ServiceTypes"
import { Toaster } from "@/components/ui/sonner"
import Home from "./pages/Home"
import ChatInterface from "./pages/ChatInterface"
import PdfUploader from "./pages/PdfUploader"
import ViewPdf from "./pages/ViewPdf"

const App = () => {
  const location = useLocation();
  const showNavBar = location.pathname !== '/auth';

  return (
    <>
      <div lang="en" className="w-screen min-h-screen font-medium flex flex-col">
        {showNavBar && <NavBar />}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<ChatInterface />} />
            <Route path="/upload" element={<PdfUploader />} />
            <Route path="/view" element={<ViewPdf />} />
            <Route element={<PrivateRoute />}>
              <Route path='/services'>
              <Route path='service-type' element={<ServiceTypes />} />
            </Route>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path='/auth' element={<Auth />} />
            <Route path='/about' element={<About />} />
            
          </Routes>
        </div>
        <Footer />
        <Toaster />
      </div>
    </>
  )
}

export default App