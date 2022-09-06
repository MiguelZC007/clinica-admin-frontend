export interface ProductDto {
  id?: string
  name: string
  price: number
  state: boolean
  description?: string
  programmable: boolean
  sub_category?: string
  category_id: string
  odoo_product_id?: number
  createdAt?: Date
  updatedAt?: Date
}

export interface CreateProductDto {
  name: string
  price: number
  state: boolean
  description?: string
  programmable: boolean
  sub_category?: string
  category_id: string
}

export interface UpdateProductDto extends CreateProductDto {}
