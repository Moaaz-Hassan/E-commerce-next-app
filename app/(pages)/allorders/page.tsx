"use client";

import { useState, useEffect } from "react";
import { getUserOrders } from "@/app/_services/ordersServices";
import { Spinner } from "@heroui/react";
import { timeAgo } from "@/app/_services/timeFormat";
import { OrdersInterface , Order } from "@/app/_interfaces/ordersintrface";
import { currencyFormat } from "@/app/_services/currencyFormat";
import { Button } from "@heroui/react";
import CreatProductOrder from "@/app/_componentes/CreatProductOrder";


function MyOrders() {
  const [orders, setOrders] = useState<OrdersInterface | null>(null);
  const [loading, setLoading] = useState(true);

  const [viewProducts, setViewProducts] = useState("");

  useEffect(() => {
    async function getOrders() {
      const response = await getUserOrders();

      if (response) {
        setOrders(response);
      } else {
        setOrders(null);
      }

      setLoading(false);
    }

    getOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96 w-full">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  if (orders === null) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <h2 className="text-gray-800 font-extrabold text-3xl">Error</h2>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <h2 className="text-gray-800 font-extrabold text-3xl">
          You haven't placed any orders yet.
        </h2>
      </div>
    );
  }

  return (
    <div>
      {orders.map((order) => (
        <div key={order._id}>
          <div
            className="border border-gray-400 rounded-xl p-4 mb-4  "
          >
            <div className="flex justify-between">
              <div>
                <h2 className=" text-xl font-medium text-gray-600">
                  Order placed {timeAgo(order.createdAt)}
                </h2>
                <h2
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.isDelivered
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.isDelivered ? "Delivered" : "On the Way"}
                </h2>
              </div>
              <h3 className=" text-xl font-bold text-gray-800">
                Total Order'Price {currencyFormat(order.totalOrderPrice)}
              </h3>
            </div>
            <div className=" flex gap-5 items-center">
              {order.paymentMethodType == "card" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-green-600 my-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-green-600 my-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                  />
                </svg>
              )}
              <h2>{order.cartItems.length} Items in order </h2>
            </div>

            <div className=" w-full text-right">
              <Button
                onPress={() => {
                  if (viewProducts == order._id) {
                    setViewProducts("");
                  } else {
                    setViewProducts(order._id);
                  }
                }}
                size="md"
                color="primary"
              >
                {viewProducts == order._id
                  ? "Hide order's products"
                  : "View order's products"}
              </Button>
            </div>
          </div>

          {viewProducts == order._id && (
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-7 mt-2">
              {order.cartItems.map((orderProduct) => (
                <CreatProductOrder
                  key={orderProduct._id}
                  product={orderProduct}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default MyOrders;
