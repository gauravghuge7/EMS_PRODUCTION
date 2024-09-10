import { useState } from 'react';
import axios from 'axios';

const demo = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
    
        const formData = new FormData();
    
        formData.append('file', selectedFile);

    
        axios.post('/your-backend-endpoint', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        // Handle success
        console.log('File uploaded successfully');
      })
      .catch(error => {
        // Handle error
        console.error('Error uploading file', error);
      });
    } else {
      console.error('No file selected');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
};

export default FileUploadComponent;