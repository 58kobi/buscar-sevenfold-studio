export const routes = [
  ['BOMET','NAIROBI'], ['BONDO','NAIROBI'], ['BUNGOMA','MOMBASA'], ['BUSIA','MOMBASA'], ['BUSIA','NAIROBI'], ['CHUKA','NAIROBI'], ['SIAYA','NAIROBI'], ['ELDORET','MOMBASA'], ['ELDORET','NAIROBI'], ['ELDORET','KAMPALA'], ['EMBU','NAIROBI'], ['HOMA BAY','NAIROBI'], ['ISIOLO','NAIROBI'], ['KAKAMEGA','MOMBASA'], ['GEDE','MTITO ANDEI'], ['KAKAMEGA','NAIROBI'], ['KAMPALA','NAIROBI'], ['KATHWANA','NAIROBI'], ['KEHANCHA','NAIROBI'], ['KENDU BAY','NAIROBI'], ['KERICHO','NAIROBI'], ['KILIFI','NAIROBI'], ['KISII','MOMBASA'], ['KISII','NAIROBI'], ['KISUMU','MOMBASA'], ['KISUMU','NAIROBI'], ['KITALE','MOMBASA'], ['KITALE','NAIROBI'], ['MOMBASA','VOI'], ['VOI','MOMBASA'], ['VOI','NAIROBI'], ['NAIROBI','VOI'],
] as const;
export const destinations = [...new Set(routes.flat())].sort();
export function filterRoutes(query: string) {
  const words = query.trim().toUpperCase().split(/\s+/);
  return routes.filter(route => words.every(word => route.join(' – ').includes(word)));
}
export function nairobiDate(now: Date): Date {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Nairobi', year: 'numeric', month: 'numeric', day: 'numeric' }).formatToParts(now);
  const value = (type: string) => Number(parts.find(part => part.type === type)?.value);
  return new Date(value('year'), value('month') - 1, value('day'));
}
export const faqs = [
  ['How do I book a ticket online?', 'Select your origin, destination, and travel date in the search engine above. Choose your preferred departure, pick your seats on the interactive seat plan, and confirm your details. You will instantly receive a pre-formatted reservation sent directly to WhatsApp where an agent verifies and completes your ticket booking.'],
  ['What is the cancellation or refund policy?', 'Cancellation and refund terms depend on your ticket. Please confirm the applicable policy with a Buscar agent before completing your booking.'],
  ['How much luggage can I bring with me?', 'Luggage allowances depend on your journey and ticket class. Confirm your allowance with a Buscar agent, especially for extra or oversized bags.'],
  ['Where are Buscar offices and pickup points located?', 'Pickup points vary by route. Confirm your departure office and boarding location with a Buscar agent before you travel.'],
  ['What is the difference between Normal, Business and VIP classes?', 'Classes offer different seating and onboard comfort options. Check the available amenities for your preferred bus before booking.'],
] as const;
