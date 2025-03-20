import { useEffect, useRef } from "react";
import RegularButton from "./RegularButton";

export default function GameOver({handleClick}) {
    const sectionRef = useRef(null);

    useEffect(() => {
        sectionRef.current.focus();
    })

    return (
        <div className="wrapper wrapper--accent" ref={sectionRef} tabIndex={-1}>
            <p className="p--large">"You've matched all the memory cards!"</p>
            <RegularButton handleClick={handleClick} >
                Play again
            </RegularButton>
        </div>
    )
}



    /**
     * Challenge:
     * 1) Using the useRef hook, the useEffect hook, the .focus() method and the tabIndex attribute, add focus to the div when this component renders.
     * 2) Play a memory game to check that your code is working.
     * 
     * ⚠️ Warning: Use keyboard navigation to see your browser's default focus styling on the div.
     */