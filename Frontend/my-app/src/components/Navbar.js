import React, { useState, useEffect } from 'react';
import logo from '../imgs/logo.png';
import ChatWindow from './ChatWindow';
import ProfileDropdown from './ProfileDropDown';
import LoginModal from './Modals/LoginModal';
import VerifyModal from './Modals/VerifyModal';
import { toast } from 'react-hot-toast';

function NavBar() {
  const serverbase = 'http://localhost:8080';
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [code, setCode] = useState('');

  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);
  const toggleLoginModal = () => setShowLoginModal(true);
  const closeLoginModal = () => setShowLoginModal(false);
  const closeVerifyModal = () => setShowVerifyModal(false);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setProfileImageUrl('');
    toast.success('Logged out successfully');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (token && user) {
      setIsLoggedIn(true);
      setProfileImageUrl(user.thumbnail || '');
    }
  }, []); 

  const performLogin = async () => {
    try {
      const userInfoResponse = await fetch(`${serverbase}/userInfo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
      const userInfoData = await userInfoResponse.json();
      console.log('Received userInfoData:', userInfoData);

      if (userInfoData.userId === undefined) {
        toast.error('Login Failed: Undefined User');
        return; 
      }

      const codeResponse = await fetch(`${serverbase}/code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
      const codeData = await codeResponse.json();
      console.log('Code:', codeData);
      setCode(codeData.code);

      if (userInfoData.userId !== undefined) {
        setShowLoginModal(false);
        setShowVerifyModal(true);
      }
    } catch (error) {
      console.error('Error fetching userInfo:', error);
    }
  };

  const handleVerify = async () => {
    try {
      const verifyResponse = await fetch(`${serverbase}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });

      if (verifyResponse.ok) {
        const body = await verifyResponse.json();
        toast.success(body.isNew ? 'Created account' : 'Welcome back');
        
        localStorage.setItem('token', body.token);
        localStorage.setItem('user', JSON.stringify({ 
          thumbnail: body.pfpUrl, 
          userid: body.robloxId, 
          username: body.username 
        }));

        setIsLoggedIn(true);
        setProfileImageUrl(body.pfpUrl);
      } else {
        toast.error("Code doesn't match");
      }
    } catch (error) {
      console.error('Error during verification:', error);
      toast.error('Verification failed');
    }
  };

  return (
    <>
      <div className="navbar">
        <img src={logo} className="logo" alt="logo" />

        {isLoggedIn ? (
          <>
            <div className="balance">

            </div>
            <ProfileDropdown 
              profileImageUrl={profileImageUrl}
              toggleDropdown={toggleDropdown}
              isDropdownOpen={isDropdownOpen}
              handleLogout={handleLogout}
            />
            <ChatWindow isLoggedIn={isLoggedIn} toggleLoginModal={toggleLoginModal} />
          </>
        ) : (
          <div className='nav-chat-and-loginbutton-container'>
            <button className="nav-bar-login-button" onClick={toggleLoginModal}>Login</button>
            <ChatWindow isLoggedIn={isLoggedIn} toggleLoginModal={toggleLoginModal} />
          </div>
        )}
      </div>

      {showLoginModal && (
        <LoginModal 
          closeLoginModal={closeLoginModal}
          setUsername={setUsername}
          username={username}
          performLogin={performLogin}
        />
      )}

      {showVerifyModal && (
        <VerifyModal 
          closeVerifyModal={closeVerifyModal}
          code={code}
          setCode={setCode}
          handleVerify={handleVerify}
        />
      )}
    </>
  );
}

export default NavBar;
