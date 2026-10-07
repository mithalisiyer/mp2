import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ListView from './pages/ListView'
import GalleryView from './pages/GalleryView'
import DetailView from './pages/DetailView'
import Navbar from './components/Navbar'
import './App.css'


function App() {
  return (
    <BrowserRouter basename='/mp2/'>
      <Navbar />
      <Routes>
        <Route path="/" element={<ListView />} />
        <Route path="/gallery" element={<GalleryView />} />
        <Route path="/artwork/:id" element={<DetailView />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
