export interface rewiewsRespons {
  results: number
  metadata: Metadata
  data: rewiew[]
}

export interface Metadata {
  currentPage: number
  numberOfPages: number
  limit: number
}

export interface rewiew {
  _id: string
  rating: number
  review: string
  product: string
  user: User
  createdAt: string
  updatedAt: string
}

export interface User {
  _id: string
  name: string
}