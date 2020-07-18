import React from "react";

const Weather = (props) => {
  return (
    <div className="container text-light">
      <div className="cards pt-4">
        <h1>{props.city}</h1>
        <h5 className="py-4">
          <i className={`wi ${props.weathericon} display-1`} />
        </h5>
        {props.celsius ? <h1 className="py2">{props.celsius}&deg;</h1> : null}

        {minimaxTemp(props.temp_min, props.temp_max)}

        <h4 className="py3">{props.description}</h4>
      </div>
    </div>
  );
};

function minimaxTemp(min, max) {
  if (min && max) {
    return (
      <h3>
        <span className="px4">{min}&deg;</span>
        <span className="px4">{max}&deg;</span>
      </h3>
    );
  }
}

export default Weather;
