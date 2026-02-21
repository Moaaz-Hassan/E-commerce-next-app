import HomeSlider from "./_componentes/HomeComponentes/homeSlider";
import PrandsComponentes from "./_componentes/HomeComponentes/PrandsComponentes";
import CategoriesComponentes from "./_componentes/HomeComponentes/categoriesComponentes";
import ProductsComponentes from "./_componentes/HomeComponentes/productsComponentes";

export default async function Home() {

  return <div>
    <HomeSlider / >
    <PrandsComponentes/>
    <CategoriesComponentes/>
    <ProductsComponentes/>


  </div>;
}

