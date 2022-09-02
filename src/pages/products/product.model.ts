import { CreateProductDto, ProductDto } from './dto/product.dto'

export class ProductModel {
  private product: ProductDto = {
    name: '',
    price: 0,
    state: false,
    description: '',
    programmable: false,
    sub_category: '',
    category_id: ''
  }

  constructor(Props?: ProductDto | null) {
    if (Props) this.product = Props
  }

  getProduct(): ProductDto {
    return this.product
  }

  getCreateProduct(): CreateProductDto {
    return this.product
  }

  getProductDto(): ProductDto {
    return this.product
  }

  setProduct(props: ProductDto) {
    this.product = props
  }
}
