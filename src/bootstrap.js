import { start, registerApplication, mountRootParcel } from "single-spa";
import ConnectionService from "pkConnect/ConnectionService";

ConnectionService.init("https://pk-center.herokuapp.com/game");
// ConnectionService.init("http://localhost:3000/game");

const menuElement = document.getElementById("menu");
const menuParcelProps = { domElement: menuElement, customProp1: "foo" };
mountRootParcel(() => import("floatingMenu/FloatingMenu"), menuParcelProps);

registerApplication(
  "pkConnect",
  () => import("pkConnect/ConnectionStatus"),
  (location) => location.hash === '' || location.hash === '#/',
);

registerApplication(
  "game",
  () => import("game/App"),
  (location) => location.hash === '' || location.hash === '#/',
  {
    player: {
      name: `player${Math.floor(Math.random() * 10000)}`,
    },
    connection: ConnectionService,
  }
);

registerApplication(
  "account",
  () => import("account/App"),
  (location) => location.hash.startsWith("#/account"),
);

start();
