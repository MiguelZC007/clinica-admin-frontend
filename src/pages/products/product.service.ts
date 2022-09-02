import axios from '@/boot/axios'
import { ProductDto } from './dto/product.dto'
import { ProductModel } from './product.model'

const path = 'product'

class ProductServ {
  createProduct(product: ProductDto) {
    const model = new ProductModel()
    model.setProduct(product)
    return new Promise<ProductDto>((resolve, reject) => {
      axios
        .post(path, model.getCreateProduct())
        .then(response => resolve(response.data))
        .catch(err => reject(err))
    })
  }

  findAllProducts() {
    return new Promise<ProductDto[]>((resolve, reject) => {
      axios
        .get(path)
        .then(response => resolve(response.data))
        .catch(err => reject(err))
    })
  }

  findProductsByPage(take: number, page: number) {
    return new Promise<ProductDto[]>((resolve, reject) => {
      axios
        .get(`${path}/?take=${take}&page=${page}`)
        .then(response => resolve(response.data))
        .catch(err => reject(err))
    })
  }

  updateProduct(product: ProductDto, id: string | null | undefined) {
    return new Promise<ProductDto>((resolve, reject) => {
      axios
        .put(`${path}/${id}`, product)
        .then(response => resolve(response.data))
        .catch(err => reject(err))
    })
  }

  deleteProduct(id: string) {
    return new Promise<ProductDto>((resolve, reject) => {
      axios
        .delete(`${path}/${id}`)
        .then(response => resolve(response.data))
        .catch(err => reject(err))
    })
  }
}

export const ProductServices = new ProductServ()