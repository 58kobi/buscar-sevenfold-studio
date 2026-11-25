import { format, isSameDay } from 'date-fns';
import { CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useState } from 'react';

export function DateField({ label, date, today, onChange }: { label: string; date: Date | undefined; today: Date | undefined; onChange: (date: Date) => void }) {
  const [open, setOpen] = useState(false);
  return <Popover open={open} onOpenChange={setOpen}><PopoverTrigger asChild><Button variant="field" className="booking-field" aria-label={label}><span className="field-label">{label}{date && today && isSameDay(date,today) && <span className="today-badge">TODAY</span>}</span><span className="field-value"><CalendarDays/><span>{date ? format(date,'dd MMM yyyy') : 'Select date'}</span></span></Button></PopoverTrigger><PopoverContent className="w-auto p-0 pointer-events-auto" align="start"><Calendar mode="single" {...(date ? {selected:date, defaultMonth:date} : {})} onSelect={value => {if(value){onChange(value);setOpen(false);}}}/></PopoverContent></Popover>;
}
