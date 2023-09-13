export default function debounce(cb, timeout = 300) {
  let timer = undefined;

  return (...args) => {
    if (!timer) {
      cb(args);
    }

    clearTimeout(timer);

    timer = setTimeout(() => {
      timer = undefined;
    }, timeout);
  };
}
