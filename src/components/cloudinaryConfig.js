
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: 'dt2kpy8ox',
    secure: true,
    api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
    api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET
})