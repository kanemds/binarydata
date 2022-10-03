
import './App.css';
import { useState } from 'react';
import { OutlinedInput, Button } from '@mui/material'


function App() {

  const [image, setImage] = useState(null)

  console.log(image)

  const handleSubmit = () => {
    const data = new FormData()
    data.append('file', image)

    fetch('http://localhost:4567/upload', {
      method: 'POST',
      body: data,
    }).then((response) => {
      response.json().then((body) => {
        setImage({ imageURL: `http://localhost:4567/${body.file}` });
      });
    });
  }

  return (
    <div className="App">
      <OutlinedInput
        sx={{ m: 1 }}
        type='file'
        onChange={e => setImage(e.target.files[0])}
      />
      <Button onClick={handleSubmit}>Upload</Button>
    </div>
  );
}

export default App;
