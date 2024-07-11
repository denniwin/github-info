export const getInitialCursor = () => {
  return localStorage.getItem("cursor") || null;
};
