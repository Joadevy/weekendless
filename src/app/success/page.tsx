type searchparams = {
  preference_id: string;
  payment_id: string;
  status: string;
};
import { PreferenceResponse } from "mercadopago/dist/clients/preference/commonTypes";
import { redirect } from "next/navigation";

import { setPayment } from "../../server/models/Reservation";

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
  const { items }: PreferenceResponse = await fetch(
    `https://api.mercadopago.com/checkout/preferences/${preferenceId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
      },
    },
  ).then((res) => res.json());

  if (!items) {
    return redirect("/");
  }

  const reservationId = Number(items[0].id);

  const reservation = await setPayment(reservationId, {
    id: searchParams.payment_id,
    preferenceId: preferenceId,
  });

  if (!reservation) {
    return (
      <div>
        <h1>There was an error proccessing your reservation</h1>
        <p>Please, contact weekendless team</p>
      </div>
    );
  }

  return (
    <div>
      Reservation succesfully created, check the attendees email for more
      information!
    </div>
  );
};

export default Page;
