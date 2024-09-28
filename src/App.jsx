import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/pages/Home'
import Packages from './components/pages/Packages'
import Company from './components/pages/Company'
import Contact from './components/pages/Contact'
import NewPackage from './components/pages/NewPackage'
import Container from './components/layout/Container'
import Package from './components/pages/Package'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

function App() {
  return (
    <Router>
      <Navbar />

      <Container customClass="min_height">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/company" element={<Company />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/newpackage" element={<NewPackage />} />
          <Route path="/package/:id" element={<Package />} />
        </Routes>
      </Container>

      <Footer />
    </Router>
  )
}

export default App
