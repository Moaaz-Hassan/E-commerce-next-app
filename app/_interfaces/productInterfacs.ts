export interface CartItem {
  count: number;
  _id: string;
  price: number;
  product: CartProduct;
}

export interface CartProduct {
  _id: string;
  title: string;
  imageCover: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  category: Category;
  brand: Brand;
  subcategory: Subcategory[];
  id: string;
}






export interface productsRespons {
  results: number
  metadata: Metadata
  data: product[]
}

export interface Metadata {
  currentPage: number
  numberOfPages: number
  limit: number
  nextPage: number
}

export interface product {
  sold: number
  images: string[]
  subcategory: Subcategory[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  imageCover: string
  category: Category
  brand: Brand
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  id: string
}

export interface Subcategory {
  _id: string
  name: string
  slug: string
  category: string
}

export interface Category {
  _id: string
  name: string
  slug: string
  image: string
}

export interface Brand {
  _id: string
  name: string
  slug: string
  image: string
}
