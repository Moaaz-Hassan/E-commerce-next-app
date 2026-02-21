export async function getAllBrands(curantPage: number) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/brands?page=${curantPage}&limit=20`,
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

export async function getSpecificBrand(curantPage: number, brandID: string) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?brand=${brandID}&page=${curantPage}&limit=20`,
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
