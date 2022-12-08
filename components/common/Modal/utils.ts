export const getScrollbarWidth = () => {
  const window = document.defaultView!;

  return Math.abs(window.innerWidth - document.documentElement.clientWidth);
};

export const canUseDOM = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);
