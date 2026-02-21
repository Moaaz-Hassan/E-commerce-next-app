import { VerifyToken } from "./VerifyToken";

export async function getUserOrders() {
  const id = await VerifyToken();

  if (id) {
    try {
      const response = await fetch(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
      );

      if (!response.ok) {
        return null;
      }

      const Orders = await response.json();
      return Orders;
    } catch (erro) {
      console.log(erro);
    }
  } else {
    return null;
  }
}
