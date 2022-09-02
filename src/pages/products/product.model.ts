import { ProductDto } from './dto/product.dto'

export class ProductModel {
  id: string = ''
  name: string = ''
  price: number = 0
  state: boolean = false
  description: string = ''
  programmable: boolean = false
  sub_category: string = ''
  category_id: string = ''
  odoo_product_id: string | number = ''

  constructor(Props?: ProductDto | null) {
    this.id = Props?.id || ''
    this.name = Props?.name || ''
    this.price = Props?.price || 0
    this.state = Props?.state || true
    this.description = Props?.description || ''
    this.programmable = Props?.programmable || true
    this.sub_category = Props?.sub_category || ''
    this.category_id = Props?.category_id || ''
    // this.odoo_product_id = Props?.odoo_product_id || ''
  }

  getProduct() {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      state: this.state,
      description: this.description,
      programmable: this.programmable,
      sub_category: this.sub_category,
      category_id: this.category_id,
      odoo_product_id: this.odoo_product_id
    }
  }

  getCreateProduct(product: ProductDto) {
    return {
      name: product.name.trim(),
      price: product.price ? product.price : 0,
      state: product.state,
      description: product.description,
      programmable: product.programmable,
      sub_category: product.sub_category,
      category_id: product.category_id
      //   odoo_product_id: product.odoo_product_id ? product.odoo_product_id : null
    }
  }
}
