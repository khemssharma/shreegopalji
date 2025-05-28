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
import AdminPage from './components/Admin';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ManagementLogin from './components/ManagementLogin';
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
          <Route path='/admin' element={<AdminPage/>}/>
          
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
