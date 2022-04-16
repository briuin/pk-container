import { start, registerApplication, mountRootParcel } from "single-spa";
import ConnectionService from "pkConnect/ConnectionService";

const menuElement = document.getElementById("menu");
const menuParcelProps = { domElement: menuElement, customProp1: "foo" };
mountRootParcel(() => import("floatingMenu/FloatingMenu"), menuParcelProps);

registerApplication(
  "pkConnect",
  () => import("pkConnect/ConnectionStatus"),
  (location) => location.pathname.startsWith("/")
);

registerApplication(
  "game",
  () => import("game/HelloWorld"),
  (location) => location.pathname.startsWith("/")
);

start();

ConnectionService.init("https://pk-center.herokuapp.com/game");
