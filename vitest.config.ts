import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['frontend/src/**/*.test.tsx', 'backend/routes/**/*.test.js'],
  },
});