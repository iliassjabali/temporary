package de.imedia24.shop.db.repository

import de.imedia24.shop.db.entity.ProductEntity
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface ProductRepository : CrudRepository<ProductEntity, String>, List<ProductEntity> {

    fun findBySku(sku: String): ProductEntity?
    fun findAllBySkuIn(skus: List<String>): List<ProductEntity>
    fun createProduct(sku: String, name: String, price: Double, stock: Int): ProductEntity?

    fun partialyUpdateProduct(sku: String, name: String?, price: Double?, stock: Int?): ProductEntity?

}

