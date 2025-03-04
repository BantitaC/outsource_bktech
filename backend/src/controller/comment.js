const db = require("../config/database")
const uuid = require("uuid")

const commentController = {
    fetchByPost(req, res) {
        const {post_id} = req.params
        db.query(`SELECT comment.*, user.email FROM comment JOIN user ON comment.user_id = user.id WHERE post_id = '${post_id}' ORDER BY comment.created_at DESC;`, 
            (err, result) => {
                if(err) throw err
                else return res.send(result)
            })
    },
    create(req, res) {
        const user = req.user
        const { description, post_id} = req.body
        db.query(`INSERT INTO comment (id, description, user_id, post_id) VALUES ('${uuid.v4()}', '${description}', '${user.id}', '${post_id}')`,
            (err, result) => {
                if (err) throw err
                else return res.send({ message: "create comment in post success"})
        })
    },
    delete(req, res) {
        const user = req.user
        const { id } = req.params
        db.query(`DELETE FROM comment WHERE id = '${id}' AND user_id = '${user.id}';`, 
            (err, result) => {
                if (err) throw err
                else return res.send({ message: "delete comment in post success" })
            }
        )
    }
}

module.exports = { ...commentController }