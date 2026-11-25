import { Luggage, Play, Apple } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Brand({ compact = false }: { compact?: boolean }) {
  return <div className={`brand ${compact ? 'brand-compact' : ''}`}><svg viewBox="0 0 48 48" aria-hidden="true" className="eagle"><path fill="currentColor" d="M24 8 19 17 3 11 8 23 18 28 15 38 24 33 33 38 30 28 40 23 45 11 29 17Z"/><path fill="var(--background)" d="m24 18-3 5 3 5 3-5 5-2-5-1Z"/></svg><div><span className="wordmark">BUSCAR</span><span className="tagline">EAGLE ABOVE THE REST</span></div></div>;
}
export function Travler({ large = false }: { large?: boolean }) {
  return <span className={`travler ${large ? 'travler-large' : ''}`}><Luggage aria-hidden="true"/><span>Travler<span className="travler-dot">.</span></span></span>;
}
export function StoreBadge({ apple = false, onClick }: { apple?: boolean; onClick: () => void }) {
  const Icon = apple ? Apple : Play;
  return <Button variant="store" className="store-badge" onClick={onClick}><Icon/><span><small>{apple ? 'Download on the' : 'GET IT ON'}</small><strong>{apple ? 'App Store' : 'Google Play'}</strong></span></Button>;
}
export function Phone({ small = false }: { small?: boolean }) {
  return <div className={`phone ${small ? 'phone-small' : ''}`} aria-label="Travler mobile app preview"><div className="phone-notch"/><div className="phone-screen"><Travler large/><span>Your journey. One tap away.</span><div className="phone-line"/><div className="phone-line short"/><div className="phone-action"><Luggage/> Let’s go somewhere</div></div></div>;
}
