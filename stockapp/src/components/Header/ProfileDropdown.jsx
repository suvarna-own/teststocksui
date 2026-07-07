import Dropdown from 'react-bootstrap/Dropdown';
import ProfileImg from '../../images/admin.png'
import { useNavigate } from "react-router-dom";

function ProfileDropdown() {
  const navigate = useNavigate();
  const handleLogout = () => {
    debugger;
    localStorage.removeItem("loggedIn");
    navigate("/");
  };
 

  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic">
        <img
          src={ProfileImg}
          alt="profile"
          className="w-5 h-5 rounded-full"
        />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#"><svg className="inline w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clipRule="evenodd" />
        </svg>
          Suvarna <br />Suvarna.beauty@gmail.com</Dropdown.Item>
        <Dropdown.Item as="button">Console</Dropdown.Item>
        <Dropdown.Item as="button"><svg className="inline w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 9h.01M8.99 9H9m12 3a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM6.6 13a5.5 5.5 0 0 0 10.81 0H6.6Z" />
        </svg>
          Coin</Dropdown.Item>
        <Dropdown.Item as="button">Support</Dropdown.Item>
        <Dropdown.Item as="button">Invite Friends</Dropdown.Item>
        <Dropdown.Item as="button">User Manual</Dropdown.Item>
        <Dropdown.Item className=' inline-flex gap-2'  as="button" onClick={ handleLogout }><svg className="inline w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2" />
        </svg><span > Logout </span></Dropdown.Item>


      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ProfileDropdown;