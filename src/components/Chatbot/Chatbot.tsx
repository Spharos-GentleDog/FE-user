// Chatbot.js
'use client'
import { useState } from 'react';
import Icon from '../Icon';

export default function Chatbot() {
const [chatOpen, setChatOpen] = useState(false);

const handleChatOpen = () => {
setChatOpen(true);
};

const handleChatClose = () => {
setChatOpen(false);
};

return (
<>

  <button className='
    fixed
    bottom-10
    left-[50%]
    translate-x-[-50%]
    w-16
    h-16
    bg-black
    text-white
    text-2xl
    rounded-full
    flex
    items-center
    justify-center
    z-10
    animate-pulse
  '
    onClick={handleChatOpen}
  >
    CB
  </button>
  {/* <button 
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
  </button> */}

  {chatOpen && (
    // <div style={{
    //   position: 'fixed',
    //   top: '80px',
    //   right: '20px',
    //   width: '300px',
    //   height: '500px',
    //   backgroundColor: '#fff',
    //   borderRadius: '5px',
    //   boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
    // }}>
    //   <button onClick={handleChatClose}>Close</button>
    //   <iframe
    //     src="https://www.chatbase.co/chatbot-iframe/1ZCJ-uuW2LLgaXWVyc8RT"
    //     style={{
    //       width: '100%',
    //       height: '100%',
    //       border: 'none'
    //     }}
    //   />
    // </div>
    <div 
      className='
        fixed
        bottom-0
        right-0
        w-full
        h-full
        bg-black
        bg-opacity-50
        z-[100]
        animate-fade-in
      '
      onClick={handleChatClose}
    >
      <iframe
        className='
          absolute
          bottom-0
          right-0
          w-full
          h-full
          bg-white
        '
        src="https://www.chatbase.co/chatbot-iframe/1ZCJ-uuW2LLgaXWVyc8RT"
        style={{
          width: '100%',
          height: '100%',
          border: 'none'
        }}
      />
      <button className='
        absolute
        top-[5px]
        left-[10px]
        w-10
        h-10
        bg-black
        text-white
        text-xl
        rounded-full
        flex
        items-center
        justify-center
        z-[200]
        animate-pulse
      '
        onClick={handleChatClose}
      >
       <Icon type="x" />
      </button>
    </div>
  )}
</>
);
}