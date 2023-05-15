import { amplitude } from 'src/boot/amplitude';

function SetSessionID() {
  amplitude.setSessionId(Date.now());
  // amplitude.track(track);
}

// tracking STAGING ENVIRONMENT events
function STAGING_TrackClickEvent(track: string) {
  amplitude.track(track, { environment: 'Staging' });
}

// tracking PRODUCTION ENVIRONMENT events
function PRODUCTION_TrackClickEvent(track: string) {
  amplitude.track(track, { environment: 'Production' });
}
export { SetSessionID, STAGING_TrackClickEvent, PRODUCTION_TrackClickEvent };
