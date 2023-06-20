import coolsms from 'coolsms-node-sdk'

const mysms = coolsms.default

export function getToken() {
    const token = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
    console.log(token);
    return token;
}

export function checkPhone(phoneNumber) {
    // 1. 휴대폰번호의 자릿수 확인 (10 ~ 11 자리)
    if (phoneNumber.length < 10 || phoneNumber.length > 11) {
        console.log("에러 발생! 핸드폰 번호를 제대로 입력해 주세요!!")
        return false;
    }

    return true;
}

export default function sendTokenToSMS(phoneNumber, token) {
    const smskey = process.env.SMS_KEY
    const smsSecret = process.env.SMS_SECRET
    const smsSender = process.env.SMS_SENDER
    const messageService = new mysms(smskey, smsSecret)

    messageService.sendOne({
        to: phoneNumber,
        from: smsSender,
        text: `[테스트 문자] 안녕하세요. 요청하신 인증번호는 ${token} 입니다.`
    }).then(res => console.log(res))
        .catch(err => console.error(err))
    console.log(phoneNumber + "번호로 인증번호 " + token + "를 전송합니다.");
}
