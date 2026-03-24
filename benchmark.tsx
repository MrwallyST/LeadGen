import React from 'react';
import { renderToString } from 'react-dom/server';
import { Calculator } from './src/components/Calculator.js';

let totalTime = 0;

for (let i = 0; i < 5; i++) {
  const start = performance.now();
  for (let j = 0; j < 1000; j++) {
    renderToString(<Calculator />);
  }
  const end = performance.now();
  totalTime += (end - start);
}

console.log(`Average Render time: ${totalTime / 5} ms`);
