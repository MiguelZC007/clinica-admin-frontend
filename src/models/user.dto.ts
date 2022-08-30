export interface Role {
  id: string
  name: string
  active: boolean
  createdAt: string
  updatedAt: string
}
export interface UserRole {
  id: string
  rol_id: string
  user_id: string
  createdAt: string
  updatedAt: string
  rol: Array<Role>
}
export interface User {
  id?: string | null
  name: string
  lastname: string
  mother_lastname?: string | null
  birthdate?: string | null
  cellphone?: string | null
  ci?: string | null
  gender?: string | null
  address?: string | null
  zone?: string | null
  state?: string | null
  city?: string | null
  country?: string | null
  email?: string | null
  password?: string | null
  contact_name?: string | null
  contact_phone?: string | null
  relationship?: string | null
  registration_age?: string | null
  observations?: string | null
  about_us?: string | null
  is_black?: boolean | null
  hemodialysis?: boolean | null
  active?: boolean | null

  user_rol: Array<UserRole>
}
