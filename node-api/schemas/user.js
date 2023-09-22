"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    username: String,
});
var User = mongoose_1.default.model("User", userSchema);
exports.default = User;
