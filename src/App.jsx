import { useState } from "react"
import Form from "./components/Form";
import MemoryCard from "./components/MemoryCard";

function App() {
const [isGameOn, setIsGameOn] = useState(false);
const [emojiData, setEmojiData] = useState([]);

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

function turnCard(){
  console.log("Memory card clicked");
}


  return (
    <>
      <main>
        <h1>Memory Game</h1>
        {!isGameOn && <Form handleSubmit={startGame} />}
        {isGameOn && <MemoryCard data={emojiData} handleClick={turnCard} />}
      </main>
    </>
  )
}

export default App

    /**
     * Challenge:

     * 3) Map over "randomIndices" and use the random numbers stored in this array to create a new array of random emojis selected from "data". Store this new array in a variable called "dataSlice" and return it at the bottom of the function.
     * 4) Inside the try block of the "startGame" function, make a call to "getDataSlice", passing "data" as an argument. Save the return value in a variable called "dataSlice".
     * 5) Delete the "dataSample" variable and replace "dataSample" with the new "dataSlice" variable in the "setEmojisData" function.
     * 6) Run the code and start a new game to check that your code is working.
    */  
    