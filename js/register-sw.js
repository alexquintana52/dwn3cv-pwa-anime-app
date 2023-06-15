if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../js/sw.js')
    .then((message) => {
        console.log('Service Worker esta listo')
    });
} else {
    console.log('El navegador no soporta Service Worker');
};