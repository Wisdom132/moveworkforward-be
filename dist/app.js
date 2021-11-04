"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
// import { DATABASE_URL } from "./utils/secrets";
const userRoutes = __importStar(require("./handlers/user"));
// Create Express server
const app = (0, express_1.default)();
mongoose_1.default
    .connect("mongodb://localhost:27017/test", { useNewUrlParser: true })
    .then(() => {
    console.log("Database connected");
})
    .catch((err) => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    // process.exit();
});
app.set("port", process.env.PORT || 4000);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// app.get("/", homeRoute.index);
app.post("/register", userRoutes.registerUser);
app.get("/users", userRoutes.users);
app.use((_req, res) => {
    res.status(404).send({
        success: false,
        error: "resource not found",
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map