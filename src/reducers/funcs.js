export const updateList = (list, item, idx) => {
  if (item === "remove") {
    return [...list.slice(0, idx), ...list.slice(idx + 1)];
  }

  if (typeof idx === "number") {
    return [...list.slice(0, idx), item, ...list.slice(idx + 1)];
  }

  return [item, ...list];
};
