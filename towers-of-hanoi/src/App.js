
import {useState, useEffect} from "react";
import './App.css';
import GameLegend from './components/GameLegend';

function App() {
  const[selectedDisk, setSelectedDisk] = useState(null);
  const[fromRod, setFromRod] = useState(null);
  const[numDisks, setNumDisks] = useState(3);
  const [promptOpen, setPromptOpen] = useState(true);
  const [rods, setRods] = useState({
    rodA: [],
    rodB: [],
    rodC: []
});

let[currentMoveCount, setCurrentMoveCount] = useState(0);

useEffect(() => {
  if (promptOpen) {
    requestDiskNumber();
  }
}, [promptOpen]);

useEffect(() =>{
  if(!promptOpen){
    initializeDisks(numDisks);
  }
},[promptOpen, numDisks]);

const requestDiskNumber = () => {
  const disks = prompt("Please enter the number of disks:", "3");
  if (disks !== null && !isNaN(disks) && disks > 0) {
    setNumDisks(parseInt(disks, 10));
    setPromptOpen(false); // Close the prompt and initialize disks
  }
};

const initializeDisks = (n) => {
    const initialRods = {
      rodA: Array.from({length: n}, (_, i) => n - i).reverse(),
      rodB: [],
      rodC: []
    };
    setRods(initialRods);
};

const handleDiskClicked = (disk, rod) =>{
  if(!selectedDisk){
    setSelectedDisk(disk);
    setFromRod(rod);
  }
}

const handleRodClicked = (rod) =>{
  if(selectedDisk && fromRod){
    const newRods = {...rods};
    newRods[fromRod] = newRods[fromRod].filter(d => d !== selectedDisk);
    newRods[rod].unshift(selectedDisk);
    setRods(newRods);
    setSelectedDisk(null);
    setFromRod(null);
    setCurrentMoveCount(currentMoveCount + 1);
  }
}

   

return (
  <div className="App">
    <GameLegend numDisks={numDisks}/>
    <div className="header">
    <h1>Tower of Hanoi</h1>
    <h2>Move Count: {currentMoveCount}</h2>
    </div>
    <div className="rods">
      {['rodA', 'rodB', 'rodC'].map(rod => (
        <div key={rod} className="rod" onClick={() => handleRodClicked(rod)}>
          <div className="pole"></div>
          {rods[rod].map((disk, index) => (
            <div key={index} className="disk" style={{ width: 50 + 20 * disk }}
              onClick={ () => handleDiskClicked(disk,rod)}>
              Disk {disk}
            </div>
          ))}
          <div className="base"></div>
        </div>
      ))}
    </div>
    </div>
);
}

export default App;
