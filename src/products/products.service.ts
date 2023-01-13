import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./products.model";

@Injectable()
export class ProductsService{
    products: Product[] = []

    insertProduct(title: string, desc: string, price: number){
        const prodId = Math.random().toString()
        const newProduct = new Product(prodId, title, desc, price)
        this.products.push(newProduct)
        return prodId
    }

    getAllProducts(){
        return this.products.slice() // or [...this.products]
    }

    getProduct(prodId: string){
        const [product, productIndex] = this.findProduct(prodId)
        return { ...product }
    }

    updateProduct(prodId: string, title: string, desc: string, price: number){
        const [product, productIndex] = this.findProduct(prodId)
        if(title)
            product.title = title
        if(desc)
            product.description = desc
        if(price)
            product.price = price
        this.products[productIndex] = {...product}
        return {...product}
    }

    deleteProduct(prodId: string){
        const index = this.findProduct(prodId)[1]
        this.products.splice(index, 1)
    }

    private findProduct(id: string): [Product, number]{
        const productIndex = this.products.findIndex(prod => prod.id == id)
        const product = this.products[productIndex]
        if(!product)
            throw new NotFoundException('Could not find product')
        return [product, productIndex]
    }
}