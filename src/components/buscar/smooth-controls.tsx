import { memo, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Clock3, Menu, UserRound, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import hero1 from '@/assets/buscar-hero-1.jpg.asset.json';
import hero2 from '@/assets/buscar-hero-2.jpg.asset.json';

function useOutsideClose(open: boolean, close: () => void, ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    if (!open) return;
    const pointer = (event: PointerEvent) => {
      if (event.target instanceof Node && !ref.current?.contains(event.target)) close();
    };
    const key = (event: KeyboardEvent) => { if (event.key === 'Escape') close(); };
    document.addEventListener('pointerdown', pointer);
    document.addEventListener('keydown', key);
    return () => {
      document.removeEventListener('pointerdown', pointer);
      document.removeEventListener('keydown', key);
    };
  }, [open, close, ref]);
}

export const SectionMenu = memo(function SectionMenu({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClose(open, () => setOpen(false), ref);
  return <div className="section-menu-wrap" ref={ref}>
    <Button variant="secondary" size="icon" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="section-menu" onClick={() => setOpen(value => !value)}>{open ? <X/> : <Menu/>}</Button>
    <nav id="section-menu" className="menu-panel smooth-menu" data-open={open} inert={!open} aria-hidden={!open} aria-label="Section navigation">
      {[['about','About'],['gallery','Gallery'],['print-ticket','Print Ticket'],['support','Support'],['contact','Contact']].map(([id, label]) => <Button key={id} variant="ghost" onClick={() => { setOpen(false); onNavigate(id ?? 'search'); }}>{label}<ArrowUpRight className="ml-auto"/></Button>)}
    </nav>
  </div>;
});

export const AccountMenu = memo(function AccountMenu({ signedIn, onAccount, onAction, onSignOut }: { signedIn: boolean; onAccount: () => void; onAction: (label: string) => void; onSignOut: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClose(open, () => setOpen(false), ref);
  return <div className="user-wrap" ref={ref}>
    <Button variant="ghost" size="icon" className="user-btn" aria-label="Account" aria-expanded={open && signedIn} onClick={() => signedIn ? setOpen(value => !value) : onAccount()}><UserRound/></Button>
    <div className="user-menu smooth-menu" role="menu" data-open={open && signedIn} inert={!open || !signedIn} aria-hidden={!open || !signedIn}>
      {['Bookings','Wallet','My Account','Change Password'].map(label => <Button variant="ghost" key={label} role="menuitem" onClick={() => { setOpen(false); onAction(label); }}>{label}</Button>)}
      <hr/><Button variant="ghost" role="menuitem" className="logout" onClick={() => { setOpen(false); onSignOut(); }}>Logout</Button>
    </div>
  </div>;
});

export const JourneyClock = memo(function JourneyClock() {
  const [clock, setClock] = useState('');
  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString('en-GB', { timeZone: 'Africa/Nairobi', hour12: false }));
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);
  return <div className="clock-line"><Clock3/><span>Current Time: <strong>{clock || '—'}</strong></span><span className="timezone">Africa/Nairobi</span></div>;
});

export const JourneyHero = memo(function JourneyHero() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => {
      if (!document.hidden && window.matchMedia('(min-width: 1200px)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) setIndex(value => (value + 1) % 2);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);
  return <div className="wide-hero" aria-hidden="true">{[hero1, hero2].map((hero, i) => <img key={hero.url} src={hero.url} width={1653} height={350} alt="" className={i === index ? 'on' : ''} decoding="async" loading={i === 0 ? 'eager' : 'lazy'} fetchPriority={i === 0 ? 'high' : 'low'}/>)}</div>;
});