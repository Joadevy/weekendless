const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getEvents = async () => {
  const events = await fetch(`${baseUrl}/events`).then((res) => res.json());
  return events;
};
