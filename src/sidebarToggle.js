import { useState } from "react";

export const useSidebarToggle = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return { isSidebarVisible, toggleSidebar };
};
