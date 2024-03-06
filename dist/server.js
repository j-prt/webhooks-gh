"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    console.log('hit root');
    console.log(req);
    res.send({ thanks: 'for clicking' });
});
app.listen(4001, () => {
    console.log('Listening on port 4001');
});
