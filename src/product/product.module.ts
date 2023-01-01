import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';

@Module({
  imports: [InMemoryDBModule.forFeature('product')],
  controllers: [ProductController]
})
export class ProductModule {}
