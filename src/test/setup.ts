import '@testing-library/jest-dom';
import { expect, afterEach, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { vi } from 'vitest';

// Mock des fonctions de scroll
beforeAll(() => {
  // Mock matchMedia
  window.matchMedia = window.matchMedia || function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {},
      addEventListener: function() {},
      removeEventListener: function() {},
      dispatchEvent: function() { return false; },
    };
  };

  // Mock scrollTo
  Element.prototype.scrollTo = vi.fn();
  
  // Mock scrollIntoView
  Element.prototype.scrollIntoView = vi.fn();

  // Mock scrollHeight
  Object.defineProperty(Element.prototype, 'scrollHeight', {
    configurable: true,
    get: function() { return 0; }
  });
});

// Étend les matchers de Vitest avec ceux de testing-library
expect.extend(matchers as any);

// Nettoie après chaque test
afterEach(() => {
  cleanup();
}); 