import { PreferenceResponse } from "mercadopago/dist/clients/preference/commonTypes";
import { redirect } from "next/navigation";
import Image from "next/image";

import { setPayment } from "../../server/models/Reservation";
import Confeti from "../../components/Confetti/Confetti";
import Wimage from "../../public/Warwick_W_logo (1).png";

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
    <>
      <div className="pt-14 flex flex-col items-center">
        <h1 className="text-lg font-bold text-center">
          We&apos;re sorry, there was an error proccessing your reservation...
        </h1>
        <div>
          <p className="text-center italic">
            Please, we&apos;ll be happy if you report it to the weekendless team
            at:
          </p>
          <ul>
            <li className=" list-disc">
              <a href="https://twitter.com/JoaquinArlettaz">Twitter / X</a>
            </li>
            <li className=" list-disc">
              <a href="https://www.linkedin.com/in/joaqu%C3%ADn-arlettaz/">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
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

  if (!reservation) {
    return <ErrorComponent />;
  }

  return (
    <>
      <Confeti />
      <div className="flex flex-col gap-2 items-center justify-center min-h-screen border text-center">
        <div className="h-full w-full border absolute opacity-5">
          <Image fill alt="" className="w-full" sizes="50vw" src={Wimage} />
        </div>
        <h1 className="text-3xl lg:text-5xl font-bold">
          Reservation in place... the only thing left is to enjoy!
        </h1>
        <p className="text-lg font-normal">
          Check the attendee&apos;s email for more information about the ticket
        </p>
      </div>
    </>
  );
};

export default Page;
