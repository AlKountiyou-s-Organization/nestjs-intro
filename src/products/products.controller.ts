import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}
    
    @Post()
    addProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number
    ): any {    
       const generatedId = this.productsService.insertProduct(prodTitle, prodDesc, prodPrice);
       return { id : generatedId }
    }

    @Get()
    getAllProducts(): any {
        return this.productsService.getAllProducts();
    }

    @Get(':id')
    getProduct(@Param('id') prodId: string): any {
        return this.productsService.getProduct(prodId);
    }

    @Patch(':id')
    updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number
    ): any {
        return this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
    }

    @Delete(':id')
    removeProduct(@Res() res, @Param('id') prodId: string): any {
        this.productsService.deleteProduct(prodId)
        return res.status(200).send('Deleted Successfully')
    }
}

