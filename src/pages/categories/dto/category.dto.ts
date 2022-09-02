export interface CategoryDto {
  id?: string
  name?: string
  description?: string
  state?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface CreateCategoryDto {
  name: string | null
  description: string | null
  state?: boolean
}

export interface UpdateCategoryDto extends CreateCategoryDto {}
