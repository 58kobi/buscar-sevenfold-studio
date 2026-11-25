import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, BusFront } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BookingDialog } from '@/components/buscar/booking-dialog';
import { availableBuses, type BusClass } from '@/lib/booking';
import busPhoto from '@/assets/gallery-bus-1.jpg.asset.json';

export const Route = createFileRoute('/search')({
  validateSearch: (s: Record<string, unknown>): { from: string; to: string; date: string; returnDate: string } => ({
    from: typeof s['from'] === 'string' ? s['from'].slice(0, 40) : 'NAIROBI',
    to: typeof s['to'] === 'string' ? s['to'].slice(0, 40) : 'MOMBASA',
    date: typeof s['date'] === 'string' ? s['date'].slice(0, 10) : '',
    returnDate: typeof s['returnDate'] === 'string' ? s['returnDate'].slice(0, 10) : '',
  }),
  head: () => ({ meta: [
    { title: 'Search Results — BUSCAR' },
    { name: 'description', content: 'Available BUSCAR buses for your chosen route and travel date.' },
    { property: 'og:title', content: 'Search Results — BUSCAR' },
    { property: 'og:description', content: 'Available BUSCAR buses for your chosen route and travel date.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' },
  ] }),
  component: SearchResults,
});

function SearchResults() {
  const { from, to, date, returnDate } = Route.useSearch();
  const [selected, setSelected] = useState<BusClass | null>(null);
  const buses = availableBuses(from, to);
  return <div className="results-page">
    <header className="results-bar"><div className="results-shell results-bar-inner">
      <Link to="/" aria-label="Back to home" className="results-back"><ArrowLeft/></Link>
      <span className="results-bus"><BusFront/></span>
      <div><strong>{from} - {to}</strong><small>{date}{returnDate ? ` · Return: ${returnDate}` : ''}</small></div>
    </div></header>
    <div className="results-shell">
      <div className="results-filters"><Button asChild><Link to="/">Modify Trip</Link></Button></div>
      <div className="results-meta"><h1>Search Results</h1><span>{buses.length} Found</span></div>
      <div className="bus-results">{buses.map(busClass => <article className="bus-result" key={busClass}>
        <img src={busPhoto.url} alt="BUSCAR coach" decoding="async"/>
        <div className="bus-result-details"><h2>BUSCAR · {busClass}</h2><p>{from} → {to}</p><small>{date}</small><span className="bus-available">Available</span></div>
        <div className="bus-result-action"><small>Fare &amp; departure confirmed by agent</small><Button onClick={() => setSelected(busClass)}>Book Now<ArrowRight/></Button></div>
      </article>)}</div>
    </div>
    {selected && <BookingDialog from={from} to={to} date={date} returnDate={returnDate} busClass={selected} onClose={() => setSelected(null)}/>}
  </div>;
}
