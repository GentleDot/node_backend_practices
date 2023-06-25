import nodemailer from 'nodemailer'

export function checkEmail(email) {
    if (!email) {
        return false
    }
    return email.includes("@") !== false;
}

export function generateWelcomeTemplate({name, age, school, createAt}) {
    return `
    <html lang="ko">
        <body>
            <h1>${name} 님의 가입을 환영합니다.</h1>
            <hr />
            <div>
            <p>이름 : ${name}</p>
            <p>나이 : ${age}</p>
            <p>학교 : ${school}</p>
            <p>가입일 : ${createAt}</p>
            </div>
        </body>
    </html>             
`;
}

export async function sendWelcomeEmail({email, myTemplate}) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_SENDER_ID,
            pass: process.env.EMAIL_SENDER_PASSWORD,
        },
    });

    const res = await transporter.sendMail({
        from: process.env.EMAIL_SENDER,
        to: email,
        subject: "[테스트 발송] 환영합니다!",
        html: myTemplate
    });

    console.log(res)
    console.log(email + " 주소로 이메일" + myTemplate + "을 전송하였습니다.")
}