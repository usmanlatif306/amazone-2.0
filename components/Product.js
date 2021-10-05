import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useState } from "react";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";

const Max_Rating = 5;
const Min_Rating = 1;
const Product = ({ product }) => {
  const [rating] = useState(
    Math.floor(Math.random() * (Max_Rating - Min_Rating + 1)) + Min_Rating
  );
  const [hasPrime] = useState(Math.random() < 0.5);
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    dispatch(addToBasket({ ...product, proId: Date.now(), rating, hasPrime }));
  };
  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {product.category}
      </p>
      <Image src={product.image} height={200} width={200} objectFit="contain" />
      <h4 className="my-3">{product.title}</h4>
      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, idx) => (
            <StarIcon key={idx} className="h-5 text-yellow-500" />
          ))}
      </div>
      <p className="text-xs my-2 line-clamp-2">{product.description}</p>
      <div className="mb-5">
        <Currency quantity={product.price} />
      </div>

      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img
            src="https://links.papareact.com/fdw"
            alt="Prime"
            className="w-12"
          />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}
      <button
        onClick={addItemToBasket}
        className="w-full button mt-auto focus:outline-none"
      >
        Add To Cart
      </button>
    </div>
  );
};

export default Product;
