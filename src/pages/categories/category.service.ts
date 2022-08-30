import axios from '@/boot/axios'
import { CategoryModel } from './category.model'
import { CategoryDto } from './dto/category.dto'

const path = 'category'

class CategoryServ {
  // POST
  createCategoryDto(category: CategoryDto) {
    const model = new CategoryModel()
    model.setCategory(category)
    return new Promise<CategoryDto>((resolve, reject) => {
      axios
        .post(path, model.getUpdateCategory())
        .then(response => resolve(response.data))
        .catch(err => reject(err))
    })
  }

  // GET
  findAllCategories() {
    return new Promise<CategoryDto[]>((resolve, reject) => {
      axios
        .get(path)
        .then(response => resolve(response.data))
        .catch(err => reject(err))
    })
  }

  // UPDATE
  updateCategory(category: CategoryDto, id: string | null | undefined) {
    const model = new CategoryModel()
    model.setCategory(category)
    return new Promise<CategoryDto>((resolve, reject) => {
      axios
        .put(`${path}/${id}`, model.getUpdateCategory())
        .then(response => resolve(response.data))
        .catch(err => reject(err))
    })
  }

  // DELETE
  deleteCategory(id: string) {
    return new Promise<CategoryDto>((resolve, reject) => {
      axios
        .delete(`${path}/${id}`)
        .then(response => resolve(response.data))
        .catch(err => reject(err))
    })
  }
}

export const CategoryServices = new CategoryServ()
