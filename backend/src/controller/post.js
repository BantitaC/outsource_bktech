const db = require("../config/database")
const uuid = require("uuid")
const postController = {
    fetchAll(req, res) {
        db.query(`
            SELECT post.*, user.email
            FROM post
            JOIN user ON post.user_id = user.id
            ORDER BY post.created_at DESC;
        `, (err, result) => {
            if (err) throw err
            else return res.send(result)
        })
    },
    create(req, res) {
        const {title, description} = req.body
        const user = req.user
        db.query(`INSERT INTO post(id, user_id, title, description) VALUES ('${uuid.v4()}', '${user.id}', '${title}', '${description}');`, 
            (err, result) => {
                if (err) throw err;
                else return res.send({ message: "create post success"})
        })
    },
    delete(req, res) {
        const {id} = req.params
        db.query(`DELETE FROM post WHERE id = '${id}'`, (err,result) => {
            if(err) throw err;
            else {
                return res.send({ message: 'delete post success' });
            }
        })
    }
}

module.exports = { ...postController }