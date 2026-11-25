import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState, type ReactNode } from 'react';
import { ArrowRight, ArrowLeft, ArrowUpRight, BusFront, MapPin, Wifi, PlugZap, Armchair, Wallet, Route as RouteIcon, Coins, Package, ShieldCheck, Clock3, Search, ChevronDown, Menu, X, Home, Printer, CircleHelp, UserRound, MessageCircle, Facebook, Linkedin, Smartphone, Headphones } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { toast, Toaster } from 'sonner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Brand, Travler, Phone, StoreBadge } from '@/components/buscar/brand';
import hero1 from '@/assets/buscar-hero-1.jpg.asset.json';
import hero2 from '@/assets/buscar-hero-2.jpg.asset.json';
import { AccountDialog } from '@/components/buscar/account-dialog';
import { DateField } from '@/components/buscar/date-field';
import { destinations, routes, faqs, filterRoutes, nairobiDate } from '@/lib/buscar';
import coast from '@/assets/buscar-banner.png.asset.json';
import bus1 from '@/assets/gallery-bus-1.jpg.asset.json';
import bus2 from '@/assets/gallery-bus-2.jpg.asset.json';
import bus3 from '@/assets/gallery-bus-3.jpg.asset.json';
import bus4 from '@/assets/gallery-bus-4.jpg.asset.json';
import bus5 from '@/assets/gallery-bus-5.jpg.asset.json';
import bus6 from '@/assets/gallery-bus-6.jpg.asset.json';
import bus7 from '@/assets/gallery-bus-7.jpg.asset.json';
import bus8 from '@/assets/gallery-bus-8.jpg.asset.json';

const galleryPhotos = [bus1, bus2, bus3, bus4, bus5, bus6, bus7, bus8];

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    {title:'BUSCAR — Bus Travel in Kenya | Eagle Above the Rest'},
    {name:'description',content:'Plan your journey with BUSCAR. Explore our routes across Kenya, onboard amenities, and travel information.'},
    {property:'og:title',content:'BUSCAR — Eagle Above the Rest'},
    {property:'og:description',content:'Your next stop, made simple. Discover BUSCAR routes, comfortable buses, and travel information.'},
    {property:'og:type',content:'website'}, {name:'twitter:card',content:'summary_large_image'},
  ] }),
  component: Index,
});
function scrollToSection(id: string) { document.getElementById(id)?.scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'}); }
function SectionHead({ title, subtitle, icon }: {title:string; subtitle:string; icon?:ReactNode}) {
  return <div className="section-head"><h2>{icon}{title}</h2><p>{subtitle}</p></div>;
}
const reasons = [
  {title:'Save',text:'Pay less when using our new Mobile App. You can save up to 25% of your Promo Cash balance in a single purchase.',icon:Wallet,tone:''},
  {title:'Multiple Routes',text:'We cover multiple routes and the widest connectivity in Kenya.',icon:RouteIcon,tone:'tone-blue'},
  {title:'Earn Credits',text:'Receive more credit during promotional periods which will be added into your Promo Cash account.',icon:Coins,tone:'tone-mint'},
  {title:'Parcel Delivery',text:'We Deliver parcels in all major towns in the country.',icon:Package,tone:'tone-gold'},
  {title:'Comfortable Buses',text:'Settle in and enjoy a comfortable journey, wherever you’re headed.',icon:BusFront,tone:'tone-blue'},
  {title:'Pickup Points',text:'Find a convenient boarding point along your chosen route.',icon:MapPin,tone:''},
];
const modalDetails: Record<string, {title:string; description:string; text:string}> = {
  account: {title:'Your BUSCAR account',description:'A little closer to your next journey.',text:'Account sign-in, your journeys, and Promo Cash will be available when online booking launches.'},
  contact: {title:'Get in touch',description:'We’re here for your journey.',text:'Contact and WhatsApp details will be added here soon. In the meantime, visit our FAQ for general travel information.'},
  terms: {title:'Terms',description:'Travel and booking terms.',text:'Complete booking terms will be published before online reservations become available. Confirm any journey-specific terms with a Buscar agent.'},
  privacy: {title:'Privacy Policy',description:'Your privacy matters.',text:'This preview does not collect booking or account information. The full privacy policy will be published before these services are available.'},
  app: {title:'The BUSCAR app',description:'Your next journey, in your pocket.',text:'Official app store links will be added here soon. Downloads are not available from this preview.'},
  social: {title:'Stay connected',description:'Follow the journey.',text:'Official BUSCAR social media links will be added here soon.'},
};
function Index() {
  const [from,setFrom] = useState('NAIROBI');
  const [to,setTo] = useState('MOMBASA');
  const [roundTrip,setRoundTrip] = useState(false);
  const [today,setToday] = useState<Date>();
  const [date,setDate] = useState<Date>();
  const [returnDate,setReturnDate] = useState<Date>();
  const [clock,setClock] = useState('');
  const [query,setQuery] = useState('');
  const [ticketNumber,setTicketNumber] = useState('');
  const [mobileNumber,setMobileNumber] = useState('');
  const [expanded,setExpanded] = useState(false);
  const [menuOpen,setMenuOpen] = useState(false);
  const [modal,setModal] = useState<string | null>(null);
  const [slide,setSlide] = useState(0);
  const [carouselRef,carouselApi] = useEmblaCarousel({loop:true});
  useEffect(() => {
    const now = new Date();
    const localDate = nairobiDate(now);
    setToday(localDate); setDate(localDate);
    const tick = () => { const current = new Date(); setClock(current.toLocaleTimeString('en-GB',{timeZone:'Africa/Nairobi',hour12:false})); setToday(nairobiDate(current)); };
    tick(); const interval = window.setInterval(tick,1000); return () => window.clearInterval(interval);
  },[]);
  useEffect(() => {
    if (!carouselApi) return;
    const onSelect = () => setSlide(carouselApi.selectedScrollSnap());
    carouselApi.on('select',onSelect);
    return () => {carouselApi.off('select',onSelect);};
  },[carouselApi]);
  const filtered = filterRoutes(query);
  const visible = expanded || query ? filtered : filtered.slice(0,16);
  const chooseRoute = (origin:string,destination:string) => {setFrom(origin);setTo(destination);scrollToSection('search');};
  const navigate = (id:string) => {setMenuOpen(false);scrollToSection(id);};
  const [accountOpen,setAccountOpen] = useState(false);
  const [signedIn,setSignedIn] = useState(false);
  const [userMenu,setUserMenu] = useState(false);
  const [heroIdx,setHeroIdx] = useState(0);
  useEffect(() => {const t = setInterval(() => setHeroIdx(i => (i+1)%2),5000);return () => clearInterval(t);},[]);
  const soon = (label:string) => {setUserMenu(false);toast(`${label} is coming soon`);};
  const details = modal ? modalDetails[modal] : undefined;
  const navigation = [
    {label:'Home',icon:Home,action:() => navigate('search'),active:true},
    {label:'Print Ticket',icon:Printer,action:() => navigate('print-ticket'),active:false},
    {label:'Help',icon:CircleHelp,action:() => navigate('faq'),active:false},
    {label:'Account',icon:UserRound,action:() => setAccountOpen(true),active:false},
  ];
  return <>
    <Toaster position="top-center" richColors/>
    <header className="site-header"><div className="container-shell header-inner"><Brand/><nav className="desktop-nav" aria-label="Main navigation">{navigation.map(item => <Button key={item.label} variant="ghost" className={item.active ? 'active' : ''} onClick={item.action}>{item.label}</Button>)}</nav><nav className="wide-nav" aria-label="Main navigation">{[['search','Home'],['about','About'],['print-ticket','Print Ticket'],['contact','Contact Us'],['gallery','Gallery']].map(([id,label]) => <button key={id} type="button" onClick={() => navigate(id ?? 'search')}>{label}</button>)}</nav><div className="wide-tools"><span className="flag" aria-label="English">🇬🇧</span><button type="button" className="support" onClick={() => navigate('faq')}><CircleHelp/>Support</button><div className="user-wrap"><button type="button" className="user-btn" aria-label="Account" aria-expanded={userMenu} onClick={() => signedIn ? setUserMenu(!userMenu) : setAccountOpen(true)}><UserRound/></button>{signedIn && userMenu && <div className="user-menu" role="menu">{['Bookings','Wallet','My Account','Change Password'].map(l => <button key={l} type="button" role="menuitem" onClick={() => soon(l)}>{l}</button>)}<hr/><button type="button" role="menuitem" className="logout" onClick={() => {setSignedIn(false);setUserMenu(false);}}>Logout</button></div>}</div></div><div className="header-tools"><select className="language" aria-label="Language and region" defaultValue="ke"><option value="ke">🇰🇪 EN</option><option value="gb">🇬🇧 EN</option></select><Button variant="secondary" size="icon" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</Button></div></div>{menuOpen && <nav className="menu-panel" aria-label="Section navigation">{[['search','Search'],['amenities','Amenities'],['why-us','Why Us'],['about','About'],['print-ticket','Print Ticket'],['gallery','Gallery'],['routes','Routes'],['faq','FAQ'],['contact','Contact']].map(([id,label]) => <Button key={id} variant="ghost" onClick={() => navigate(id ?? 'search')}>{label}<ArrowUpRight className="ml-auto"/></Button>)}</nav>}</header>
    <main>
      <div className="wide-hero" aria-hidden="true">{[hero1,hero2].map((h,i) => <img key={h.url} src={h.url} alt="" className={i===heroIdx ? 'on' : ''}/>)}</div>
      <section id="search" className="search-section"><div className="container-shell"><div className="intro"><div><div className="section-eyebrow">The journey starts here</div><h1>Bus travel. <span>Made simple.</span></h1><p>Wherever life takes you, travel above the rest.</p></div><div className="intro-note"><ShieldCheck/> Your journey. Our commitment.</div></div><form className="search-card" onSubmit={event => {event.preventDefault();toast('Your next journey is coming soon',{description:`${from} → ${to}. Online bus search and booking will be available soon.`});}}><div className="search-card-top"><div className="trip-options"><label><input type="radio" name="trip" checked={!roundTrip} onChange={() => setRoundTrip(false)}/>One Way</label><label><input type="radio" name="trip" checked={roundTrip} onChange={() => setRoundTrip(true)}/>Round Trip</label></div><div className="booking-powered">Book your next ticket using <Travler/></div></div><div className={`search-fields ${roundTrip ? 'round-trip' : ''}`}><label className="booking-field"><span className="field-label">FROM</span><span className="field-value"><BusFront/><select aria-label="From" value={from} onChange={event => setFrom(event.target.value)}>{destinations.map(city => <option key={city}>{city}</option>)}</select></span></label><label className="booking-field"><span className="field-label">TO</span><span className="field-value"><MapPin/><select aria-label="To" value={to} onChange={event => setTo(event.target.value)}>{destinations.map(city => <option key={city}>{city}</option>)}</select></span></label><DateField label="TRAVEL DATE" date={date} today={today} onChange={setDate}/>{roundTrip && <DateField label="RETURN DATE" date={returnDate} today={today} onChange={setReturnDate}/>}<Button type="submit" className="search-button"><Search/>SEARCH BUS<ArrowRight/></Button></div><div className="clock-line"><Clock3/><span>Current Time: <strong>{clock || '—'}</strong></span><span className="timezone">Africa/Nairobi</span></div></form></div></section>
      <section id="amenities" className="amenities-section"><div className="container-shell"><SectionHead title="Amenities" subtitle="Recognized and trusted across Kenya"/><div className="amenities-grid">{[{title:'Free Wi-Fi',sub:'Stay connected',icon:Wifi},{title:'Power Outlets',sub:'Stay fully charged',icon:PlugZap},{title:'Extra Legroom',sub:'Room to relax',icon:Armchair},{title:'VIP Seating',sub:'Travel in comfort',icon:Armchair}].map((item,index) => <article key={item.title} className="amenity"><div className="icon-tile">{index === 3 ? <span className="vip-badge">VIP</span> : <item.icon/>}</div><div><h3>{item.title}</h3><small>{item.sub}</small></div></article>)}</div></div></section>
      <section id="why-us" className="why-section"><div className="container-shell"><SectionHead title="Why Us" subtitle="More than a ticket. A better way to get there."/><div className="why-grid">{reasons.map(reason => <article key={reason.title} className="reason"><div className={`icon-tile ${reason.tone}`}><reason.icon/></div><div><h3>{reason.title}</h3><p>{reason.text}</p></div></article>)}</div></div></section>
      <section id="about" className="about-section"><div className="container-shell"><SectionHead title="About Buscar" subtitle="A new way of road travel in East Africa" icon={<BusFront/>}/><div className="why-grid">{[
        {title:'About Buscar',text:'Providing luxurious buses, on-board entertainment, individual seat belts and many others, BUSCAR has truly embraced a new way of road travel in East Africa. With an online booking system for fast and accurate bookings, we give our passengers the luxury to plan their journeys with us.',icon:BusFront,tone:''},
        {title:'The King of Comfort',text:'With spacious and comfortable interiors, our buses offer individual seatbelts, VIP seats, plug points and many other creature comforts making your journey with us a memorable one. Watch a selection of movies on the built-in entertainment system. Our crew are well trained, friendly with customers, and our experienced, disciplined drivers communicate well with passengers.',icon:Armchair,tone:'tone-gold'},
        {title:'Safety, Our Priority',text:'Our buses are designed with emergency exits located in easily accessible positions in case of emergencies. By putting safety as our utmost priority, our buses are well maintained and our crew are well trained to give you the best possible safety assurance.',icon:ShieldCheck,tone:'tone-mint'},
      ].map(item => <article key={item.title} className="reason"><div className={`icon-tile ${item.tone}`}><item.icon/></div><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div></div></section>
      <section id="print-ticket" className="print-section"><div className="container-shell"><form className="print-card" onSubmit={event => {event.preventDefault();toast('Ticket printing is coming soon',{description:'Once online booking launches, you’ll be able to retrieve and print your confirmed ticket here.'});}}><h2>Print Ticket</h2><div className="print-fields"><label className="print-field"><span>Ticket Number</span><input value={ticketNumber} onChange={event => setTicketNumber(event.target.value)} placeholder="e.g XYZ123456789" aria-label="Ticket Number"/></label><label className="print-field"><span>Mobile Number</span><input value={mobileNumber} onChange={event => setMobileNumber(event.target.value)} placeholder="e.g 0785700700" inputMode="tel" aria-label="Mobile Number"/></label></div><div className="print-actions"><Button type="submit"><Search/>Print Ticket</Button></div></form></div></section>
      <section id="gallery" className="gallery-section"><div className="container-shell"><SectionHead title="Gallery" subtitle="Our fleet, up close" icon={<BusFront/>}/><div className="gallery-grid">{galleryPhotos.map((photo,index) => <figure key={photo.url} className="gallery-item"><img src={photo.url} alt={`BUSCAR bus ${index+1}`} loading="lazy"/></figure>)}</div></div></section>
      <section className="promo-section"><div className="container-shell"><div className="carousel-viewport" ref={carouselRef} aria-roledescription="carousel" aria-label="Travel inspiration"><div className="carousel-track">{['TRAVEL TO MOMBASA','YOUR NEXT JOURNEY AWAITS'].map((headline,index) => <article className="travel-slide" key={headline} aria-roledescription="slide" aria-label={`${index+1} of 2`}><img src={coast.url} alt="BUSCAR coach — Travel to Mombasa" loading="lazy"/><div className="travel-copy"><Brand compact/><p>Buy your travel tickets hustle free</p><h2>{headline}</h2><Button variant="brand" onClick={() => navigate('search')}>BOOK YOUR TICKET<ArrowUpRight/></Button></div></article>)}</div></div><div className="carousel-controls"><div className="carousel-dots">{[0,1].map(index => <Button key={index} variant="ghost" aria-label={`Go to banner ${index+1}`} aria-pressed={slide === index} className={slide === index ? 'selected' : ''} onClick={() => carouselApi?.scrollTo(index)}/>)}</div><div className="carousel-arrows"><Button variant="outline" size="icon" aria-label="Previous banner" onClick={() => carouselApi?.scrollPrev()}><ArrowLeft/></Button><Button variant="outline" size="icon" aria-label="Next banner" onClick={() => carouselApi?.scrollNext()}><ArrowRight/></Button></div></div><div className="app-banner"><div><span className="banner-eyebrow">TAKE BUSCAR WITH YOU</span><h3>Download our app<br/>on the playstore</h3><StoreBadge onClick={() => setModal('app')}/></div><div className="app-banner-art"><div className="welcome">Welcome to<strong>BUSCAR</strong>EAGLE ABOVE THE REST</div><Phone small/></div></div></div></section>
      <section id="routes" className="routes-section"><div className="container-shell"><div className="routes-heading"><SectionHead title="Our routes" subtitle="Popular destinations our buses travel to every day" icon={<RouteIcon/>}/><label className="route-search"><Search/><input aria-label="Search a route" placeholder="Search a route..." value={query} onChange={event => setQuery(event.target.value)}/>{query && <Button variant="ghost" size="icon" className="h-5 w-5" aria-label="Clear route search" onClick={() => setQuery('')}><X/></Button>}</label></div><div className={`routes-list ${expanded ? 'expanded' : ''}`}>{visible.map(([origin,destination]) => <Button key={`${origin}-${destination}`} variant="secondary" className="route-chip" onClick={() => chooseRoute(origin,destination)}><MapPin/><span>{origin} <span className="route-arrow">–</span> {destination}</span></Button>)}</div>{!filtered.length && <p className="route-empty">No routes found for “{query}”.</p>}{!query && <div className="routes-more"><Button variant="ghost" onClick={() => setExpanded(!expanded)}>{expanded ? 'Show less' : `Show more routes (${routes.length})`}<ChevronDown className={expanded ? 'rotate-180' : ''}/></Button></div>}</div></section>
      <section id="faq" className="faq-section"><div className="container-shell faq-layout"><div><SectionHead title="Buscar Bus FAQ" subtitle="Got questions? Here are quick answers to the most common booking and travel queries." icon={<CircleHelp/>}/><div className="faq-note"><Headphones/>A smoother journey starts with answers.</div></div><Accordion type="single" collapsible className="faq-list">{faqs.map(([question,answer],index) => <AccordionItem className="faq-item" value={`faq-${index}`} key={question}><AccordionTrigger>{question}</AccordionTrigger><AccordionContent><p>{answer}</p></AccordionContent></AccordionItem>)}</Accordion></div></section>
      <section className="download-section"><div className="container-shell"><div className="download-inner"><div><div className="download-visual"><Phone/></div><div className="store-row mb-8"><StoreBadge onClick={() => setModal('app')}/><StoreBadge apple onClick={() => setModal('app')}/></div></div><div className="download-copy"><div className="section-eyebrow">Travel in your pocket</div><h2>Great journeys.<br/>One simple app.</h2><p>Take the next step with BUSCAR.<br/>Your next destination is closer than you think.</p><Travler/></div></div></div></section>
    </main>
    <footer id="contact" className="site-footer"><div className="container-shell"><div className="footer-top"><div className="voltic">VOLTIC<small>POWERED BY VOLTIC</small></div><nav className="footer-links" aria-label="Footer">{[['about','About'],['print-ticket','Print Ticket']].map(([id,label]) => <Button key={id} variant="ghost" onClick={() => navigate(id ?? 'about')}>{label}</Button>)}{[['contact','Get In Touch'],['terms','Terms'],['privacy','Privacy Policy']].map(([key,label]) => <Button key={key} variant="ghost" onClick={() => setModal(key ?? 'contact')}>{label}</Button>)}</nav><div className="socials"><Button variant="ghost" size="icon" aria-label="Facebook" onClick={() => setModal('social')}><Facebook/></Button><Button variant="ghost" size="icon" aria-label="X" onClick={() => setModal('social')}><span>𝕏</span></Button><Button variant="ghost" size="icon" aria-label="LinkedIn" onClick={() => setModal('social')}><Linkedin/></Button></div></div><p className="copyright">© 2026 Buscar Bus Service. All rights reserved.<br/>Online booking technology powered by Travler &amp; Voltic.</p><details className="footer-directory"><summary>BUSCAR BUS ROUTES DIRECTORY<ChevronDown/></summary><div className="footer-route-list">{routes.map(([origin,destination]) => <Button key={`${origin}-${destination}`} variant="ghost" onClick={() => chooseRoute(origin,destination)}>{origin} – {destination}</Button>)}</div></details></div></footer>
    <nav className="mobile-nav" aria-label="Mobile navigation">{navigation.map(item => <Button key={item.label} variant="ghost" className={item.active ? 'active' : ''} onClick={item.action}><item.icon/>{item.label}</Button>)}</nav>
    <Button className="chat-button" size="icon" aria-label="Chat with BUSCAR" title="Chat with BUSCAR" onClick={() => setModal('contact')}><MessageCircle/><span className="chat-dot"/></Button>
    <AccountDialog open={accountOpen} onOpenChange={setAccountOpen} onGuest={() => navigate('search')} onSignedIn={() => {setSignedIn(true);setUserMenu(true);}}/>
    <Dialog open={Boolean(details)} onOpenChange={open => {if(!open)setModal(null);}}><DialogContent className="preview-dialog"><div className="dialog-icon">{modal === 'app' ? <Smartphone/> : <MessageCircle/>}</div><DialogTitle>{details?.title}</DialogTitle><DialogDescription>{details?.description}</DialogDescription><p>{details?.text}</p><span className="preview-label">Coming soon</span><Button onClick={() => {setModal(null);navigate('faq');}}>View travel FAQs<ArrowRight/></Button></DialogContent></Dialog>
  </>;
}
