import { useEffect, useState } from "react"
import Form from "./components/Form";
import MemoryCard from "./components/MemoryCard";

function App() {
const [isGameOn, setIsGameOn] = useState(false);
const [emojiData, setEmojiData] = useState([]);
const [selectedCards, setSelectedCards] = useState([]);
const [matchedCards, setMatcedCards] = useState([]);
const [isGameOver, setGameOver] = useState(false);

useEffect(() => {
  if (emojiData && matchedCards.length === emojiData.length) {
    setGameOver(true);
    console.log(`GAME OVER: ${isGameOver}`)
  }
}, [matchedCards])


useEffect(() => {
  if (selectedCards.length === 2 && selectedCards[0].name === selectedCards[1].name) {
    setMatcedCards(prev => [...prev, ...selectedCards])
  }
}, [selectedCards])

async function startGame(e) {
  e.preventDefault();

  try {
    const response = await fetch("https://emojihub.yurace.pro/api/all/category/animals-and-nature");
    
    if (!response.ok) {
      throw new Error('Could not fetch data from API');
    } 
    
    const data = await response.json();
    const dataSlice = getDataSlice(data);
    const emojisArray = getEmojisArray(dataSlice)
    
    setEmojiData(emojisArray);
    setIsGameOn(true);

  } catch (error) {
    console.error(error.message);
  }
}

function getDataSlice(data) {
  const randomIndices = getRandomIndices(data);

  return randomIndices.map(index => data[index])
}

function getRandomIndices(data) {
  const max = data.length;
  const randomIndicesArray = [];

  for (let i = 0; i < 5; i++) {
    const newId = Math.floor(Math.random() * max);
    if (!(newId in randomIndicesArray)) {
      randomIndicesArray.push(newId)
    } else {
      i--;
    }
  }

  return randomIndicesArray;
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

  return (
    <>
      <main>
        <h1>Memory Game</h1>
        {!isGameOn && <Form handleSubmit={startGame} />}
        {isGameOn && <MemoryCard 
          data={emojiData}
          handleClick={turnCard} 
          selectedCards={selectedCards}
          matchedCards={matchedCards}
          />}
      </main>
    </>
  )
}

export default App
