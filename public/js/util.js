export const showByFlex = (dom) => {
  dom.style.display = 'flex';
};

export const showByBlock = (dom) => {
  dom.style.display = 'block';
};

export const hide = (dom) => {
  dom.style.display = 'none';
};

export const move = (path) => {
  window.location.href = path;
};
