declare function getOrientation(): "portrait" | "landscape";
declare function setCustomVh(): void;
declare function debouncedResize(): void;
declare let currentOrientation: any;
declare let debounceId: any;
