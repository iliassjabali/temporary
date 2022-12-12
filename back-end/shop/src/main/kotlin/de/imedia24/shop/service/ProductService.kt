package de.imedia24.shop.service

import de.imedia24.shop.db.entity.ProductEntity
import de.imedia24.shop.db.repository.ProductRepository
import de.imedia24.shop.domain.product.ProductResponse
import org.springframework.stereotype.Service

@Service
class ProductService(private val productRepository: ProductRepository) {


    //construtor that is called by Spring when the class is instantiated

    init {
        val products = listOf(
            createProduct("123", "Product 1", 10.0, 10),
            createProduct("456", "Product 2", 20.0, 20),
            createProduct("789", "Product 3", 30.0, 30)
        )
        productRepository.saveAll(products)
    }


    fun findProductBySku(sku: String): ProductResponse? {
        return productRepository.findBySku(sku)?.let {
            ProductResponse(
                sku = it.sku,
                name = it.name,
                price = it.price,
                stock = it.stock
            )
        }
    }
    fun findAllBySkuIn(skus: List<String>): List<ProductEntity> {
        return productRepository.findAllBySkuIn(skus)
    }
    fun createProduct(sku: String, name: String, price: Double, stock: Int): ProductEntity? {
        return productRepository.createProduct(sku, name, price, stock)
    }
    fun partialyUpdateProduct(sku: String, name: String?, price: Double?, stock: Int?): ProductEntity? {
        return productRepository.partialyUpdateProduct(sku, name, price, stock)
    }

    companion object {
        fun getProductrepo(): ProductRepository {
            return ProductService.getProductrepo()
        }
    }


}
