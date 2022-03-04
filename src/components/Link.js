import React from "react";

const Link = ({ className, href, children }) => {
  const onLinkClicked = (event) => {
    if (event.metaKey || event.ctrKey) {
      return;
    }

    event.preventDefault();
    window.history.pushState({}, "", href); // 1st empty, 2nd is a string, 3rd is the location name

    const navEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navEvent);
  };

  return (
    <a href={href} className={className} onClick={onLinkClicked}>
      {children}
    </a>
  );
};

export default Link;
