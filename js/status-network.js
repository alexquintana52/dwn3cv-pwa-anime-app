const status_element = document.getElementById('status-state');

window.addEventListener('offline', event => {
    status_element.innerHTML = 'Estas Offline';
});

window.addEventListener('online', event => {
    status_element.innerHTML = 'Estas Online';
});

if(!navigator.onLine){
    console.log('Estas sin Conexión')
}