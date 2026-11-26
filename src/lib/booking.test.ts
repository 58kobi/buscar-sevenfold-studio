import { describe, expect, it } from 'vitest';
import { routes } from './buscar';
import { availableBuses, bookingIntentWhatsAppUrl, bookingWhatsAppUrl, classFare, fareFor, seatAvailability, type BookingDetails } from './booking';

const details: BookingDetails = {
  from: 'NAIROBI', to: 'MOMBASA', date: '2026-12-03', returnDate: '',
  busClass: 'VIP', name: 'Melvin Test', phone: '0712345678', passengers: 2,
  boarding: 'Nairobi', seats: [3, 4],
};
describe('WhatsApp booking requests', () => {
  it('always leaves 20 free seats covering every row of the bus', () => {
    for (const key of ['a', 'NAIROBI-MOMBASA-2026-12-03-VIP', 'x']) {
      const free = seatAvailability(key);
      expect(free.size).toBe(20);
      for (let r = 0; r < 10; r++) expect([1, 2, 3, 4].some(c => free.has(r * 4 + c))).toBe(true);
    }
  });
  it('offers all bus classes on every directory route', () => {
    for (const [from, to] of routes) {
      expect(availableBuses(from, to)).toEqual(['Normal', 'Business', 'VIP']);
    }
    expect(availableBuses('NAIROBI', 'MOMBASA')).toEqual(['Normal', 'Business', 'VIP']);
  });
  it('addresses the assigned 0100505916 number in Kenyan international format', () => {
    expect(new URL(bookingWhatsAppUrl(details)).pathname).toBe('/254100505916');
  });
  it('includes customer and travel details for the agent', () => {
    const text = new URL(bookingWhatsAppUrl(details)).searchParams.get('text');
    for (const value of ['Melvin Test', '0712345678', 'NAIROBI → MOMBASA', '2026-12-03', 'VIP', 'Passengers: 2', 'Boarding: Nairobi', 'Preferred seats: 3, 4']) {
      expect(text).toContain(value);
    }
  });
  it('includes the return date for a round trip', () => {
    const text = new URL(bookingWhatsAppUrl({...details, returnDate: '2026-12-07'})).searchParams.get('text');
    expect(text).toContain('Trip: Round Trip');
    expect(text).toContain('Return date: 2026-12-07');
  });
  it('sends the site message icon to WhatsApp with a booking note', () => {
    const url = new URL(bookingIntentWhatsAppUrl());
    expect(url.pathname).toBe('/254100505916');
    expect(url.searchParams.get('text')).toBe('Hello BUSCAR, I want to book.');
  });
  it('sends the price the customer saw on the results page', () => {
    expect(new URL(bookingWhatsAppUrl(details)).searchParams.get('text')).toContain('Fare per passenger: KSh 3,500');
    expect(fareFor('NAIROBI', 'MOMBASA', 'Business')).toBe('KSh 2,500');
    expect(fareFor('SIAYA', 'NAIROBI', 'VIP')).toBe('KSh 3,500');
  });
  it('keeps the poster figures that price a seat class', () => {
    expect(fareFor('NAIROBI', 'KAMPALA', 'VIP')).toBe('KSh 5,000');
    expect(fareFor('KAMPALA', 'NAIROBI', 'Business')).toBe('KSh 2,600–4,600 (depending on seat class)');
  });
  it('prices search results at 1,500 Normal, 2,500 Business and 3,500 VIP', () => {
    expect(classFare('Normal')).toBe('KSh 1,500');
    expect(classFare('Business')).toBe('KSh 2,500');
    expect(classFare('VIP')).toBe('KSh 3,500');
  });
});
