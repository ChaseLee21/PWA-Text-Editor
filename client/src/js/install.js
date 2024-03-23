let deferredPrompt;

const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent Chrome 76 and later from showing the mini-infobar
    event.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = event;
    // Show the install button
    butInstall.removeAttribute('hidden');
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    if (deferredPrompt) { // Check if deferredPrompt is defined
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);
        butInstall.setAttribute('hidden', true);
    } else {
        console.log('The beforeinstallprompt event has not been fired yet.');
    }
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // Log the result of the prompt
    console.log('Jate has been installed!', event);
    // Hide the install button
    butInstall.setAttribute('hidden', true);
});
