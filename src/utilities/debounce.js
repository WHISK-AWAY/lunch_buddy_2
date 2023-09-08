export default function debounce(cb, timeout = 300) {
  let timer = undefined;

  return () => {
    if (!timer) {
      cb();
    }

    clearTimeout(timer);

    timer = setTimeout(() => {
      timer = undefined;
    }, timeout);
  };
}
