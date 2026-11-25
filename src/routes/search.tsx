import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowLeft, BusFront, MapPin, Clock3, Star, ChevronDown } from 'lucide-react';

export const Route = createFileRoute('/search')({
  validateSearch: (s: Record<string, unknown>): { from: string; to: string; date: string } => ({
    from: typeof s['from'] === 'string' ? s['from'].slice(0, 40) : 'NAIROBI',
    to: typeof s['to'] === 'string' ? s['to'].slice(0, 40) : 'MOMBASA',
    date: typeof s['date'] === 'string' ? s['date'].slice(0, 10) : '',
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
  const { from, to, date } = Route.useSearch();
  const filters = [{ label: 'Boarding', icon: MapPin }, { label: 'Dropping', icon: MapPin }, { label: 'Departure', icon: Clock3 }, { label: 'Amenities', icon: Star }];
  return <div className="results-page">
    <header className="results-bar"><div className="results-shell results-bar-inner">
      <Link to="/" aria-label="Back to home" className="results-back"><ArrowLeft/></Link>
      <span className="results-bus"><BusFront/></span>
      <div><strong>{from} - {to}</strong><small>{date}</small></div>
    </div></header>
    <div className="results-shell">
      <div className="results-filters"><Link to="/" className="results-modify">Modify Trip</Link>{filters.map(f => <button key={f.label} type="button" className="results-chip"><span><f.icon/></span>{f.label}<ChevronDown/></button>)}</div>
      <div className="results-meta"><span>Search Result</span><span>0 Found</span></div>
      <div className="results-empty"><BusFront/><h1>No Buses Found</h1><p>We couldn't find any buses matching your criteria.</p><Link to="/" className="results-retry">Modify Search</Link></div>
    </div>
  </div>;
}
