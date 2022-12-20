const cloudinary = require('cloudinary');
const Profile = require('../models/profileModel');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.addImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.body.image, {
      public_id: Date.now(),
      resource_type: 'auto',
    });
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send('Upload Error!!!');
  }
};

// exports.removeImage = async (req, res) => {
//   try {
//     let image_id = req.body.public_id;
//     cloudinary.uploader.destroy(image_id, (result) => {
//       res.send(result);
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).send('Remove Error!!!');
//   }
// };

exports.getImage = async (req, res) => {
  const { id } = req.params;
  Profile.find({ creator: id }).exec((err, data) => {
    res.json(data);
  });
};
