// Importing React and CSS
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Blog from './components/Blog';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Careers from './components/Careers';
import Gallery from './components/Gallery';
import Events from './components/Events';
import News from './components/News';
import FAQs from './components/FAQs';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path='/projects' element={<Projects/>} />
          <Route path='/careers' element={<Careers/>} />
          <Route path='/blog' element={<Blog/>} />
          <Route path='/testimonials' element={<Testimonials/>} />
          <Route path='/gallery' element={<Gallery/>} />
          <Route path='/events' element={<Events/>} />
          <Route path='/news' element={<News/>} />
          <Route path='/faqs' element={<FAQs/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
