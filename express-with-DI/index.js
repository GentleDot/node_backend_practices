import express from 'express'
import {ProductController} from "./products/web/product.controller.js";
import {CouponController} from "./products/coupon/web/coupon.controller.js";
import {CashService} from "./products/payment/service/cash.service.js";
import {GoodsService} from "./products/goods/service/goods.service.js";

const app = express();

const cashService = new CashService();
const goodsService = new GoodsService();
const productController = new ProductController(cashService, goodsService)
// 상품 구매
app.post('/products/buy', productController.buyProduct)
// 상품 환불
app.post('/products/refund', productController.refundProduct)

/*
* 쿠폰 API
*/
const couponController = new CouponController(cashService)
app.post("/coupons/buy", couponController.buyCoupon)


app.listen(3000)