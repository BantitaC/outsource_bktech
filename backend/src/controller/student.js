const db = require("../config/database")
const fs = require('fs');
const path = require('path');

const studentController = {
    fetchAll(req, res) {
        db.query(`
            SELECT *
            FROM student
            ORDER BY id;
        `, (err, result) => {
            if (err) throw err
            else return res.send(result)
        })
    },
    create(req, res) {
        const { id, name, nick} = req.body
        const filename = req.file ? req.file.filename : null;  // Get the filename of the uploaded image

        if (!filename) {
            return res.status(400).json({ message: 'Image is required' });
        }
        db.query(`INSERT INTO student(id, name, nick, image) VALUES ('${id}', '${name}', '${nick}', '${filename}');`, 
            (err, result) => {
                if (err) throw err;
                else return res.send({ message: "create student success"})
        })
    },
    delete(req, res) {
        const { id } = req.params;  // Get the student ID from the URL parameters
    
        // Step 1: Get the filename of the image associated with the student
        db.query(`SELECT image FROM student WHERE id = '${id}'`, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error retrieving student', error: err });
            }
    
            // Check if student exists
            if (result.length === 0) {
                return res.status(404).json({ message: 'Student not found' });
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
            db.query(`DELETE FROM student WHERE id = '${id}'`, (err, result) => {
                if (err) {
                    return res.status(500).json({ message: 'Error deleting student', error: err });
                }
    
                return res.status(200).json({ message: 'Student and associated image deleted successfully' });
            });
        });
    }
}

module.exports = { ...studentController }