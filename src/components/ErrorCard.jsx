import { useEffect, useRef } from "react";
import RegularButton from "./RegularButton";

export default function ErrorCard({handleClick}) {
    const errorRef = useRef(null);

    useEffect(() => {
        errorRef.current.focus()
    })

    return (
        <div className="wrapper wrapper--accent" ref={errorRef} tabIndex={-1}>
            <p className="p--large">
                "Sorry, there was an error."
            </p>
            <p className="p--regular">
                "Please come back later or click the button below to try restarting the game."
            </p>
            <RegularButton handleClick={handleClick}>
                "Reset Game"
            </RegularButton>
        </div>
    )
}