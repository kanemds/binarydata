
import './App.css';
import React, { useState, useEffect } from 'react';
import { OutlinedInput, Button, Box, Card, CardMedia, Typography, Modal } from '@mui/material'
import axios from 'axios'

function App() {

  const style = {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);


  const [image, setImage] = useState(null)
  const [viewImage, setViewImage] = useState(null)
  const [images, setImages] = useState()


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

  }, [])


  const TransferImageData = file => {
    const reader = new FileReader()

    if (file) {
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setViewImage(reader.result)
      }
    } else {
      setViewImage(null)
    }
  }


  const handleProductImage = e => {
    const file = e.target.files[0]
    TransferImageData(file)
    setImage(file)
  }

  const handleOpen = (id) => {
    console.log(id)
    setOpen(true)
    let selectedProduct = images.filter(item => item._id === id)
    setViewImage(selectedProduct[0].image)
  }

  const handleClose = () => setOpen(false);


  const handleSubmit = async () => {
    const data = new FormData()

    data.append('file', image)
    console.log(data)
    const newPost = await axios.post('http://localhost:4567/upload', data)
    setImage("")
    setImages([...images, newPost.data])
  }

  const handleEdit = async (id) => {
    const data = new FormData()
    data.append('file', image)
    const editPost = await axios.put(`http://localhost:4567/upload/${id}`, data)
    const { image: img, _id: imageId } = editPost.data
    const newImages = images.map(item => item._id === id ? { image: img, _id: imageId } : item)
    setImages(newImages)
  }




  const handleDelete = async (id) => {
    try {
      const deleteImage = await axios.delete(`http://localhost:4567/upload/${id}`, (req, res) => {
        res.status(200).json(deleteImage)
      })
      setImages(images.filter(image => image._id !== id))
    } catch (error) {
      console.log(error.message)
    }
  }

  console.log(images)

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
            const randomId = Math.ceil(Math.random() * 1000)
            return (
              <Card key={`${image._id}${randomId}`} sx={{ m: 4, }}>
                <Button onClick={() => handleOpen(image._id)}>UPDATE</Button>
                <CardMedia
                  component="img"
                  height="140"
                  image={image.image}
                  alt="image"
                />
                <Button onClick={() => handleDelete(image._id)}>Delete</Button>

                <div>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box>
                      <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                          Edit
                        </Typography>
                        <Box sx={{ display: 'flex' }}>
                          <Box >
                            <CardMedia
                              component="img"
                              height="140"
                              image={viewImage}
                              alt="image"
                            />
                          </Box>
                          <OutlinedInput
                            sx={{ m: 1 }}
                            type='file'
                            onChange={e => { handleProductImage(e); }}
                          />
                          <Button onClick={() => handleEdit(image._id)}>Upload</Button>
                        </Box>
                      </Box>

                    </Box>
                  </Modal>
                </div>
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
