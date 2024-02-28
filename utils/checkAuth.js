import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

export default (req, res, next) => {
    const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
    // req.headers = Bearer

    if (token) {
        try {
            const decoded = jwt.verify(token, jwtSecret);

            req.userId = decoded._id;
            next();
        } catch (err) {
            return res.status(403).json({
                message: "No access",
            });
        }
    } else {
        return res.status(403).json({
            message: "No access",
        });
    }
};
