import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Courses from './pages/Courses'
import Admin from './pages/Admin'
import CV from './pages/CV'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Courses" element={<Courses />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/CV" element={<CV />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
