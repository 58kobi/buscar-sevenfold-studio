import { useState, type FormEvent } from 'react';
import { Eye, EyeOff, Lock, CircleCheck } from 'lucide-react';
import logo from '@/assets/buscar-logo-v3.png.asset.json';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';

export const countryCodes = ['254', '255', '250', '256'] as const;
type View = 'signin' | 'signup' | 'created';

function Password({ id, placeholder, lock = false }: { id: string; placeholder?: string; lock?: boolean }) {
  const [show, setShow] = useState(false);
  return <div className="acc-pass">{lock && <span className="acc-lock"><Lock/></span>}<input id={id} required minLength={6} type={show ? 'text' : 'password'} placeholder={placeholder}/><button type="button" aria-label={show ? 'Hide password' : 'Show password'} onClick={() => setShow(!show)}>{show ? <EyeOff/> : <Eye/>}</button></div>;
}

function CodeSelect({ required = false }: { required?: boolean }) {
  return <select className="acc-input" aria-label="Country code" required={required} defaultValue="254">{countryCodes.map(c => <option key={c} value={c}>+{c}</option>)}</select>;
}

export function AccountDialog({ open, onOpenChange, onGuest, onSignedIn }: { open: boolean; onOpenChange: (o: boolean) => void; onGuest: () => void; onSignedIn: () => void }) {
  const [view, setView] = useState<View>('signin');
  const [name, setName] = useState('');
  const close = (o: boolean) => { onOpenChange(o); if (!o) setTimeout(() => setView('signin'), 200); };
  const signUp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const p = (f.querySelector('#su-pass') as HTMLInputElement).value;
    const c = f.querySelector('#su-confirm') as HTMLInputElement;
    c.setCustomValidity(p === c.value ? '' : 'Passwords do not match');
    const n = f.querySelector('input') as HTMLInputElement; n.setCustomValidity(name.trim() ? '' : 'Please enter your name');
    if (!f.reportValidity()) return;
    setView('created'); onSignedIn();
  };
  return <Dialog open={open} onOpenChange={close}><DialogContent className="account-dialog">
    <img decoding="async" src={logo.url} alt="BUSCAR logo" className="acc-logo"/>
    {view === 'signin' && <form onSubmit={e => { e.preventDefault(); close(false); onSignedIn(); }} className="acc-form">
      <DialogTitle className="acc-title upper">Sign in</DialogTitle><DialogDescription className="sr-only">Sign in to your BUSCAR account</DialogDescription>
      <div className="acc-row"><label><span>Code</span><CodeSelect/></label><label className="grow"><span>Phone number</span><input className="acc-input" type="tel" inputMode="numeric" pattern="[0-9]{9}" placeholder="700000000" required/></label></div>
      <label><span>Password</span><Password id="si-pass" lock/></label>
      <div className="acc-between"><label className="acc-check"><input type="checkbox"/>Remember me</label><button type="button" className="acc-link">Forgot password?</button></div>
      <Button type="submit" className="acc-primary">Sign in</Button>
      <div className="acc-or"><span>Or continue</span></div>
      <Button type="button" variant="outline" className="acc-outline" onClick={() => { close(false); onGuest(); }}>As guest</Button>
      <p className="acc-foot">Don't have an account? <button type="button" className="acc-link" onClick={() => setView('signup')}>Sign up</button></p>
    </form>}
    {view === 'signup' && <form onSubmit={signUp} noValidate={false} className="acc-form small">
      <DialogTitle className="acc-title">Sign up</DialogTitle><DialogDescription className="sr-only">Create a BUSCAR account</DialogDescription>
      <label><span>Name</span><input className="acc-input" required value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" maxLength={100}/></label>
      <div className="acc-row"><label><span>Code</span><CodeSelect required/></label><label className="grow"><span>Phone</span><input className="acc-input" type="tel" inputMode="numeric" pattern="[0-9]{9}" required placeholder="Enter your phone number"/></label></div>
      <label><span>Email</span><input className="acc-input" type="email" required maxLength={255} placeholder="Enter your email"/></label>
      <div className="acc-grid"><label><span>Gender</span><select className="acc-input" required defaultValue=""><option value="" disabled>Select Gender</option><option>Male</option><option>Female</option></select></label><label><span>Date of Birth</span><input className="acc-input" type="date" required/></label>
      <label><span>Password</span><Password id="su-pass" placeholder="Enter password"/></label><label><span>Confirm Password</span><Password id="su-confirm" placeholder="Confirm password"/></label></div>
      <label className="acc-check"><input type="checkbox" required/>I agree to the terms and conditions</label>
      <Button type="submit" className="acc-primary">Sign up</Button>
      <p className="acc-foot">Already have an account? <button type="button" className="acc-link" onClick={() => setView('signin')}>Sign in</button></p>
    </form>}
    {view === 'created' && <div className="acc-form acc-done">
      <CircleCheck className="acc-done-icon"/>
      <DialogTitle className="acc-title">Account created</DialogTitle>
      <DialogDescription>Welcome to BUSCAR{name ? `, ${name.split(' ')[0]}` : ''}! Your account was created successfully and you are now signed in.</DialogDescription>
      <Button className="acc-primary" onClick={() => close(false)}>Continue</Button>
    </div>}
  </DialogContent></Dialog>;
}
