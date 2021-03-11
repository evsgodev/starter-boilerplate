export const isTouchDevices = ('ontouchstart' in window) || (window.DocumentTouch && document instanceof window.DocumentTouch);
