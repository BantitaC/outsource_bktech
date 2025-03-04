const db = require("../config/database")
const bcryptjs = require("bcryptjs")
const uuid = require("uuid")
const jwt = require("jsonwebtoken")

const userController = {
    register(req, res, next) {
        db.query(
            `SELECT id FROM user WHERE email = '${req.body.email}'  `,
            (err, result) => {
                if (result && result.length) {
                    return res.status(409).send({
                        message: "This email is already in use",
                    });
                } else {
                    bcryptjs.hash(req.body.password, 10, (err, hash) => {
                        if (err) {
                            return res.status(500).send({
                                message: err,
                            });
                        } else {
                            db.query(
                                `INSERT INTO user (id, email, password, role ) VALUES ('${uuid.v4()}', ${db.escape(req.body.email)},'${hash}', 'user')`,
                                (err, result) => {
                                    if (err) {
                                        throw err;
                                    }
                                    return res.status(201).send({
                                        message: "Registered",
                                    });
                                }
                            );
                        }
                    });
                }
            }
        );
    },
    login(req, res, next) {
        db.query(`
            SELECT id, email, password FROM user WHERE email = '${req.body.email}'`, 
            (err, result) => {
                if (err) {
                    return res.status(400).send({
                        message: err,
                    });
                }
                if (!result.length) {
                    return res.send({
                        message: "email หรือ Password ไม่ถูกต้อง",
                    });
                }
                bcryptjs.compare(
                    req.body.password,
                    result[0]["password"],
                    (bErr, bResult) => {
                        if (bErr) {
                            return res.send({
                                message: "email หรือ Password ไม่ถูกต้อง"
                            })
                        }
                        if (bResult) {
                            const token = jwt.sign(
                                {
                                    role: 'user',
                                    email: result[0].email,
                                    id: result[0].id,
                                },
                                process.env.jwt_secret,
                                { expiresIn: "30d" }
                            )
                            res.cookie('token', token, {
                                httpOnly: true, 
                                secure: false, 
                                maxAge: 2592000000,
                            });
                            return res.send({
                                message: "ล็อคอิน สำเร็จ"
                            })
                        }
                        return res.send({
                            message: "email หรือ Password ไม่ถูกต้อง"
                        })
                    }
                )
            }
        )
    },

    logout(req, res, next) {
        res.clearCookie('token');
        
        return res.send({
            message: "ออกจากระบบสำเร็จ"
        });
    }
}

module.exports = { ...userController };
