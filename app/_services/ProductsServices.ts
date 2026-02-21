"use server";

export async function getProducts(curantPage: number) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?page=${curantPage}&limit=20`,
    );

    if (!response.ok) {
      return null;
    }
    const Products = await response.json();

    return Products;
  } catch (erro) {
    console.log(erro);
  }
}

export async function getProductDetailes(id: string) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`,
    );

    if (!response.ok) {
      return null;
    }

    const Product = await response.json();
    return Product;
  } catch (erro) {
    console.log(erro);
  }
}
