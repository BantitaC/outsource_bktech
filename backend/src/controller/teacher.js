const db = require("../config/database")
const uuid = require("uuid")
const fs = require('fs');
const path = require('path');

const teacherController = {
    fetchAll(req, res) {
        db.query(`
            SELECT *
            FROM teacher
            ORDER BY created_at ASC;
        `, (err, result) => {
            if (err) throw err
            else return res.send(result)
        })
    },
    create(req, res) {
        const { name, tel, email} = req.body
        const filename = req.file ? req.file.filename : null;  // Get the filename of the uploaded image

        if (!filename) {
            return res.status(400).json({ message: 'Image is required' });
        }
        db.query(`INSERT INTO teacher(id, name, tel, email, image) VALUES ('${uuid.v4()}', '${name}', '${tel}', '${email}', '${filename}');`, 
            (err, result) => {
                if (err) throw err;
                else return res.send({ message: "create teacher success"})
        })
    },
    delete(req, res) {
        const { id } = req.params;  // Get the student ID from the URL parameters
    
        // Step 1: Get the filename of the image associated with the student
        db.query(`SELECT image FROM teacher WHERE id = '${id}'`, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error retrieving student', error: err });
            }
    
            // Check if student exists
            if (result.length === 0) {
                return res.status(404).json({ message: 'Teacher not found' });
            }
    
            // Get the image filename from the result
            const filename = result[0].image;
            if (filename) {
                // Step 2: Delete the image file from the server if it exists
                const filePath = path.join(__dirname, '../../public/images', filename);
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error(`Error deleting file: ${filePath}`, err);
                    } else {
                        console.log(`File deleted: ${filePath}`);
                    }
                });
            }
    
            // Step 3: Delete the student record from the database
            db.query(`DELETE FROM teacher WHERE id = '${id}'`, (err, result) => {
                if (err) {
                    return res.status(500).json({ message: 'Error deleting student', error: err });
                }
    
                return res.status(200).json({ message: 'Teacher and associated image deleted successfully' });
            });
        });
    }
}

module.exports = { ...teacherController }