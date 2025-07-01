import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import axios from 'axios';

// ✅ Declare supaya window.Echo dan window.Pusher dikenali TypeScript
declare global {
    interface Window {
        Pusher: typeof Pusher;
        Echo: Echo<any>;
    }
}

const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: true,
    encrypted: true,
    auth: {
        headers: {
            'X-CSRF-TOKEN': token
        }
    }
});
