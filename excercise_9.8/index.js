"use strict";
exports.__esModule = true;
var express_1 = require("express");
var app = (0, express_1["default"])();
app.get('/', function (_req, res) {
    res.send('pong');
});
var PORT = 3003;
app.listen(PORT, function () {
    console.log("Server running on port " + PORT);
});
