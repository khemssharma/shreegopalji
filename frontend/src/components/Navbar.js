import React from 'react'
const Navbar = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  // Example dropdown items for each link
  const dropdownItems = {
    Home: [
      { label: "Home", href: "/" }
    ],
    "About Us": [
      { label: "Our Story", href: "/about#story" },
      { label: "Team", href: "/about#team" }
    ],
    Projects: [
      { label: "Ongoing", href: "/projects#ongoing" },
      { label: "Completed", href: "/projects#completed" },
      { label: "Management", href: "/login" }
    ],
    Services: [
      { label: "Consulting", href: "/services#consulting" },
      { label: "Construction", href: "/services#construction" }
    ],
    Contact: [
      { label: "Contact Form", href: "/contact#form" },
      { label: "Locations", href: "/contact#locations" }
    ]
  };

  const [openDropdown, setOpenDropdown] = React.useState(null);

  const handleDropdown = (label) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

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
          {Object.entries(dropdownItems).map(([label, items]) => (
            <li
              key={label}
              className="navbar-dropdown"
              onMouseEnter={() => setOpenDropdown(label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                className="navbar-link-btn"
                onClick={() => handleDropdown(label)}
                aria-haspopup="true"
                aria-expanded={openDropdown === label}
                tabIndex={0}
              >
                {label}
                <span className="dropdown-arrow">&#9662;</span>
              </button>
              <ul className={`dropdown-menu${openDropdown === label ? ' show' : ''}`}>
                {items.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => {
                        setMenuOpen(false);
                        setOpenDropdown(null);
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
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
        .navbar-links li a,
        .navbar-link-btn {
          color: #fff;
          text-decoration: none;
          font-size: 1.1rem;
          font-weight: 500;
          transition: color 0.2s;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }
        .navbar-links li a:hover,
        .navbar-link-btn:hover {
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
        .navbar-toggle.menu-open .navbar-toggle-bar:nth-child(1) {
          transform: translateY(6px) rotate(45deg);
        }
        .navbar-toggle.menu-open .navbar-toggle-bar:nth-child(2) {
          opacity: 0;
        }
        .navbar-toggle.menu-open .navbar-toggle-bar:nth-child(3) {
          transform: translateY(-6px) rotate(-45deg);
        }
        .navbar-dropdown {
          position: relative;
        }
        .navbar-link-btn {
          display: flex;
          align-items: center;
          gap: 0.3em;
        }
        .dropdown-arrow {
          font-size: 1.1em; /* Increased from 0.7em to 1.1em */
        }
        .dropdown-menu {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          min-width: 160px;
          background: #fff;
          color: #003366;
          box-shadow: 0 2px 8px rgba(0,0,0,0.07);
          border-radius: 4px;
          padding: 0.5em 0;
          z-index: 2000;
        }
        .dropdown-menu.show {
          display: block;
        }
        .dropdown-menu li {
          list-style: none;
        }
        .dropdown-menu li a {
          display: block;
          color: #003366;
          padding: 0.5em 1.2em;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 500;
          transition: background 0.2s, color 0.2s;
        }
        .dropdown-menu li a:hover {
          background: #005fa3;
          color: #fff;
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
          .navbar-dropdown {
            width: 100%;
          }
          .dropdown-menu {
            position: static;
            min-width: 100%;
            box-shadow: none;
            border-radius: 0;
            background: #fff;
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