import React, { useState, useEffect } from "react";
import axios from "axios";

//useEffect is like componentDidMount. runs when the component is rendered for the first time only

const Search = () => {
  const [term, setTerm] = useState("banana");
  const [debounceTerm, setDebounceTerm] = useState(term);
  const [result, setResult] = useState([]);

  //another useEffect to track debounce
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebounceTerm(term);
    }, 1000);

    return () => {
      clearTimeout(timerId); // Grabing the timer id from the setTimeout above and clearing it
    };
  }, [term]);

  //useEffect has 2 arguments. ( function , controls when the code is executed, usually array, or nothing)
  useEffect(() => {
    // This is how to fetch API in a useEffect method. declaring it as variable and invoking it later
    const searchAPI = async () => {
      const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: debounceTerm,
        },
      });
      setResult(data.query.search);
    };

    // run searchAPI only when there's value
    if (debounceTerm) {
      searchAPI();
    }
  }, [debounceTerm]); // useEffect will be invoke when the 2nd argument change.. its the term value

  //useEffect 2nd Argument
  // [empty] = Run at initial render
  // nothing = Run at initial render and Run after every rerender
  // [data] = Run at initial render and Run After every Rerender if data has change since the last render

  // mapping the array from the API call to a new array
  // oldarray.map ((new array name) => { you can use the data from the newaray name with . like newarayname.data.list  })
  const renderTheResult = result.map((resultItem) => {
    return (
      <div className="item" key={resultItem.pageid}>
        <div className="right floated content">
          <a
            className="ui button"
            href={`https://en.wikipedia.org?curid=${resultItem.pageid}`}
            target="_blank"
          >
            More info...
          </a>
        </div>
        <div className="content">
          <div className="header">{resultItem.title}</div>
          <span dangerouslySetInnerHTML={{ __html: resultItem.snippet }}></span>
          <br />
        </div>
      </div>
    );
  });

  return (
    <React.Fragment>
      <div className="ui form">
        <div className="field">
          <label> Enter search term </label>
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="input"
          />
        </div>
      </div>

      <div className="ui celled list">{renderTheResult}</div>
    </React.Fragment>
  );
};

export default Search;
