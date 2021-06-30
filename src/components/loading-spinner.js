import React from "react";
import "./components.css";

function LoadingSpinner() {
    return (
            <img className={"absolute-center"}
                 alt="loading"
                 src={"https://media.giphy.com/media/pf4xLNTrRFnYxJLYid/giphy.gif"}
            />
    )
}

export {LoadingSpinner}
