import express from 'express'
import sendTokenToSMS, {checkPhone, getToken} from './phone.js'
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import {options} from "./swagger/config.js";
import cors from "cors";
import 'dotenv/config'
import {checkEmail, generateWelcomeTemplate, sendWelcomeEmail} from './api/email/email.js'
import {getToday} from './api/email/utils.js';
import mongoose from 'mongoose'
import {Board} from "./models/board.model.js";

const app = express();
const swaggerSpec = swaggerJsdoc(options);

// 옛날에는 bodyParser를 사용했다 함.
app.use(express.json())
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/boards', async function (req, res) {
    // 1. DB 접속 후 데이터를 조회
    // const result = [
    //     {number: 1, writer: "철수", title: "제목입력", contents: "내용!"},
    //     {number: 2, writer: "영희", title: "냉무", contents: "냉무!"},
    //     {number: 3, writer: "홍길동", title: "테스트 게시물", contents: "test"}
    // ];

    const result = await Board.find()

    // 2. DB에서 꺼내온 결과를 응답 (response)으로 전달
    res.send(result);

})

app.post('/boards', async function (req, res) {
    // 1. client에서 보내준 데이터 확인하기
    console.log(req)
    console.log("======")
    console.log(req.body)

    // 2. DB 접속 후 데이터를 저장
    const board = new Board({
        writer: req.body.writer,
        title: req.body.title,
        contents: req.body.contents
    });

    await board.save()

    // 3. 저장 결과를 응답으로 전달
    res.send("게시물 등록에 성공하였습니다.")
})

app.post('/tokens/phone', function (req, res, next) {

    const requestNumber = req.body.phoneNumber;

    // 1. 휴대전화 형식 확인
    const isValid = checkPhone(requestNumber);
    if (!isValid) {
        // res.send("인증 실패 - 입력된 전화번호를 확인해주세요.")
        try {
            throw new Error('Invalid Phone Number.')
        } catch (err) {
            next(err)
        }
        return;
    }

    // 2. 핸드폰 토큰 6자리 만들기
    const token = getToken();

    // 3. 핸드폰 번호에 토큰 전송하기
    sendTokenToSMS(requestNumber, token);

    res.send("인증 완료!")
})

app.post("/users", function (req, res) {
    const {name, age, school, email} = req.body

    // 1. 이메일 정상 확인
    // 1.1 존재 여부 및 @ 포함여부
    const isValid = checkEmail(email);
    if (isValid === false) {
        return
    }

    const createAt = getToday()
    // 2. 가입 환영 템플릿 만들기
    const myTemplate = generateWelcomeTemplate({name, age, school, createAt})

    // 3. 이메일에 가입환영 템플릿 전송
    sendWelcomeEmail({email, myTemplate})

    res.send("가입 완료!")
})

mongoose.connect("mongodb://my-mongo:27017/mydocker")
    .then(() => console.log("db 접속에 성공했습니다."))
    .catch(() => console.log("db 접속에 실패했습니다."))
app.listen(3000)
