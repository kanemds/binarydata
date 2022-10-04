
import './App.css';
import { useState, useEffect } from 'react';
import { OutlinedInput, Button, Box, Card, CardMedia } from '@mui/material'
import axios from 'axios'



function App() {

  const [image, setImage] = useState(null)
  const [images, setImages] = useState()


  const handleSubmit = () => {
    const data = new FormData()

    data.append('file', image)

    fetch('http://localhost:4567/upload', {
      method: 'POST',
      body: data,
    }).then((response) => {
      response.json().then((body) => {
        setImage({ imageURL: `http://localehost:4567/${body.file}` })
      })
    })
  }

  useEffect(() => {
    const getReuqest = async () => {
      try {
        const res = await axios.get('http://localhost:4567/upload')
        setImages(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getReuqest()
  }, [setImage])


  return (
    <div className="App">
      <OutlinedInput
        sx={{ m: 1 }}
        type='file'
        onChange={e => setImage(e.target.files[0])}
      />
      <Button onClick={handleSubmit}>Upload</Button>

      <Box sx={{ display: 'flex', m: 2, p: 2 }} >
        {
          images?.map(image => {
            return (
              <Card key={image._id} sx={{ m: 4 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={image.image}
                  alt="image"
                />
              </Card>
            )
          }
          )
        }
      </Box>
    </div >
  );
}

export default App;
