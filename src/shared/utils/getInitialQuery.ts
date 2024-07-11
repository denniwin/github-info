export const getInitialQuery = () => {
  return localStorage.getItem("query") || "";
};
