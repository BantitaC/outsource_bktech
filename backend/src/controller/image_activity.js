const db = require("../config/database")

const imageActivityController = {
    findByActivity(req, res) {
        const { id } = req.params
        db.query(`SELECT * FROM image_activity WHERE activity_id = '${id}'`,
            (err, result) => {
                if (err) throw err
                else return res.send(result)
            }
        )
    },
    delete(req, res) {
        const { id } = req.params
        db.query(`DELETE FROM image_activity WHERE id = '${id}'`,
            (err) => {
                if (err) throw err
                else return res.send({ message: 'delete image activity success' })
            }
        )
    }
}

module.exports = { ...imageActivityController }