import "./App.css";
import { useState } from "react";
import { evaluate } from "mathjs";

function Key({ keyValue, theme, isResetKey, isEqualsKey, isDelKey, onClick }) {
  return (
    <div
      className={
        isResetKey
          ? "key resetKey " + theme
          : isEqualsKey
          ? "key equalsKey " + theme
          : isDelKey
          ? "key delKey " + theme
          : "key " + theme
      }
      onClick={() => onClick(keyValue)}
    >
      {keyValue}
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState("one");
  const [themeValue, setThemeValue] = useState(1);
  const [screenValue, setScreenValue] = useState("");

  function processClick(clickedValue) {
    if (screenValue == "UNDEFINED") {
      console.log("hits here");
      setScreenValue("");
    } else {
      switch (clickedValue) {
        case "=":
          let result = "";
          try {
            result = evaluate(screenValue) + "";
          } catch (error) {
            console.log("error caught: " + error);
            result = "UNDEFINED";
          }
          // console.log(result ? "true" : "false");
          setScreenValue(result);
          break;
        case "DEL":
          setScreenValue(screenValue.slice(0, screenValue.length - 1));
          break;
        case "RESET":
          setScreenValue("");
          break;
        case "x":
          setScreenValue(screenValue + "*");
          break;
        default:
          setScreenValue(screenValue + clickedValue);
          break;
      }
    }
    console.log(screenValue);
  }

  function filterMe(toggleValue) {
    toggleValue = parseInt(toggleValue, 10);
    setThemeValue(toggleValue);
    switch (toggleValue) {
      case 1:
        setTheme("one");
        break;
      case 2:
        setTheme("two");
        break;
      case 3:
        setTheme("three");
        break;
    }
  }

  return (
    <div className={"mainContainer " + theme}>
      <div className="header">
        <h1>calc</h1>
        <div className="themeArea">
          <p>THEME</p>
          <div className="toggleArea">
            <div className="sliderLabels">
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </div>
            <div className="slider">
              <input
                type="range"
                name="theme"
                onChange={(event) => filterMe(event.target.value)}
                min={1}
                step={1}
                id="sliders"
                className={theme}
                max={3}
                value={themeValue}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={"screen " + theme}>{screenValue}</div>
      <div className={"keypad " + theme}>
        <Key keyValue={"7"} theme={theme} onClick={processClick} />
        <Key keyValue={"8"} theme={theme} onClick={processClick} />
        <Key keyValue={"9"} theme={theme} onClick={processClick} />
        <Key
          keyValue={"DEL"}
          isDelKey={true}
          theme={theme}
          onClick={processClick}
        />
        <Key keyValue={"4"} theme={theme} onClick={processClick} />
        <Key keyValue={"5"} theme={theme} onClick={processClick} />
        <Key keyValue={"6"} theme={theme} onClick={processClick} />
        <Key keyValue={"+"} theme={theme} onClick={processClick} />
        <Key keyValue={"1"} theme={theme} onClick={processClick} />
        <Key keyValue={"2"} theme={theme} onClick={processClick} />
        <Key keyValue={"3"} theme={theme} onClick={processClick} />
        <Key keyValue={"-"} theme={theme} onClick={processClick} />
        <Key keyValue={"."} theme={theme} onClick={processClick} />
        <Key keyValue={"0"} theme={theme} onClick={processClick} />
        <Key keyValue={"/"} theme={theme} onClick={processClick} />
        <Key keyValue={"x"} theme={theme} onClick={processClick} />
        <Key
          keyValue={"RESET"}
          theme={theme}
          isResetKey={true}
          onClick={processClick}
        />
        <Key
          keyValue={"="}
          theme={theme}
          isEqualsKey={true}
          onClick={processClick}
        />
      </div>
    </div>
  );
}

export default App;
