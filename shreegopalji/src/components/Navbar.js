import React from 'react'
const Navbar = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 1100 }}>
      <nav className="navbar">
        <div className={`navbar-logo${menuOpen ? ' menu-open' : ''}`}>
          <img src="/sgipllogo.png" alt="Shree Gopalji Infratech Pvt Ltd" style={{ height: '32px', marginRight: '12px' }} />
          <span className="navbar-title">Shree Gopalji Infratech Pvt Ltd</span>
        </div>
        <button
          className={`navbar-toggle${menuOpen ? ' menu-open' : ''}`}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="navbar-toggle-bar"></span>
          <span className="navbar-toggle-bar"></span>
          <span className="navbar-toggle-bar"></span>
        </button>
        <ul className={`navbar-links${menuOpen ? ' open' : ''}`}>
          <li><a href="/" onClick={() => setMenuOpen(false)}>Home</a></li>
          <li><a href="/about" onClick={() => setMenuOpen(false)}>About Us</a></li>
          <li><a href="/projects" onClick={() => setMenuOpen(false)}>Projects</a></li>
          <li><a href="/services" onClick={() => setMenuOpen(false)}>Services</a></li>
          <li><a href="/contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
        </ul>        
      </nav>
      <style>{`
        .navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: linear-gradient(90deg, #003366 0%, #005fa3 100%);
          padding: 0 2rem;
          min-height: 61px;
          max-height: 61px;
          height: 61px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.07);
          position: relative;
        }
        .navbar-logo {
          display: flex;
          align-items: center;
        }
        .navbar-title {
          color: #fff;
          font-size: 1.2rem;
          font-weight: 700;
          letter-spacing: 1px;
        }
        .navbar-links {
          list-style: none;
          display: flex;
          gap: 2rem;
          margin: 0;
          padding: 0;
          transition: max-height 0.3s ease;
        }
        .navbar-links li a {
          color: #fff;
          text-decoration: none;
          font-size: 1.1rem;
          font-weight: 500;
          transition: color 0.2s;
        }
        .navbar-links li a:hover {
          color: #ffd700;
        }
        .navbar-toggle {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 32px;
          height: 32px;
          background: none;
          border: none;
          cursor: pointer;
          margin-left: 1rem;
        }
        .navbar-toggle-bar {
          width: 22px;
          height: 3px;
          background: #fff;
          margin: 3px 0;
          border-radius: 2px;
          transition: 0.3s;
        }
        /* Hamburger to Close Animation */
        .navbar-toggle.menu-open .navbar-toggle-bar:nth-child(1) {
          transform: translateY(6px) rotate(45deg);
        }
        .navbar-toggle.menu-open .navbar-toggle-bar:nth-child(2) {
          opacity: 0;
        }
        .navbar-toggle.menu-open .navbar-toggle-bar:nth-child(3) {
          transform: translateY(-6px) rotate(-45deg);
        }
        @media (max-width: 768px) {
          .navbar {
            flex-direction: row;
            align-items: center;
            justify-content: center;
            padding: 0 1rem;
            min-height: 61px;
            max-height: 61px;
            height: 61px;
          }
          .navbar-logo {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            align-items: center;
            z-index: 2;
          }
          .navbar-title {
            display: none;
          }
          .navbar-toggle {
            display: flex;
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            z-index: 3;
          }
          .navbar-links {
            flex-direction: column;
            gap: 1rem;
            width: 100%;
            margin-top: 1rem;
            max-height: 0;
            overflow: hidden;
            background: linear-gradient(90deg, #003366 0%, #005fa3 100%);
            box-shadow: 0 2px 8px rgba(0,0,0,0.07);
            position: absolute;
            top: 100%;
            left: 0;
            z-index: 1000;
          }
          .navbar-links.open {
            max-height: 500px;
            padding-bottom: 1rem;
            z-index: 1000;
          }
        }
        header {
          position: sticky !important;
          top: 0;
          z-index: 1100;
        }
      `}</style>
    </header>
  );
};

export default Navbar;