import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductEntity } from './product.entity';

@Controller('product')
export class ProductController {
    constructor(private productService: InMemoryDBService<ProductEntity>) {}

    @Get()
    getProducts() {
        return this.productService.getAll();
    }

    @Post()
    AddProduct(@Body() product: ProductEntity): ProductEntity {
        return this.productService.create(product);
    }
}
