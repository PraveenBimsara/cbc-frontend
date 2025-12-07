import { TbTrash } from "react-icons/tb";
import getCart, { addToCart, removeFromCart } from "../../utils/cart";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [cartLoaded, setCartLoaded] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (cartLoaded == true) {
      const cart = getCart();
      setCart(cart);
      setCartLoaded(true);
    }
  }, [cartLoaded]);

  return (
    <div className="w-full h-full flex justify-center p-[40px]">
      <div className="w-[700px]">
        {cart.map((item, index) => {
          return (
            <div
              key={index}
              className="w-full h-[150px] flex justify-between items-center bg-white shadow-2xl my-[5px] relative"
            >
              <button
                onClick={() => {
                  removeFromCart(item.productId);
                  setCartLoaded(false);
                }}
                className="absolute right-[-50px] cursor-pointer bg-red-500 w-[40px] h-[40px] rounded-full text-white flex justify-center items-center shadow"
              >
                <TbTrash />
              </button>
              <img
                src={item.image}
                className="h-full aspect-square object-cover"
              />
              <div className="h-full max-w-[350px] w-[350px] overflow-hidden">
                <h1 className="text-xl font-bold">{item.name}</h1>
                <h2 className="text-lg text-gray-500">
                  {item.altNames.join(" | ")}
                </h2>
                <h2 className="text-lg text-gray-500">
                  LKR: {item.price.toFixed(2)}
                </h2>
              </div>
              <div className="h-full w-[100px] flex justify-center items-center">
                <h1 className="text-xl font-bold">{item.quantity}</h1>
              </div>
              <div className="h-full w-[100px] flex justify-center items-center">
                <button onClick={() => {
                    addToCart(item, -1);
                    setCartLoaded(false);
                }} className="text-2xl w-[30px] h-[30px] bg-black text-white rounded-full flex justify-center items-center cursor-pointer mx-[5px]">
                  -
                </button>
                <h1 className="text-xl">
                  {(item.price * item.quantity).toFixed(2)}
                </h1>
                <button onClick={() => {
                    addToCart(item, 1);
                    setCartLoaded(false);
                }} className="text-2xl w-[30px] h-[30px] bg-black text-white rounded-full flex justify-center items-center cursor-pointer mx-[5px]">
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
