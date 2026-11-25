import logo from '@/assets/buscar-logo.png.asset.json';
import travler from '@/assets/travler-logo.png.asset.json';
import { Luggage, Play, Apple } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Brand({ compact = false }: { compact?: boolean }) {
  return <div className={`brand ${compact ? 'brand-compact' : ''}`}><img src={logo.url} alt="BUSCAR logo" className="eagle"/><div><span className="wordmark">BUSCAR</span><span className="tagline">EAGLE ABOVE THE REST</span></div></div>;
}
export function Travler({ large = false }: { large?: boolean }) {
  return <img src={travler.url} alt="Travler" className={`travler-img ${large ? 'travler-img-large' : ''}`}/>;
}
export function StoreBadge({ apple = false, onClick }: { apple?: boolean; onClick: () => void }) {
  const Icon = apple ? Apple : Play;
  return <Button variant="store" className="store-badge" onClick={onClick}><Icon/><span><small>{apple ? 'Download on the' : 'GET IT ON'}</small><strong>{apple ? 'App Store' : 'Google Play'}</strong></span></Button>;
}
export function Phone({ small = false }: { small?: boolean }) {
  return <div className={`phone ${small ? 'phone-small' : ''}`} aria-label="Travler mobile app preview"><div className="phone-notch"/><div className="phone-screen"><Travler large/><span>Your journey. One tap away.</span><div className="phone-line"/><div className="phone-line short"/><div className="phone-action"><Luggage/> Let’s go somewhere</div></div></div>;
}
