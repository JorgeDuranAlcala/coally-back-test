"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthMiddleware {
    validateToken(req, res, next) {
        var _a;
        try {
            const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            if (!token) {
                res.status(401).json({ message: "Token not found" });
            }
            const decoded = jsonwebtoken_1.default.verify(String(token), String(process.env.JWT_SECRET));
            const userId = decoded === null || decoded === void 0 ? void 0 : decoded.id;
            req.user = { userId };
            next();
        }
        catch (err) {
            next(err);
        }
    }
}
exports.AuthMiddleware = AuthMiddleware;
