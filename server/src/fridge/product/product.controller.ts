import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtGuard } from '../../auth/guard/jwt.guard';
import { CreateProductDto } from './dto/product.dto';

@Controller('fridges/:fridgeId/products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @UseGuards(JwtGuard)
  @Get()
  getProducts(@Param('fridgeId') fridgeId: string) {
    return this.productService.getProducts(fridgeId);
  }

  @UseGuards(JwtGuard)
  @Get(':productId')
  getProduct(
    @Param('fridgeId') fridgeId: string,
    @Param('productId') productId: string,
  ) {
    return this.productService.getProduct(productId, fridgeId);
  }

  @UseGuards(JwtGuard)
  @Post()
  createProduct(
    @Param('fridgeId') fridgeId: string,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productService.createProduct({
      ...createProductDto,
      fridgeId,
    });
  }

  @UseGuards(JwtGuard)
  @Put(':productId')
  updateProduct(
    @Param('fridgeId') fridgeId: string,
    @Param('productId') productId: string,
    @Body() updateProductDto: Partial<CreateProductDto>,
  ) {
    return this.productService.updateProduct(
      productId,
      fridgeId,
      updateProductDto,
    );
  }

  @UseGuards(JwtGuard)
  @Delete(':productId')
  deleteProduct(
    @Param('fridgeId') fridgeId: string,
    @Param('productId') productId: string,
  ) {
    return this.productService.deleteProduct(productId, fridgeId);
  }
}
