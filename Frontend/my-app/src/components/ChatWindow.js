import React, { useState, useEffect, useRef } from 'react';
import { IoChatboxOutline } from "react-icons/io5";
import socket from './socket';

function ChatWindow({ isLoggedIn, toggleLoginModal }) {
  const [showChat, setIsShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const chatWindowRef = useRef(null);

  const toggleChat = () => setIsShowChat(!showChat);

  useEffect(() => {
    const handleIncomingMessage = (data) => {
      setMessages((prevMessages) => [...prevMessages, { ...data }]);
    };
    socket.on('message', handleIncomingMessage);
    return () => socket.off('message', handleIncomingMessage);
  }, []);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    const username = user.username;
    const profileImageUrl = user.thumbnail;

    if (messageInput.trim() !== '') {
      socket.emit('message', { message: messageInput, user: username, profileImage: profileImageUrl });
      setMessageInput('');
    }
  };

  const handleMessageChange = (e) => {
    if (e.target.value.length <= 140) {
      setMessageInput(e.target.value);
    }
  };

  return (
    <div className="chatbar">
      <IoChatboxOutline onClick={toggleChat} className='chat-icon' />
      <div className={`chat-window ${showChat ? 'show' : ''}`}>
        {isLoggedIn ? (
          <form onSubmit={sendMessage}>
            <input
              type="text"
              placeholder="Enter message"
              className='chat-input'
              value={messageInput}
              onChange={handleMessageChange}
            />
          </form>
        ) : (
          <button className="chat-window-login-btn" onClick={toggleLoginModal}>Login</button>
        )}
        <div className="message-container" ref={chatWindowRef}>
          {messages.map((message, index) => (
            <div key={index} className="message-box">
              <img src={message.profileImage} className='chat-image' alt="Profile" />
              <div className="message">{message.user}: {message.message}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
