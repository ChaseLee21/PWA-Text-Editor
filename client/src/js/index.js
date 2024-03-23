import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

if (typeof editor === 'undefined') {
  loadSpinner();
}

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // Use the browser's service worker API to register your service worker
  navigator.serviceWorker.register('/src-sw.js')
    .then(function(registration) {
      console.log('Service worker registration succeeded:', registration);
    })
    .catch(function(error) {
      console.log('Service worker registration failed:', error);
    });
} else {
  console.error('Service workers are not supported in this browser.');
}
