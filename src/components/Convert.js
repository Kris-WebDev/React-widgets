import React, { useState, useEffect } from "react";
import axios from "axios";

const Convert = ({ language, text }) => {
  const [convertedText, setConvertedText] = useState("");
  const [debounceText, setDebounceText] = useState(text);

  //another useEffect to track debounce
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebounceText(text);
    }, 1000);

    return () => {
      clearTimeout(timerId); // Grabing the timer id from the setTimeout above and clearing it
    };
  }, [text]);

  useEffect(() => {
    // helper function

    const doTranslation = async () => {
      // This is how to POST request API in a useEffect method. Post has 3 arguments (url), (body), (headers)
      const { data } = await axios.post(
        "https://translation.googleapis.com/language/translate/v2",
        {
          //API body argument here
        },
        {
          // Params goes here.
          params: {
            q: debounceText,
            target: language.value, // .value because language contain the array
            key: "AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM",
          },
        }
      );
      setConvertedText(data.data.translations[0].translatedText);
    };
    doTranslation();
  }, [language, debounceText]);

  return (
    <div>
      <h3 className="ui header">{convertedText}</h3>
    </div>
  );
};

export default Convert;
