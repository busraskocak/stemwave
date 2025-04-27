import React ,{useState, useEffect}from 'react'
import { useNavigate } from "react-router-dom";
import { IoIosLogOut, IoIosSettings } from "react-icons/io";
import logo from "../../assets/stemwaveLogo.png";


function Navbar({ setIsModalOpen, setModalContent }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
  
    
    useEffect(() => {
      const handleClickOutside = () => {
        setIsDropdownOpen(false);
      };
      
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, []);
  
    const handleLogout = () => {
      localStorage.removeItem("authToken");
      navigate("/login"); 
    };
  
    const handleDropdownItemClick = (settingType) => {
      setModalContent(settingType);
      setIsModalOpen(true);
    };
  
    return (
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={logo} alt="" />
        </div>
        <div className="navbar-links">
          <div className="settings-container">
            <div className="dropdown-wrapper" onClick={(e) => e.stopPropagation()}>
              <button 
                className="dropdown-trigger" 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDropdownOpen(!isDropdownOpen);
                }}
              >
                <IoIosSettings className="settings-icon" />
              </button>
              
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <ul>
                    <li>
                      <button onClick={(e) => {
                        e.stopPropagation();
                        handleDropdownItemClick("user");
                      }}>User Settings</button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <IoIosLogOut />
          </button>
        </div>
      </nav>
    );
}

export default Navbar