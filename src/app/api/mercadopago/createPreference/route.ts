import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://weekendless.vercel.app/",
  "https://weekendless.vercel.app",
];

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin") ?? "";

  if (!allowedOrigins.includes(origin)) {
    return NextResponse.error();
  }

  corsHeaders["Access-Control-Allow-Origin"] = origin;

  return NextResponse.json({}, { headers: corsHeaders });
}

type TPreference = {
  id: string;
  title: string;
  unit_price: number;
  quantity: number;
};

export async function POST(req: Request) {
  const preferenceInput: TPreference = await req.json();

  const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN!,
  });

  const preference = new Preference(client);

  const data = await preference
    .create({
      body: {
        items: [
          {
            id: preferenceInput.id,
            title: preferenceInput.title,
            quantity: Number(preferenceInput.quantity),
            unit_price: Number(preferenceInput.unit_price),
          },
        ],
        auto_return: "approved",
        back_urls: {
          success: "http://localhost:3000/success",
        },
      },
    })
    .catch((error) => {
      console.error(error);
    });

  return NextResponse.json(data, { headers: corsHeaders });
}
