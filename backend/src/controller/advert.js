const db = require("../config/database")
const uuid = require("uuid")
const fs = require('fs');
const path = require('path');

const advertController = {
    fetchAll(req, res) {
       db.query(`SELECT advert.*, MIN(image_advert.name) AS image_path FROM advert LEFT JOIN image_advert ON advert.id = image_advert.advert_id GROUP BY advert.id ORDER BY advert.created_at DESC`,
            (err, result) => {
                if (err) throw err
                else return res.send(result)
            }
       ) 
    },
    fetchByNumber(req, res) {
        const { number } = req.params
       db.query(`SELECT advert.*, MIN(image_advert.name) AS image_path FROM advert LEFT JOIN image_advert ON advert.id = image_advert.advert_id GROUP BY advert.id ORDER BY advert.created_at DESC LIMIT ${number}`,
            (err, result) => {
                if (err) throw err
                else return res.send(result)
            }
       ) 
    },
    create(req, res) {
        const { title, description } = req.body; // รับข้อมูล title, description จาก body
        const user = req.user; // ข้อมูลผู้ใช้ที่ล็อกอิน
    
        // สร้าง ID สำหรับกิจกรรมใหม่
        const advertId = uuid.v4();
    
        // เริ่มการแทรกข้อมูลในตาราง advert
        db.query(
            `INSERT INTO advert (id, title, description, user_id) VALUES ('${advertId}', '${title}', '${description}', '${user.id}')`,
            (err, result) => {
                if (err) {
                    return res.status(500).json({ message: 'Error creating advert', error: err });
                }
    
                // ตรวจสอบว่าไฟล์มีหรือไม่
                if (!req.files || req.files.length === 0) {
                    return res.status(400).json({ message: 'At least one image file is required' });
                }
    
                // แทรกข้อมูลในตาราง image_advert
                const imagePromises = req.files.map(file => {
                    const imageId = uuid.v4();
                    const imageName = file.filename;
    
                    return new Promise((resolve, reject) => {
                        db.query(
                            `INSERT INTO image_advert (id, name, advert_id) VALUES ('${imageId}', '${imageName}', '${advertId}')`,
                            (err, result) => {
                                if (err) {
                                    reject(err); // หากเกิดข้อผิดพลาดให้ reject
                                } else {
                                    resolve(result); // ถ้าสำเร็จให้ resolve
                                }
                            }
                        );
                    });
                });
    
                // รอการแทรกรูปภาพทั้งหมดเสร็จสิ้น
                Promise.all(imagePromises)
                    .then(() => {
                        res.status(201).json({ message: 'advert and images uploaded successfully' });
                    })
                    .catch((err) => {
                        res.status(500).json({ message: 'Error uploading images', error: err });
                    });
            }
        );
    },
    delete(req, res) {
        const { id } = req.params;  // รับ advertId จาก URL (เช่น /advert/:advertId)
    
        // ตรวจสอบว่า advertId ที่ส่งมาถูกต้องหรือไม่
        if (!id) {
            return res.status(400).json({ message: 'advert ID is required' });
        }
    
        // ขั้นตอนที่ 1: ลบข้อมูลในตาราง image_advert ที่มี advert_id ตรงกัน
        db.query(
            `SELECT * FROM image_advert WHERE advert_id = '${id}'`,
            (err, result) => {
                if (err) {
                    return res.status(500).json({ message: 'Error retrieving images for advert', error: err });
                }
    
                // เก็บชื่อไฟล์ที่เชื่อมโยงกับ advert นี้
                const images = result.map(image => image.name); // assuming the column for file path is 'file_path'
    
                // ขั้นตอนที่ 2: ลบข้อมูลในตาราง image_advert
                db.query(
                    `DELETE FROM image_advert WHERE advert_id = '${id}'`,
                    (err, result) => {
                        if (err) {
                            return res.status(500).json({ message: 'Error deleting images from database', error: err });
                        }
    
                        // ขั้นตอนที่ 3: ลบไฟล์จากระบบไฟล์
                        images.forEach(imagePath => {
                            const filePath = path.join(__dirname, '../../public/images', imagePath); // assuming file path is stored in image_path column
                            fs.unlink(filePath, (err) => {
                                if (err) {
                                    console.error(`Error deleting file: ${filePath}`, err);
                                } else {
                                    console.log(`File deleted: ${filePath}`);
                                }
                            });
                        });
    
                        // ขั้นตอนที่ 4: ลบข้อมูลในตาราง advert
                        db.query(
                            `DELETE FROM advert WHERE id = '${id}'`,
                            (err, result) => {
                                if (err) {
                                    return res.status(500).json({ message: 'Error deleting advert from database', error: err });
                                }
    
                                // หากการลบสำเร็จ
                                res.status(200).json({ message: 'advert and its images deleted successfully' });
                            }
                        );
                    }
                );
            }
        );
    }
    
}

module.exports = { ...advertController }