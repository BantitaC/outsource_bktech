const multer = require('multer');
const path = require('path');
const fs = require('fs');

// ตรวจสอบว่าโฟลเดอร์ที่เก็บไฟล์มีอยู่หรือไม่ ถ้าไม่มีก็สร้างขึ้นมา
const uploadFolder = path.join(__dirname, '../../public/images');
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder, { recursive: true });
}

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolder);  // ใช้ path ที่ตรวจสอบแล้ว
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname);  // ตั้งชื่อไฟล์ใหม่เป็น Timestamp + ชื่อเดิม
    }
});

const uploadImage = multer({
    storage: fileStorage,
    limits: { fileSize: 50 * 1024 * 1024 }  // กำหนดขนาดไฟล์สูงสุดเป็น 50MB
}).array('images');  // ใช้ .array('images') สำหรับหลายไฟล์

const uploadImageSingle = multer({
    storage: fileStorage,
    limits: { fileSize: 50 * 1024 * 1024 }  // กำหนดขนาดไฟล์สูงสุดเป็น 50MB
}).single('image'); 

module.exports = { uploadImage, uploadImageSingle };
