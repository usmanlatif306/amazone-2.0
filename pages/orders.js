import { getSession, useSession } from "next-auth/client";
import Header from "../components/Header";
import db from "../firebase";
import moment from "moment";
import Order from "../components/Order";

function orders({ orders }) {
  console.log(orders);
  const [session] = useSession();
  return (
    <div>
      <Header />

      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b border-yellow-400 mb-2 pb-2">
          Your Orders
        </h1>
        {session ? (
          <h1>{orders.length} Orders</h1>
        ) : (
          <h2>Please sign in to see your orders</h2>
        )}
        {session && (
          <div className="space-y-4 mt-5">
            {orders.map((order) => (
              <Order key={order.id} order={order} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default orders;

export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  //   get the user logged in orders
  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
    };
  }

  //   firebase Db
  const stripeOrders = await db
    .collection("users")
    .doc(session.user.email)
    .collection("orders")
    .orderBy("timestamp", "desc")
    .get();

  // stripe orders
  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );

  return {
    props: {
      orders,
    },
  };
}
