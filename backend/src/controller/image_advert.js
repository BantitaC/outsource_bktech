const db = require("../config/database")

const imageAdvertController = {
    findByAdvert(req, res) {
        const { id } = req.params
        db.query(`SELECT * FROM image_advert WHERE advert_id = '${id}'`,
            (err, result) => {
                if (err) throw err
                else return res.send(result)
            }
        )
    },
    delete(req, res) {
        const { id } = req.params
        db.query(`DELETE FROM image_advert WHERE id = '${id}'`, 
            (err) => {
                if (err) throw err
                else return res.send({ message: 'delete image advert success'})
            }
        )
    }
}

module.exports = { ...imageAdvertController }