import Header from "../components/Header";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectItems, selectTotal } from "../slices/basketSlice";
import CheckOutProduct from "../components/CheckOutProduct";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/client";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
const stripePromise = loadStripe(process.env.stripe_public_key);

const Checkout = () => {
  const [session] = useSession();
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items,
      email: session.user.email,
    });

    // Redisrect user to stripe checkout page
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) alert(result.error.message);
    // whsec_88ztpZRzhXEtVj5PP3Nikt3GbwtwBmx4
  };
  return (
    <div className="bg-gray-100">
      <Header />

      <main className="lg:flex max-w-[1200px] mx-auto">
        {/* Left */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
          />
          <div className="flex flex-col space-y-10 p-5 bg-white">
            <h1 className="border-b pb-4 text-3xl">
              {items.length === 0 ? "Your Basket is Empty" : "Shopping Basket"}
            </h1>
            {items.map((product) => (
              <CheckOutProduct key={product.proId} product={product} />
            ))}
          </div>
        </div>
        {/* Right */}
        {items.length > 0 && (
          <div className="flex flex-col bg-white p-10 shadow-md">
            <h2 className="whitespace-nowrap">
              Subtotal ({items.length} items):{" "}
              <span className="font-bold">
                <Currency quantity={total} />
              </span>
            </h2>
            <button
              role="link"
              onClick={createCheckoutSession}
              disabled={!session}
              className={`button mt-2 ${
                !session &&
                "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
              }`}
            >
              {!session ? "Sign in to Checkout" : "Proceed to Checkout"}
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Checkout;
