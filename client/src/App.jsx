import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Courses from './pages/Courses'
import Admin from './pages/Admin'
import About from './pages/About'
import CV from './pages/CV'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Courses" element={<Courses />} />
        <Route path="/About" element={<About />} />
        <Route path="/CV" element={<CV />} />
        <Route path="/Admin" element={<Admin />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
