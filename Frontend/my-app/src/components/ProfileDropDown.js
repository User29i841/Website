import React from 'react';

function ProfileDropdown({ profileImageUrl, toggleDropdown, isDropdownOpen, handleLogout }) {
  return (
    <div className="profileContainer">
      <img
        className='profileImage'
        src={profileImageUrl} 
        alt="Profile"
        onClick={toggleDropdown}
      />
      {isDropdownOpen && (
        <div className="dropdownContent">
          <button onClick={handleLogout} className='logoutButton'>Logout</button>
          <button className='profileButton'>Profile</button>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;