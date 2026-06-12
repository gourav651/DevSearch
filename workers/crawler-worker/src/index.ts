import "./crawl.worker";
import { sendHeartbeat } from "./worker-status";

console.log(
  "Crawler Worker Started"
);

setInterval(() => {
  sendHeartbeat();
}, 30000);