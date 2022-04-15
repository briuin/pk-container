import { start, registerApplication } from 'single-spa';
import ConnectionService from 'pkConnect/ConnectionService';

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

ConnectionService.init('https://pk-center.herokuapp.com/game');