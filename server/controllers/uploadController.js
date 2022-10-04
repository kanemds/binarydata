const File = require('../model/file')
const storage = require('../firebase')
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage')

const postRequest = async (req, res) => {

  const image = await req.files.file
  const fileName = new Date().getTime() + image.name

  const imageRef = ref(storage, `image/${fileName}`)
  uploadBytes(imageRef, image.data).then(snapshot => {
    getDownloadURL(snapshot.ref).then(url => {
      console.log(url)
    })
  })
  const newImage = new File({
    image: imageRef
  })
  const saveImage = await newImage.save()
  res.status(200).json(saveImage)
}

module.exports = { postRequest }