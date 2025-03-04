const db = require("../config/database")
const uuid = require("uuid")
const fs = require('fs');
const path = require('path');

const activityController = {
    fetchAll(req, res) {
       db.query(`SELECT activity.id, activity.title, MIN(image_activity.name) AS image_name, activity.created_at FROM activity LEFT JOIN image_activity ON activity.id = image_activity.activity_id GROUP BY activity.id ORDER BY activity.created_at DESC`,
            (err, result) => {
                if (err) throw err
                else return res.send(result)
            }
       ) 
    },
    fetchByNumber(req, res) {
        const { number } = req.params
       db.query(`SELECT activity.id, activity.title, MIN(image_activity.name) AS image_name, activity.created_at FROM activity LEFT JOIN image_activity ON activity.id = image_activity.activity_id GROUP BY activity.id ORDER BY activity.created_at DESC LIMIT ${number}`,
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
        const activityId = uuid.v4();
    
        // เริ่มการแทรกข้อมูลในตาราง activity
        db.query(
            `INSERT INTO activity (id, title, description, user_id) VALUES ('${activityId}', '${title}', '${description}', '${user.id}')`,
            (err, result) => {
                if (err) {
                    return res.status(500).json({ message: 'Error creating activity', error: err });
                }
    
                // ตรวจสอบว่าไฟล์มีหรือไม่
                if (!req.files || req.files.length === 0) {
                    return res.status(400).json({ message: 'At least one image file is required' });
                }
    
                // แทรกข้อมูลในตาราง image_activity
                const imagePromises = req.files.map(file => {
                    const imageId = uuid.v4();
                    const imageName = file.filename;
    
                    return new Promise((resolve, reject) => {
                        db.query(
                            `INSERT INTO image_activity (id, name, activity_id) VALUES ('${imageId}', '${imageName}', '${activityId}')`,
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
                        res.status(201).json({ message: 'Activity and images uploaded successfully' });
                    })
                    .catch((err) => {
                        res.status(500).json({ message: 'Error uploading images', error: err });
                    });
            }
        );
    },
    delete(req, res) {
        const { id } = req.params;  // รับ activityId จาก URL (เช่น /activity/:activityId)
    
        // ตรวจสอบว่า activityId ที่ส่งมาถูกต้องหรือไม่
        if (!id) {
            return res.status(400).json({ message: 'Activity ID is required' });
        }
    
        // ขั้นตอนที่ 1: ลบข้อมูลในตาราง image_activity ที่มี activity_id ตรงกัน
        db.query(
            `SELECT * FROM image_activity WHERE activity_id = '${id}'`,
            (err, result) => {
                if (err) {
                    return res.status(500).json({ message: 'Error retrieving images for activity', error: err });
                }
    
                // เก็บชื่อไฟล์ที่เชื่อมโยงกับ activity นี้
                const images = result.map(image => image.name); // assuming the column for file path is 'file_path'
    
                // ขั้นตอนที่ 2: ลบข้อมูลในตาราง image_activity
                db.query(
                    `DELETE FROM image_activity WHERE activity_id = '${id}'`,
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
    
                        // ขั้นตอนที่ 4: ลบข้อมูลในตาราง activity
                        db.query(
                            `DELETE FROM activity WHERE id = '${id}'`,
                            (err, result) => {
                                if (err) {
                                    return res.status(500).json({ message: 'Error deleting activity from database', error: err });
                                }
    
                                // หากการลบสำเร็จ
                                res.status(200).json({ message: 'Activity and its images deleted successfully' });
                            }
                        );
                    }
                );
            }
        );
    }
    
}

module.exports = { ...activityController }