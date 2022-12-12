package de.imedia24.shop

import de.imedia24.shop.service.ProductService
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration

@Configuration
@ComponentScan("de.imedia24.shop")
class Configuration {
    @Bean
    fun productRepository(): ProductService {
    }


}



