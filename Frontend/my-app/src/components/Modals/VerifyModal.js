import React from 'react';

function VerifyModal({ closeVerifyModal, code, setCode, handleVerify }) {
  const handleModalClick = (event) => event.stopPropagation();

  return (
    <div className="modal" onClick={closeVerifyModal}>
      <div className="modal-content" onClick={handleModalClick}>
        <span className="close-btn" onClick={closeVerifyModal}>&times;</span>
        <h2 className="verify-text">Code</h2>
        <input
          type="text"
          className="code-input" 
          placeholder="Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button className="verifyButton" onClick={handleVerify}>Verify</button>
      </div>
    </div>
  );
}

export default VerifyModal;