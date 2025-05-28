import '@testing-library/jest-dom';
import 'whatwg-fetch';
import './setup/mockConfig';

// Mock MathJax
(window as any).MathJax = {
  typesetPromise: jest.fn().mockResolvedValue(undefined),
};

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}

window.IntersectionObserver = MockIntersectionObserver as any; 