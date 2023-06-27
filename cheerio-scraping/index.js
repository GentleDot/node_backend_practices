import axios from "axios";
import cheerio from "cheerio";
/*
* 1. 입려된 메시지: "안녕하세요~ https://www.naver.com 에 방문해 주세요!"
* 2. 입력된 메시지에서 http로 시자하는 문장이 있는지 먼저 찾기
*   2-1. .find() 등의 알고리즘 사용
* 3. axios.get으로 요청하여 html 코드 받아오기 => 스크래핑
* 4. 스크래핑 결과에서 OG (OpenGraph) 코드를 콜라내서 변수에 담기
*   4-1. cheerio 도움 받기
*/

const createMessage = async () => {
    // 입력된 메시지에서 http로 시자하는 문장이 있는지 먼저 찾기
    const url = "https://www.naver.com"

    // axios.get으로 요청하여 html 코드 받아오기 => 스크래핑
    const result = await axios.get(url);
    console.log(result.data)

    // 스크래핑 결과에서 OG (OpenGraph) 코드를 콜라내서 변수에 담기
    const loadedData = cheerio.load(result.data);
    loadedData("meta").each((index, el) => {
        if (loadedData(el).attr("property") &&
            loadedData(el).attr("property").includes("og:")) {
            const key = loadedData(el).attr("property")
            const value = loadedData(el).attr("content")
            console.log(key, value)
        }
    })
}

createMessage()