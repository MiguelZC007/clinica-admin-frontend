import axios from '@/boot/axios'
import { ProductDto } from './dto/product.dto'

const path = 'product'

class ProductServ {
  //   createProduct(product: ProductDto) {
  //     return new Promise<ProductDto>((resolve, reject) => {
  //       axios
  //         .
  //     })
  //   }

  findAllProducts() {
    return new Promise<ProductDto>((resolve, reject) => {
      axios
        .get(path)
        .then(response => resolve(response.data))
        .catch(err => reject(err))
    })
  }
}

export const ProductServices = new ProductServ()
