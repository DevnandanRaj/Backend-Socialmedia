const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(400).json({msg:"Token not found"})
    }
    try {
        const decode = jwt.verify(token, "Dev");
        req.user = decode.userId;
        next();
    } catch (error) {
        res.status(400).json({msg:"Invalid token"})
    }
}
module.exports = auth;