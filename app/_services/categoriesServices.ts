export async function getAllCategories(curantPage: number) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories?page=${curantPage}&limit=20`,
    );
    if (!response.ok) {
      return null;
    }
    const Brands = await response.json();
    return Brands;
  } catch (err) {
    console.log(err);
  }
}


export async function getSpecificCategory(curantPage: number, CategoryID: string) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?category=${CategoryID}&page=${curantPage}&limit=20`
    );

    if (!response.ok) {
      return null;
    }

    const Brands = await response.json();
    return Brands;
  } catch (err) {
    console.log(err);
  }
}




