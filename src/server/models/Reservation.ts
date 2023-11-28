import { Payment, User, type Reservation, Prisma } from "@prisma/client";

import { db } from "../db";
import handleSendEmail, { compileWelcomeTemplate } from "../email/nodemail";

import { setReservation } from "./Seats";

export async function getReservations(): Promise<Reservation[] | null> {
  try {
    const reservations = await db.reservation.findMany();

    return reservations;
  } catch (error) {
    console.error(error);

    return null;
  }
}

export async function create(
  reservation: Pick<Reservation, "seatId" | "userId" | "attendeeNationalID">,
): Promise<Reservation | null> {
  try {
    const newReservation = await db.reservation.create({
      data: reservation,
    });

    await setReservation(reservation.seatId, newReservation.id);

    return newReservation;
  } catch (error) {
    console.error(error);

    return null;
  }
}

const havePaymentWithId = async (reservationId: number, paymentId: string) => {
  const reservation = await db.reservation.findUnique({
    where: {
      id: reservationId,
    },
    select: {
      payment: {
        where: {
          id: paymentId,
        },
      },
    },
  });

  return reservation;
};

export const setPayment = async (
  reservationId: Reservation["id"],
  payment: Pick<Payment, "preferenceId" | "id">,
) => {
  const fetchPayment = fetch(
    `https://api.mercadopago.com/v1/payments/${payment.id}`,
    {
      headers: {
        Authorization: "Bearer " + process.env.MP_ACCESS_TOKEN,
      },
    },
  ).then((res) => res.json());

  const fetchReservation = havePaymentWithId(reservationId, payment.id);

  const [existsPayment, reservation] = await Promise.all([
    fetchPayment,
    fetchReservation,
  ]);

  if (existsPayment.status !== "approved") {
    return null;
  }

  if (reservation?.payment) {
    return reservation;
  }

  try {
    const Reservation = await db.reservation.update({
      where: { id: reservationId },
      data: { payment: { create: payment } },
      select: {
        payment: true,
        attendee: {
          select: {
            name: true,
            email: true,
          },
        },
        seatId: true,
        userId: true,
        seat: {
          select: {
            number: true,
            type: true,
            event: {
              select: {
                name: true,
                date: true,
                venue: {
                  select: {
                    name: true,
                    address: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    try {
      await handleSendEmail(
        Reservation.attendee.email,
        `Weekendless™ - New reservation on ${Reservation.seat.event.name}`,

        compileWelcomeTemplate(
          Reservation.attendee.name,
          Reservation.seat.event.name,
          new Date(Reservation.seat.event.date).toLocaleDateString("en-US"),
          Reservation.seat.event.venue.name,
          Reservation.seat.event.venue.address,
          Reservation.seat.number.toString(),
          Reservation.seat.type.description,
          Reservation.seat.type.price.toString(),
        ),
      );
    } catch (error) {
      console.error(error);
    }

    return Reservation;
  } catch (error) {
    console.error(error);

    return null;
  }
};

export type ReservationsFullInfo = Prisma.ReservationGetPayload<{
  include: {
    payment: true;
    attendee: {
      select: {
        name: true;
        nationalID: true;
        email: true;
      };
    };
    seat: {
      select: {
        number: true;
        type: true;
        event: {
          select: {
            id: true;
            name: true;
            date: true;
            venue: {
              select: {
                name: true;
                address: true;
                city: {
                  select: {
                    name: true;
                    country: {
                      select: {
                        name: true;
                      };
                    };
                  };
                };
              };
            };
          };
        };
      };
    };
  };
}>;

export const getReservationOfUser = async (
  email: User["email"],
): Promise<ReservationsFullInfo[]> => {
  try {
    const userId = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });

    if (!userId) {
      return [];
    }

    const reservations = await db.reservation.findMany({
      where: {
        userId: userId.id,
        payment: {
          isNot: null,
        },
        seat: {
          event: {
            date: {
              gte: new Date(),
            },
          },
        },
      },
      orderBy: {
        seat: {
          event: {
            date: "asc",
          },
        },
      },
      include: {
        payment: true,
        attendee: {
          select: {
            name: true,
            email: true,
            nationalID: true,
          },
        },
        seat: {
          select: {
            number: true,
            type: true,
            event: {
              select: {
                name: true,
                id: true,
                date: true,
                venue: {
                  select: {
                    name: true,
                    address: true,
                    city: {
                      select: {
                        name: true,
                        country: {
                          select: {
                            name: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    return reservations;
  } catch (error) {
    console.error(error);

    return [];
  }
};
