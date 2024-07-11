export const getInitialPage = () => {
    return localStorage.getItem('page') || 1;
  };