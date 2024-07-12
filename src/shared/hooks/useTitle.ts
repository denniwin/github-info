import { useEffect } from "react";

export const useTitle = (
  title: string,
  alternateTitle?: string,
  interval = 3000
) => {
  useEffect(() => {
    let titleInterval = null;

    if (alternateTitle) {
      let toggle = false;
      titleInterval = setInterval(() => {
        document.title = toggle ? title : alternateTitle;
        toggle = !toggle;
      }, interval);
    } else {
      document.title = title;
    }

    return () => {
      if (titleInterval) {
        clearInterval(titleInterval);
      }
    };
  }, [title, alternateTitle, interval]);
};
