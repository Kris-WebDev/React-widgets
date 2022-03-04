import React, { useState } from "react";
import DropDown from "./DropDown";
import Convert from "./Convert";

const options = [
  {
    label: "Philippines",
    value: "tl",
  },
  {
    label: "Japanese",
    value: "ja",
  },
  {
    label: "Korean",
    value: "ko",
  },
  {
    label: "Spanish",
    value: "es",
  },
];

const Translate = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(options[0]);
  const [text, setText] = useState("");

  return (
    <React.Fragment>
      <div className="ui form">
        <label className="label">Enter Text</label>
        <div className="field">
          <input value={text} onChange={(e) => setText(e.target.value)} />
        </div>
      </div>
      <br />
      <DropDown
        title="Select a Language"
        options={options}
        selected={selectedLanguage} //the value of current option from setSelectedColor
        onSelectedChange={setSelectedLanguage} //handler for the current option
      />
      <br />
      <hr />
      <div className="ui segment">
        <h2 className="ui header">Output</h2>
        <Convert text={text} language={selectedLanguage} />
      </div>
    </React.Fragment>
  );
};

export default Translate;
