import { useEffect, useRef } from "react";
import RegularButton from "./RegularButton";

export default function GameOver({handleClick}) {
    const sectionRef = useRef(null);

    useEffect(() => {
        sectionRef.current.focus();
    })

    return (
        <div className="wrapper wrapper--accent" ref={sectionRef} tabIndex={-1}>
            
            <p className="p--large">
                "You've matched all the memory cards!"
            </p>

            <RegularButton handleClick={handleClick} >
                Play again
            </RegularButton>
        </div>
    )
}


