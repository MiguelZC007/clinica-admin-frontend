export interface CategoryDto {
  id?: string | null
  name?: string | null
  description?: string | null
  state?: boolean
  createdAt?: Date | null
  updatedAt?: Date | null
}

export interface CreateCategoryDto {
  name: string | null
  description: string | null
  state?: boolean
}

export interface UpdateCategoryDto extends CreateCategoryDto {}
