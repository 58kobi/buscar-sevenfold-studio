import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { SectionMenu, AccountMenu } from './smooth-controls';

afterEach(cleanup);

describe('isolated dropdown interactions', () => {
  it('opens without rendering its parent and closes on an outside tap', () => {
    let renders = 0;
    function Parent() {
      renders += 1;
      return <SectionMenu onNavigate={vi.fn()}/>;
    }
    render(<Parent/>);
    const initial = renders;
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(renders).toBe(initial);
    expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true');
    fireEvent.pointerDown(document.body);
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false');
  });

  it('keeps signed-out users out of the account menu and dismisses signed-in menus with Escape', () => {
    const onAccount = vi.fn();
    const props = { onAccount, onAction: vi.fn(), onSignOut: vi.fn() };
    const view = render(<AccountMenu signedIn={false} {...props}/>);
    fireEvent.click(screen.getByRole('button', { name: 'Account' }));
    expect(onAccount).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('menu')).toBeNull();
    view.rerender(<AccountMenu signedIn {...props}/>);
    fireEvent.click(screen.getByRole('button', { name: 'Account' }));
    expect(screen.getByRole('menu')).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('menu')).toBeNull();
  });
});