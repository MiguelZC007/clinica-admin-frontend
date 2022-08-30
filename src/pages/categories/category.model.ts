import { CategoryDto } from './dto/category.dto'

export class CategoryModel {
  private category: CategoryDto = {
    name: '',
    description: '',
    state: true
  }

  constructor(Props?: CategoryDto | null) {
    if (Props) {
      this.category = Props
    }
  }

  getUpdateCategory() {
    return {
      name: this.category.name,
      description: this.category.description,
      state: this.category.state
    }
  }

  setCategory(category: CategoryDto) {
    this.category = category
  }

  getCategoryDto() {
    return this.category
  }
}
