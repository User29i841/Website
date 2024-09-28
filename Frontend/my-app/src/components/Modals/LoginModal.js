import React from 'react';

function LoginModal({ closeLoginModal, setUsername, username, performLogin }) {
  const handleModalClick = (event) => event.stopPropagation();

  return (
    <div className='modal' onClick={closeLoginModal}>
      <div className="modal-content" onClick={handleModalClick}>
        <h2 className="login-text">Login</h2>
        <button className="login-modal-btn" onClick={performLogin}>Login</button>
        <span className="close-btn" onClick={closeLoginModal}>&times;</span>
        <input
          type="text"
          className="username-input"
          placeholder="Username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
    </div>
  );
}

export default LoginModal;