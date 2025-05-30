import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import Blog from './pages/Blog';
import Projects from './pages/Projects';
import Testimonials from './pages/Testimonials';
import Careers from './pages/Careers';
import Gallery from './pages/Gallery';
import Events from './pages/Events';
import News from './pages/News';
import FAQs from './pages/FAQs';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ManagementLogin from './pages/ManagementLogin';
import useStore from './store/useAuthStore';

function App() {
  const { token } = useStore();
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
          
          <Route path='/dashboard' element={token ? <Dashboard />:  <Navigate to="/login" />}></Route>
          <Route path='/signup' element={!token ? <SignUp/> : <Navigate to="/dashboard" />}></Route>
          <Route path='/login' element={!token ? <ManagementLogin/> : <Navigate to="/dashboard" />}></Route>

        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
