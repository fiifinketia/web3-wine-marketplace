import { amplitude } from 'src/boot/amplitude';

function SetSessionID() {
  amplitude.setSessionId(Date.now());
  // amplitude.track(track);
}

function TrackClickEvent(track: string) {
  amplitude.track(track, {
    environment: process.env.QENV == 'Development' ? 'Staging' : 'Production',
  });
}
export { SetSessionID, TrackClickEvent };
