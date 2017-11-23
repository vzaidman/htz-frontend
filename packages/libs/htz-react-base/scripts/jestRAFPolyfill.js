if (!global.requestAnimationFrame) {
  let lastTime;

  global.requestAnimationFrame = callback => {
    const currTime = new Date().getTime();
    const timeToCall = Math.max(0, 16 - (currTime - lastTime));
    const id = global.setTimeout(() => {
      callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };
}

if (!global.cancelAnimationFrame) {
  global.cancelAnimationFrame = id => global.clearTimeout(id);
}
