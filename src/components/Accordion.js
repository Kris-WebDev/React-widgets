import React, { useState } from "react";

// This is a Function base component that mimics the class base component state system
const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null); // this is how you set a state for a func component
  // [ (value goes here after it is set) , (setter of the variable) ] = useState(the default value of the var)

  // Helper method for a function base component.
  const onTitleClick = (index) => {
    setActiveIndex(index); //setting the index as the value of the setActiveIndex that will be pass to activeIndex
  };

  const renderItems = items.map((item, index) => {
    //Checking if the clicked title is the current index against the activeIndex variable
    const active = index === activeIndex ? "active" : "";

    return (
      <React.Fragment key={item.title}>
        <div
          className={`title ${active}`} //adding the active state when user clicks on the title bar. css active is from the semantic UI
          onClick={() => {
            onTitleClick(index); //this call the function "onTitleClick" only when user clicks the title
          }}
        >
          <i className="dropdown icon"></i>
          {item.title}
        </div>
        <div className={`content ${active}`}>
          <p>{item.content}</p>
        </div>
      </React.Fragment>
    );
  });

  return <div className="ui styled accordion">{renderItems}</div>;
};

export default Accordion;
