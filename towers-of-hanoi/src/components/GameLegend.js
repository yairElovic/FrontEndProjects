import React from 'react';
import './GameLegend.css';

const calculateIdealMoves = n => {
    return 2 ** n - 1; // calculating the total moves
}

const calculateDiskMoves = (n, i) =>{
        console.log('in the disk moves');
        return 2 ** (n - i); // algorithm for the amount of moves each disk needs 
    } 

function GameLegend({ numDisks }) {
    const idealMoves = calculateIdealMoves(numDisks);
    const diskMoves = Array.from({ length: numDisks }, (_, i) => ({
        disk: i + 1,
        moves: calculateDiskMoves(numDisks, i + 1)
    }));

    return (
        <div className="game-legend">
            <h3>Helpful Tips</h3>
            <p>Ideal number of moves: {idealMoves}</p>
            <ul>
                {diskMoves.map(disk => (
                    <li key={disk.disk}>Disk {disk.disk}: {disk.moves} {disk.moves === 1? 'move':'moves'}</li>
                ))}
            </ul>
        </div>
    );
}

export default GameLegend;
