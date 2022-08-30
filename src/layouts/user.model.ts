import { User } from '@/models/user.dto'

export class UserModel {
  id?: string | null = ''
  name: string = ''
  lastname: string
  mother_lastname?: string | null = ''
  birthdate?: string | null = ''
  cellphone?: string | null = ''
  ci?: string | null = ''
  gender?: string | null = ''
  address?: string | null = ''
  zone?: string | null = ''
  state?: string | null = ''
  city?: string | null = ''
  country?: string | null = ''
  email?: string | null = ''
  password?: string | null = ''
  contact_name?: string | null = ''
  contact_phone?: string | null = ''
  relationship?: string | null = ''
  registration_age?: string | null = ''
  observations?: string | null = ''
  about_us?: string | null = ''
  is_black?: boolean | null = false
  hemodialysis?: boolean | null = false
  active?: boolean | null = false

  constructor(Props?: User | null) {
    this.id = Props?.id || ''
    this.name = Props?.name || ''
    this.lastname = Props?.lastname || ''
    this.mother_lastname = Props?.mother_lastname || ''
    this.birthdate = Props?.birthdate || null
    this.cellphone = Props?.cellphone || ''
    this.ci = Props?.ci || ''
    this.gender = Props?.gender || ''
    this.address = Props?.address || ''
    this.zone = Props?.zone || ''
    this.country = Props?.country
    this.state = Props?.state
    this.city = Props?.city
    this.email = Props?.email || ''
    this.contact_name = Props?.contact_name || ''
    this.contact_phone = Props?.contact_phone || ''
    this.relationship = Props?.relationship || ''
    this.registration_age = Props?.registration_age || ''
    this.observations = Props?.observations || ''
    this.about_us = Props?.about_us || null
    this.active = Props?.active || true
    this.is_black = Props?.is_black || false
    this.hemodialysis = Props?.hemodialysis || false
  }
}
