export default function AssistiveTechInfo({emojisData, mathcedCards}) {
    return (
        <section className="sr-only" aria-live="polite" aria-atomic="true">
            <h2>"Game Status"</h2>
            <p>"Number of mathced pairs: {mathcedCards.length / 2}."</p>
            <p>"Number of cards left to match: {emojisData.length - mathcedCards.length}."</p>
        </section>
    )
}