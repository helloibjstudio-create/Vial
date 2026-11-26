/**
 * Home intro boot script (see components/home/HomeHero.tsx). Inlined in <head> so it runs
 * before first paint: on a full load of "/" with motion allowed it marks
 * <html data-intro="pending">, so CSS paints the stage-1 intro (video pill + "Incense
 * Rising") immediately instead of flashing the stage-2 hero. The scroll then opens it.
 */
export const introBootScript = `try{if(location.pathname==="/"&&!matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.dataset.intro="pending"}}catch(e){}`;
