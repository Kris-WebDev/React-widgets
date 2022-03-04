import React, { useState } from "react";
import Accordion from "./Accordion";
import Search from "./Search";
import DropDown from "./DropDown";
import Translate from "./Translate";
import Route from "./Route";
import Navigation from "./Navigation";

//Static array. not from API
const items = [
  {
    title: "What is React js",
    content: "React is a fancy Javascript UI shit",
  },
  {
    title: "What is the word",
    content: "the bird is the word",
  },
  {
    title: "What is the password",
    content: "The password is just simply... PASSWORD",
  },
];

const options = [
  {
    label: "Red Tyranasaurus",
    value: "red",
  },
  {
    label: "Blue Triceratops",
    value: "blue",
  },
  {
    label: "The Green Dragonzord",
    value: "green",
  },
];

export default () => {
  const [selectedColor, setSelectedColor] = useState(options[0]); // set the selectedColor to 1st array
  return (
    <div className="ui container">
      <Navigation />
      <br />

      <Route path="/">
        <Accordion items={items} />
      </Route>
      <Route path="/search">
        <Search />
      </Route>
      <Route path="/dropdown">
        <DropDown
          title="Select a Color"
          options={options}
          selected={selectedColor} //the value of current option from setSelectedColor
          onSelectedChange={setSelectedColor} //handler for the current option
        />
      </Route>
      <Route path="/translate">
        <Translate />
      </Route>
    </div>
  );
};
