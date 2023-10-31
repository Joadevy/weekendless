import { PreferenceResponse } from "mercadopago/dist/clients/preference/commonTypes";
import { redirect } from "next/navigation";

import { setPayment } from "../../server/models/Reservation";

type searchparams = {
  preference_id: string;
  payment_id: string;
  status: string;
};

const getItemsOfPreference = async (preferenceId: string) => {
  const { items }: PreferenceResponse = await fetch(
    `https://api.mercadopago.com/checkout/preferences/${preferenceId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
      },
    },
  ).then((res) => res.json());

  return items;
};

const ErrorComponent = () => {
  return (
    <div>
      <h1>There was an error proccessing your reservation</h1>
      <p>Please, contact weekendless team</p>
    </div>
  );
};

const Page = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: searchparams;
}) => {
  if (!searchParams.preference_id || !searchParams.payment_id) {
    return redirect("/");
  }

  const { preference_id: preferenceId } = searchParams;
  const items = await getItemsOfPreference(preferenceId);

  if (!items || items.length === 0) return <ErrorComponent />;

  const reservationId = Number(items[0].id);
  const reservation = await setPayment(reservationId, {
    id: searchParams.payment_id,
    preferenceId: preferenceId,
  });

  if (!reservation) return <ErrorComponent />;

  return (
    <div>
      Reservation succesfully created, check the attendees email for more
      information!
    </div>
  );
};

export default Page;
