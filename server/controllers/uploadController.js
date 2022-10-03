const File = require('../model/file')

const postRequest = async (req, res) => {
  console.log(req.files.file);
  // let imageFile = req.files.file;

  // imageFile.mv(`${__dirname}/public/${req.body.filename}.jpg`, function (err) {
  //   if (err) {
  //     return res.status(500).send(err);
  //   }

  //   res.json({ file: `public/${req.body.filename}.jpg` });
  // });
}

module.exports = { postRequest }