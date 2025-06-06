import { useEffect, useState } from "react"
import Form from "./components/Form";
import MemoryCard from "./components/MemoryCard";
import AssistiveTechInfo from "./components/AssistiveTechInfo";
import GameOver from "./components/GameOver";
import ErrorCard from "./components/ErrorCard";

function App() {

  const initialFormData = {category: "animals-and-nature", number: 10}

  const [formData, setFormData] = useState(initialFormData)

  const [isGameOn, setIsGameOn] = useState(false);
  const [emojiData, setEmojiData] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatcedCards] = useState([]);
  const [areAllCardsMatched, setAreAllCardsMatched] = useState(false);
  const [isError, setIsError] = useState(false)
  const [isFirstRender, setIsFirstRender] = useState(true)

  useEffect(() => {
    if (emojiData.length && matchedCards.length === emojiData.length) {
      setAreAllCardsMatched(true);
      console.log(`GAME OVER: ${areAllCardsMatched}`)
    }
  }, [matchedCards])


  useEffect(() => {
    if (selectedCards.length === 2 && selectedCards[0].name === selectedCards[1].name) {
      setMatcedCards(prev => [...prev, ...selectedCards])
    }
  }, [selectedCards])

  function handleFormChange(e) {
    setFormData(prev => ({...prev, [e.target.name] : e.target.value}))
  }

  async function startGame(e) {
    e.preventDefault();

    try {
      const response = await fetch(`https://emojihub.yurace.pro/api/all/category/${formData.category}`);
      
      if (!response.ok) {
        throw new Error('Could not fetch data from API');
      } 
      
      const data = await response.json();
      const dataSlice = getDataSlice(data);
      const emojisArray = getEmojisArray(dataSlice)
      
      setEmojiData(emojisArray);
      setIsGameOn(true);
    } catch (error) {
        console.log(error)
        setIsError(true)
    } finally {
        setIsFirstRender(false)
    }
  }

  function getDataSlice(data) {
    const randomIndices = getRandomIndices(data);

    return randomIndices.map(index => data[index])
  }
  
  function getRandomIndices(data) {        
    const randomIndicesArray = []

    for (let i = 0; i < (formData.number / 2); i++) {
        const randomNum = Math.floor(Math.random() * data.length)
        if (!randomIndicesArray.includes(randomNum)) {
            randomIndicesArray.push(randomNum)
        } else {
            i--
        }
    }
    
    return randomIndicesArray
}

  function getEmojisArray(data) {
    const pairedEmojisArray = [...data, ...data];

    for (let i = pairedEmojisArray.length -1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i+1));
      let k = pairedEmojisArray[i];
      pairedEmojisArray[i] = pairedEmojisArray[j];
      pairedEmojisArray[j] = k;
    }

    return pairedEmojisArray
  }


  function turnCard(name, index){
    if (selectedCards.length < 2) {
      setSelectedCards(prev => [...prev, {name, index}]);
    } else if (selectedCards.length === 2) {
      setSelectedCards([{name, index}]);
    }
  }

  function resetGame() {
    setIsGameOn(false);
    setSelectedCards([])
    setMatcedCards([])
    setAreAllCardsMatched(false)
  }

  function resetError() {
    setIsError(false)
  }


  return (
    <>
      <main>
        <h1>Memory Game</h1>
        {!isGameOn && !isError && 
          <Form 
            handleSubmit={startGame} 
            handleChange={handleFormChange}
            isFirstRender={isFirstRender}
          />}

        {isGameOn && !areAllCardsMatched && 
          <AssistiveTechInfo 
            emojisData={emojiData} 
            mathcedCards={matchedCards}
            />
        }

        {areAllCardsMatched && 
          <GameOver
            handleClick={resetGame}
          />}
        
        {isGameOn && <MemoryCard 
          data={emojiData}
          handleClick={turnCard} 
          selectedCards={selectedCards}
          matchedCards={matchedCards}
          />}

          {isError && <ErrorCard handleClick={resetError} />}
      </main>
    </>
  )
}

export default App