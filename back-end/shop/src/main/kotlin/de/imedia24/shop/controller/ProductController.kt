package de.imedia24.shop.controller

import de.imedia24.shop.db.entity.ProductEntity
import de.imedia24.shop.domain.product.ProductResponse
import de.imedia24.shop.service.ProductService
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
class ProductController(private val productService: ProductService) {

    private val logger = LoggerFactory.getLogger(ProductController::class.java)!!

    @GetMapping("/products/{sku}", produces = ["application/json;charset=utf-8"])
    fun findProductsBySku(
        @PathVariable("sku") sku: String
    ): ResponseEntity<ProductResponse> {
        logger.info("Request for product $sku")

        val product = productService.findProductBySku(sku)
        return if(product == null) {
            ResponseEntity.notFound().build()
        } else {
            ResponseEntity.ok(product)
        }
    }
   // 1 - add an endpoint to get list of product details by list of SKUs: /products?skus=123,4567,8901,2345,67789
    @GetMapping("/products", produces = ["application/json;charset=utf-8"])
    fun findProductsBySkus(
        @PathVariable("skus") skus: List<String>
    ): ResponseEntity<List<ProductEntity>> {
        logger.info("Request for products $skus")

        val products = productService.findAllBySkuIn(skus)
        return if(products.isEmpty()) {
            ResponseEntity.notFound().build()
        } else {
            ResponseEntity.ok(products)
        }
    }
    @PostMapping("/products", produces = ["application/json;charset=utf-8"])
    // 2 - add an endpoint to create a new product
    fun createProduct(
        @PathVariable("sku") sku: String,
        @PathVariable("name") name: String,
        @PathVariable("price") price: Double,
        @PathVariable("stock") stock: Int
    ): ResponseEntity<ProductEntity> {
        logger.info("Request to create product $sku")

        val product = productService.createProduct(sku, name, price, stock)
        return if(product == null) {
            ResponseEntity.notFound().build()
        } else {
            ResponseEntity.ok(product)
        }
    }
    //PartialyUpdateProduct
    @PutMapping("/products/{sku}", produces = ["application/json;charset=utf-8"])
    fun partialyUpdateProduct(
        @PathVariable("sku") sku: String,
        @PathVariable("name") name: String?,
        @PathVariable("price") price: Double?,
        @PathVariable("stock") stock: Int?
    ): ResponseEntity<ProductEntity> {
        logger.info("Request to update product $sku")

        val product = productService.partialyUpdateProduct(sku, name, price, stock)
        return if(product == null) {
            ResponseEntity.notFound().build()
        } else {
            ResponseEntity.ok(product)
        }
    }

}
