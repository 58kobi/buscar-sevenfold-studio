export const busOptions = ['Normal', 'Business', 'VIP'] as const;
export type BusClass = typeof busOptions[number];
export const bookingAgentNumber = '254100505916';

export type BookingDetails = {
  from: string;
  to: string;
  date: string;
  returnDate: string;
  busClass: BusClass;
  name: string;
  phone: string;
  passengers: number;
  boarding: string;
  seats: number[];
};

export function availableBuses(_from: string, _to: string) {
  return busOptions;
}

export function bookingWhatsAppUrl(details: BookingDetails) {
  const message = [
    'Hello BUSCAR, please help me complete my booking and payment.',
    `Name: ${details.name.trim()}`,
    `Phone: ${details.phone.trim()}`,
    `Route: ${details.from} → ${details.to}`,
    `Travel date: ${details.date}`,
    `Trip: ${details.returnDate ? 'Round Trip' : 'One Way'}`,
    ...(details.returnDate ? [`Return date: ${details.returnDate}`] : []),
    `Bus class: ${details.busClass}`,
    `Passengers: ${details.passengers}`,
    ...(details.boarding.trim() ? [`Boarding: ${details.boarding.trim()}`] : []),
    ...(details.seats.length ? [`Preferred seats: ${details.seats.join(', ')}`] : []),
    'Please confirm the departure time, seats, fare and payment instructions.',
  ].join('\n');
  return `https://wa.me/${bookingAgentNumber}?text=${encodeURIComponent(message)}`;
}
export const seatRows = 10;
/** 40-seat layout (rows of 4); exactly 2 free seats per row so ~20 free seats span the whole bus. */
export function seatAvailability(key: string) {
  let h = 2166136261;
  for (const c of key) h = Math.imul(h ^ c.charCodeAt(0), 16777619) >>> 0;
  const rnd = () => ((h = (Math.imul(h, 1103515245) + 12345) >>> 0) / 4294967296);
  const free = new Set<number>();
  for (let r = 0; r < seatRows; r++) {
    const cols = [0, 1, 2, 3].sort(() => rnd() - 0.5).slice(0, 2);
    for (const c of cols) free.add(r * 4 + c + 1);
  }
  return free;
}
