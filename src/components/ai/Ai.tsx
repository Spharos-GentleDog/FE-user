'use client'
import Input from '@/shared/Input/Input'
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import HeaderFilterSearchPage from '../HeaderFilterSearchPage';


function Ai() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files ? event.target.files[0] : null);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      console.log('Uploading file:', HeaderFilterSearchPage);
    }
  };

  const handleFileDelete = () => {
    setSelectedFile(null);
  };

  return (
    <div className='mt-10' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '70vh' }}>
      <Input 
        type='file'
        onChange={handleFileChange}
        style={{ marginBottom: '20px' }}
      />
            { selectedFile && 
        <div className='mt-10'>
          <img src={URL.createObjectURL(selectedFile)} alt="Selected" style={{ marginTop: '20px', width: '300px', height: '300px' }}/>
        </div>
      }
      <br></br>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
      <button 
        onClick={handleFileUpload}
        style={{
            backgroundColor: '#000000', 
            color: 'white', 
            padding: '10px 20px', 
            border: 'none', 
            cursor: 'pointer', 
            borderRadius: '20px',
            marginRight: '50px'  // 오른쪽 여백을 추가하여 다음 버튼과의 간격을 띄웁니다.
        }}
        >
        Upload
       </button>
       <button 
        onClick={handleFileDelete} 
        style={{
            backgroundColor: '#ffffff', 
            color: 'black', 
            padding: '10px 20px', 
            border: '2px solid black',
            cursor: 'pointer',
            borderRadius: '20px'
        }}
        >
        Delete
        </button>

      </div>
    </div>
  )
}

export default Ai
