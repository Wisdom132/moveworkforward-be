"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.default.Schema({
    email: { type: String, unique: true },
    password: { type: String },
    name: { type: String },
});
userSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = bcrypt_1.default.genSaltSync(10);
    const hash = bcrypt_1.default.hashSync(this.password, salt);
    this.password = hash;
    next();
});
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
//# sourceMappingURL=user.js.map