export interface categoriesRespons {
  results: number
  metadata: Metadata
  data: cat[]
}

export interface Metadata {
  currentPage: number
  numberOfPages: number
  limit: number
}

export interface cat {
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
}