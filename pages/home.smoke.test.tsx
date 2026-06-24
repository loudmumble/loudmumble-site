// @vitest-environment jsdom
import { describe, it, expect, beforeAll, vi } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Index from './Index';
import NotFound from './NotFound';
import { projects } from '@/lib/portfolio-data';

beforeAll(() => {
  // @ts-expect-error test stub
  globalThis.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  Element.prototype.scrollTo = () => {};
  Element.prototype.scrollIntoView = () => {};
  vi.stubGlobal('requestAnimationFrame', () => 0);
  vi.stubGlobal('cancelAnimationFrame', () => {});
});

describe('homepage', () => {
  it('mounts without crashing and shows the brand', () => {
    const { container } = render(
      <MemoryRouter><Index /></MemoryRouter>,
    );
    expect(container.textContent?.toLowerCase()).toContain('loudmumble');
  });

  it('renders every project from the data source', () => {
    const { getAllByText } = render(
      <MemoryRouter><Index /></MemoryRouter>,
    );
    for (const p of projects) {
      // each project name appears at least once (palette + card)
      expect(getAllByText(new RegExp(`\\b${p.name}\\b`)).length).toBeGreaterThan(0);
    }
  });

  it('lists the curated public-facing repos and excludes the site itself', () => {
    const names = projects.map((p) => p.name);
    expect(names).toContain('lamprey');
    expect(names).toContain('mtls-core');
    expect(names).not.toContain('glass-privacy-suite');
    expect(names).not.toContain('tls-toolkit');
    expect(names).not.toContain('loudmumble-site');
    expect(names).toHaveLength(13);
  });
});

describe('404', () => {
  it('renders', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/nope']}><NotFound /></MemoryRouter>,
    );
    expect(container.textContent).toContain('404');
  });
});
