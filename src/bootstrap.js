import { start, registerApplication } from 'single-spa';

registerApplication(
    'floatingMenu',
    () => import('floatingMenu/FloatingMenu'),
    () => true
);

registerApplication(
    'pkConnect',
    () => import('pkConnect/ConnectionStatus'),
    (location) => location.pathname.startsWith('/')
);

start();
