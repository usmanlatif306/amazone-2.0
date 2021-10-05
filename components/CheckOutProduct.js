import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";
const CheckOutProduct = ({ product }) => {
  // console.log(product);
  const dispatch = useDispatch();

  //   Add Item to Basket
  const addItemToBasket = () => {
    dispatch(addToBasket({ ...product, proId: Date.now() }));
  };

  //   Remove Item from basket
  const removeItemToBasket = () => {
    dispatch(removeFromBasket(product.proId));
  };
  return (
    <div className="grid grid-cols-5">
      <Image src={product.image} width={200} height={200} objectFit="contain" />
      <div className="col-span-3 mx-5">
        <p>{product.title}</p>
        <div className="flex">
          {Array(product.rating)
            .fill()
            .map((_, idx) => (
              <StarIcon key={idx} className="h-5 text-yellow-500" />
            ))}
        </div>
        <p className="text-xs my-2 line-clamp-3">{product.description}</p>

        <Currency quantity={product.price} />
        {product.hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              src="https://links.papareact.com/fdw"
              alt="Prime"
              className="w-12"
            />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}
      </div>

      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button className="button" onClick={addItemToBasket}>
          Add to Basket
        </button>
        <button className="button" onClick={removeItemToBasket}>
          Remove from Basket
        </button>
      </div>
    </div>
  );
};

export default CheckOutProduct;
