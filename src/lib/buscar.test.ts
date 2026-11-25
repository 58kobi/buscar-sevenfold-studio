import { describe, expect, it } from 'vitest';
import { routes, destinations, filterRoutes, nairobiDate } from './buscar';
describe('BUSCAR directory and travel date', () => {
  it('contains exactly the 32 requested routes', () => {
    expect(routes).toHaveLength(32);
    expect(routes[0]).toEqual(['BOMET','NAIROBI']);
    expect(routes[31]).toEqual(['NAIROBI','VOI']);
    expect(routes).toContainEqual(['GEDE','MTITO ANDEI']);
    expect(routes).toContainEqual(['ELDORET','KAMPALA']);
  });
  it('uses directory locations for both dropdowns', () => {
    expect(destinations).toContain('NAIROBI');
    expect(destinations).toContain('MOMBASA');
    expect(destinations).toContain('MTITO ANDEI');
    expect(destinations).toHaveLength(25);
  });
  it('filters routes without case sensitivity', () => {
    expect(filterRoutes('bUsIa')).toEqual([['BUSIA','MOMBASA'],['BUSIA','NAIROBI']]);
    expect(filterRoutes('nonexistent')).toEqual([]);
  });
  it('defaults today to the date in Africa/Nairobi, including UTC midnight crossover', () => {
    const result = nairobiDate(new Date('2026-11-25T22:30:00Z'));
    expect([result.getFullYear(),result.getMonth(),result.getDate()]).toEqual([2026,10,26]);
  });
});
