import jwt from "jsonwebtoken";
const config = require("../config")

export const verifyToken = (req: any, res: any, next: any) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token']

    if (!token) {
        return res.status(403).send("Require a token")
    }

    try {
        const decoded = jwt.verify(token, config.secretKey);
        req.user = decoded;
        return next();
    } catch (err) {
        return res.status(401).send("Session Expired. Please Login Again!")
    }
}
