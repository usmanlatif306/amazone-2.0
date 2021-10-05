import moment from "moment";
import Currency from "react-currency-formatter";

function Order({ order }) {
  return (
    <div className="relative border rounded-md">
      <div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
        <div className="">
          <p className="font-bold text-sm">ORDER PLACED</p>
          <p>{moment.unix(order.timestamp).format("DD MMM YYYY")}</p>
        </div>
        <div>
          <p className="font-bold text-sm">TOTAL</p>
          <p>
            <Currency quantity={order.amount} /> - Next Day Delivery{" "}
            <Currency quantity={order.amountShipping} />
          </p>
        </div>
        <p className="text-sm whitespace-nowrap sm:text-xl flex-1 self-end text-right text-blue-500">
          {order.items.length} Items
        </p>
        <p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-sm whitespace-nowrap">
          ORDER # {order.id}
        </p>
      </div>

      <div className="p-5 sm:p-10">
        <div className="flex space-x-6 overflow-x-auto">
          {order.images.map((image) => (
            <img
              src={image}
              alt="Order Image"
              className="h-20 object-contain sm:h-32"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Order;
