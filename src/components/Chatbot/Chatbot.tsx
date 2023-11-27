// Chatbot.js
'use client'
import { useState } from 'react';

export default function Chatbot() {
const [chatOpen, setChatOpen] = useState(false);

const handleChatOpen = () => {
setChatOpen(true);
};

const handleChatClose = () => {
setChatOpen(false);
};

return (
<div>
<button 
  style={{
    position: 'fixed',
    top: '100px',
    right: '20px',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    backgroundImage: `url(/assets/images/icons/zzim.png)`, // 배경 이미지 추가
    backgroundSize: 'cover', // 이미지 크기 조절
    backgroundPosition: 'center', // 이미지 위치 조절
  }}
  onClick={handleChatOpen}
>
ChatBot
</button>

  {chatOpen && (
    <div style={{
      position: 'fixed',
      top: '80px',
      right: '20px',
      width: '300px',
      height: '500px',
      backgroundColor: '#fff',
      borderRadius: '5px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
    }}>
      <button onClick={handleChatClose}>Close</button>
      <iframe
        src="https://www.chatbase.co/chatbot-iframe/1ZCJ-uuW2LLgaXWVyc8RT"
        style={{
          width: '100%',
          height: '100%',
          border: 'none'
        }}
      />
    </div>
  )}
</div>
);
}