if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/festivalbingo/sw.js', { scope: '/festivalbingo/' })})}