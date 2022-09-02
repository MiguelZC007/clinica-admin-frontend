export interface ProductDto {
  id?: string | null
  name: string
  price: number
  state?: true
  description?: string
  programmable: true
  sub_category?: string | null
  category_id: string
  // odoo_product_id?: number | null
  // createdAt?: Date | null
  // updatedAt?: Date | null
}
