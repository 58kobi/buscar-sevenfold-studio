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
  dropping: string;
  notes: string;
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
    ...(details.dropping.trim() ? [`Dropping: ${details.dropping.trim()}`] : []),
    ...(details.notes.trim() ? [`Notes: ${details.notes.trim()}`] : []),
    'Please confirm the departure time, seats, fare and payment instructions.',
  ].join('\n');
  return `https://wa.me/${bookingAgentNumber}?text=${encodeURIComponent(message)}`;
}