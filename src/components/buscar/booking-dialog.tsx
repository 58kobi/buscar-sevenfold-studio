import { useMemo, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { bookingWhatsAppUrl, fareFor, seatAvailability, seatRows, type BusClass } from '@/lib/booking';

type Props = { from: string; to: string; date: string; returnDate: string; busClass: BusClass; onClose: () => void };

export function BookingDialog({from, to, date, returnDate, busClass, onClose}: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [travelDate, setTravelDate] = useState(date);
  const [returnTravelDate, setReturnTravelDate] = useState(returnDate);
  const [boarding, setBoarding] = useState('');
  const [seats, setSeats] = useState<number[]>([]);
  const free = useMemo(() => seatAvailability(`${from}-${to}-${travelDate}-${busClass}`), [from, to, travelDate, busClass]);
  const toggle = (n: number) => setSeats(s => s.includes(n) ? s.filter(x => x !== n) : s.length < passengers ? [...s, n].sort((a, b) => a - b) : [...s.slice(1), n].sort((a, b) => a - b));
  return <Dialog open onOpenChange={open => {if (!open) onClose();}}>
    <DialogContent className="booking-dialog">
      <DialogTitle>Book your journey</DialogTitle>
      <DialogDescription>{from} → {to} · {busClass}{fareFor(from, to, busClass) ? ` · ${fareFor(from, to, busClass)} per passenger` : ''}</DialogDescription>
      <form className="booking-request" onSubmit={event => {
        event.preventDefault();
        if (!name.trim() || !phone.trim()) return;
        window.location.assign(bookingWhatsAppUrl({from, to, date: travelDate, returnDate: returnTravelDate, busClass, name, phone, passengers, boarding, seats: seats.filter(n => free.has(n))}));
      }}>
        <div className="booking-request-grid">
          <label>Full name<input required autoComplete="name" maxLength={100} value={name} onChange={e => setName(e.target.value)} pattern=".*\S.*"/></label>
          <label>Phone number<input required type="tel" autoComplete="tel" pattern="\+?[0-9 ()-]{7,20}" value={phone} onChange={e => setPhone(e.target.value)}/></label>
          <label>Travel date<input required type="date" value={travelDate} onChange={e => setTravelDate(e.target.value)}/></label>
          <label>Passengers<input required type="number" min={1} step={1} value={passengers} onChange={e => setPassengers(Number(e.target.value))}/></label>
          <label>Return date (optional)<input type="date" min={travelDate} value={returnTravelDate} onChange={e => setReturnTravelDate(e.target.value)}/></label>
          <label>Boarding point (optional)<input maxLength={100} value={boarding} onChange={e => setBoarding(e.target.value)}/></label>
        </div>
        <fieldset className="seat-picker"><legend>Preferred seat (optional){seats.length ? `: ${seats.join(', ')}` : ''}</legend>
          <div className="seat-legend"><span className="seat free"/>Available<span className="seat taken"/>Booked<span className="seat picked"/>Selected</div>
          <div className="seat-map">{Array.from({length: seatRows * 4}, (_, i) => i + 1).map(n => {
            const ok = free.has(n), on = seats.includes(n);
            return <button key={n} type="button" disabled={!ok} aria-pressed={on} aria-label={`Seat ${n}${ok ? '' : ' booked'}`} className={`seat ${on ? 'picked' : ok ? 'free' : 'taken'}`} onClick={() => toggle(n)}>{n}</button>;
          })}</div>
        </fieldset>
        <p className="booking-confirmation-note">Your agent will confirm seats, departure time and fare on WhatsApp. No payment is taken here.</p>
        <Button type="submit" size="lg"><MessageCircle/>Proceed to Pay</Button>
      </form>
    </DialogContent>
  </Dialog>;
}