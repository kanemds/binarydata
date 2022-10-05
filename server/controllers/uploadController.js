const File = require('../model/file')
const storage = require('../firebase')
const { ref, uploadBytes, getDownloadURL, deleteObject } = require('firebase/storage')

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

const putRequest = async (req, res) => {
  console.log(req.params.id)
  // delete
  const findImage = await File.findById(req.params.id)
  const desertRef = ref(storage, findImage.image);
  const deleteImageFirebase = await deleteObject(desertRef)

  // upload
  const image = await req.files.file
  const fileName = new Date().getTime() + image.name

  const imageRef = ref(storage, `image/${fileName}`)

  const uploadImage = await uploadBytes(imageRef, image.data)
  const getImage = await getDownloadURL(uploadImage.ref)

  // to mongodb
  const edit = await File.findByIdAndUpdate(
    { _id: req.params.id },
    {
      image: getImage
    },
    { new: true }
  )
  res.status(200).json(edit)

}

const deleteRequest = async (req, res) => {

  const findImage = await File.findById(req.params.id)

  const desertRef = ref(storage, findImage.image);
  const deleteImageFirebase = await deleteObject(desertRef)

  const deleteImageMongodb = await File.findByIdAndDelete(req.params.id)

  res.status(200).json(deleteImageMongodb)

}

module.exports = { postRequest, getRequest, deleteRequest, putRequest }