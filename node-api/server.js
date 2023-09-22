"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var user_1 = require("./schemas/user");
var url = "mongodb+srv://StephenP:Stephen11@cluster0.qpaeqzw.mongodb.net/";
mongoose_1.default.connect(url)
    .then(function () {
    console.log("เชื่อต่อฐานข้อมูลสำเร็จ");
})
    .catch(function (error) {
    console.log("เกิดข้อผิดพลาด", error);
});
var user = new user_1.default({
    username: "Satavit",
});
user.save();
