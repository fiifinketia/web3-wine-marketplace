import { amplitude } from "src/boot/amplitude";

function SetSessionID(track: string) {
  amplitude.setSessionId(Date.now());
  amplitude.track(track);
}

export {
  SetSessionID
}