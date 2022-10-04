const File = require('../model/file')
const storage = require('../firebase')
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage')

const getRequest = async (req, res) => {
  try {
    const getAll = await File.find()

    res.status(200).json(getAll)
  } catch (error) {
    console.log(error.message)
  }

}



const postRequest = async (req, res) => {

  const image = await req.files.file
  const fileName = new Date().getTime() + image.name

  const imageRef = ref(storage, `image/${fileName}`)

  const uploadImage = await uploadBytes(imageRef, image.data)
  const getImage = await getDownloadURL(uploadImage.ref)

  const newImage = new File({
    image: getImage
  })
  const saveImage = await newImage.save()
  res.status(200).json(saveImage)

}

module.exports = { postRequest, getRequest }