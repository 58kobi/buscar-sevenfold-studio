import logo from '@/assets/buscar-logo.png.asset.json';
import travler from '@/assets/travler-logo.png.asset.json';
import playBadge from '@/assets/google-play-badge.png.asset.json';
import appStoreBadge from '@/assets/app-store-badge.svg.asset.json';
import { Luggage } from 'lucide-react';

export function Brand({ compact = false }: { compact?: boolean }) {
  return <div className={`brand ${compact ? 'brand-compact' : ''}`}><img decoding="async" src={logo.url} alt="BUSCAR logo" className="eagle"/><div><span className="wordmark">BUSCAR</span><span className="tagline">EAGLE ABOVE THE REST</span></div></div>;
}
export function Travler({ large = false }: { large?: boolean }) {
  return <img decoding="async" src={travler.url} alt="Travler" className={`travler-img ${large ? 'travler-img-large' : ''}`}/>;
}
export function StoreBadge({ apple = false }: { apple?: boolean }) {
  const badge = apple ? appStoreBadge : playBadge;
  return <img decoding="async" loading="lazy" src={badge.url} alt={apple ? 'Download on the App Store' : 'Get it on Google Play'} className="store-badge-img"/>;
}
export function Phone({ small = false }: { small?: boolean }) {
  return <div className={`phone ${small ? 'phone-small' : ''}`} aria-label="Travler mobile app preview"><div className="phone-notch"/><div className="phone-screen"><Travler large/><span>Your journey. One tap away.</span><div className="phone-line"/><div className="phone-line short"/><div className="phone-action"><Luggage/> Let’s go somewhere</div></div></div>;
}
