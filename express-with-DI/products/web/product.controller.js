export class ProductController {
    cashService
    productService

    constructor(cashService, productService) {
        this.cashService = cashService
        this.productService = productService
    }

    buyProduct = (req, res) => {
        // 1. 가진 돈을 검증하는 코드
        const hasMoney = this.cashService.checkValue()

        // 2. 판매여부 검증하는 코드
        const isSoldout = this.productService.checkSoldout()

        // 3. 상품 구매하는 코드
        // if 돈이 있는 상태 and 판매중
        // then 상품 구매 완료
        if (hasMoney && !isSoldout) {
            res.send("상품 구매 완료")
            return
        }

        res.send("상품 구매 실패")

    }

    refundProduct = (req, res) => {
        // 1. 판매여부 검증하는 코드
        let isSoldout = this.productService.checkSoldout()

        // 2. 상품 환불 코드
        // if 판매완료
        // then 상품 환불 완료
        if (!isSoldout) { // 환불완료 처리를 위한 임시 true 처리
            isSoldout = true
        }

        if (isSoldout) {
            res.send("상품 환불 완료!")
            return
        }
        res.send("상품 환불 실패")
    }
}