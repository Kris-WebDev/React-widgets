import React, { useState, useEffect, useRef } from "react";

// destructure the props.options from APP.js into just using options
const DropDown = ({ options, selected, onSelectedChange, title }) => {
  const [open, setOpen] = useState(false);

  const ref = useRef();

  // useEffect is like componentDidMount function. it only runs once. but depending on the 2nd argument
  useEffect(() => {
    const onBodyClick = (event) => {
      //this check if ref (the parent div of the dropdown) is equal or "contain" same element of the event that go clicked on
      if (ref.current.contains(event.target)) {
        return; //then do nothing
      }
      //else setOpen to false, which close the dropdown
      setOpen(false);
    };

    document.body.addEventListener("click", onBodyClick, { capture: true });

    return () => {
      document.body.removeEventListener("click", onBodyClick, {
        capture: true,
      });
    };
  }, []);

  const renderOptions = options.map((option) => {
    if (option.value === selected.value) {
      return null;
    }

    return (
      <div
        key={option.value}
        className="item"
        onClick={() => onSelectedChange(option)} //grabs the current clicked array. which is option and pass it to selected
      >
        {option.label}
      </div>
    );
  });

  return (
    <div className="ui form" ref={ref}>
      <div className="field">
        <label className="label">{title}</label>
        <div
          // this is set the toggle to the css visible active when user clicks
          onClick={() => setOpen(!open)}
          className={`ui selection dropdown ${open ? "visible active" : ""}`}
        >
          {/* above is a ternary expression for if open is true do this ":" if false do this */}
          <i className="dropdown icon"></i>

          {/* the value of selected color here is passed from the onClick event at the top. that grabs the current option array then .label */}
          <div className="text">{selected.label}</div>
          <div className={`menu ${open ? "visible transition" : ""}`}>
            {renderOptions}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropDown;

// NOTE: Ternary expression syntax is this [condition] ? [expressionIfTrue] : [expressionIfFalse];
