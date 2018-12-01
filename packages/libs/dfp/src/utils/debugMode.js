/* global window */

export const isDebugMode = () => window.location.search.includes('debug') || false;
