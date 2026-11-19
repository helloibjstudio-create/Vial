/**
 * Home intro boot script (see components/home/HomeHero.tsx). Inlined in <head> so
 * it runs before first paint: on a full load of "/", with motion allowed and the
 * intro not yet seen this session, it marks <html data-intro="pending"> so CSS
 * renders the stage-1 state immediately (no flash of the stage-2 hero).
 */
export const INTRO_SESSION_KEY = "vial-intro-seen";

export const introBootScript = `try{if(location.pathname==="/"&&!matchMedia("(prefers-reduced-motion: reduce)").matches&&!sessionStorage.getItem("${INTRO_SESSION_KEY}")){document.documentElement.dataset.intro="pending"}}catch(e){}`;
