const gameState = {
  enemyVelocity: 0.5,
  gameName: 'Angry Viruses',
  score: 0,
  lives: 3,
  highScore: localStorage.getItem('bestScore') || 1,
  playerName: localStorage.getItem('Player-Name') || "Anna",  
  bestScorePlayer1: '', 
  bestScorePlayer1name: '', 
  vaccine: false,
   
};

// const scores = ({playerName}) => {
//   // console.log(`Gel all scores: ${playerName}`);
// }
// // fetch(`http://localhost:5000/api/scores/${gameState.gameName}`)

// fetch(`https://wbs-final-game-back.herokuapp.com/api/scores`)
// .then((response) => response.json())
// .then((data) => scores(data))
// .catch((error) => console.log(`That is why: ${error}`));

  // Helper Methods below:
  // sortedEnemies() returns an array of enemy sprites sorted by their x coordinate
  function sortedEnemies(){
    const orderedByXCoord = gameState.enemies.getChildren().sort((a, b) => a.x - b.x);
    return orderedByXCoord;
    }
    // numOfTotalEnemies() returns the number of total enemies 
    function numOfTotalEnemies() {
      const totalEnemies = gameState.enemies.getChildren().length;
    return totalEnemies;
    }
 
 

  const config = {
    type: Phaser.AUTO,
    parent: 'game3',
    scale: {
      width: 450,
      height: 500,
      mode: Phaser.Scale.FIT,
      // autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    dom: {
      createContainer: true
   },
    backgroundColor: "1c529e",
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 200 },
        enableBody: true,
 
        pixelArt: false,
        
 
      }
    },
    scene: [IntroScene, WelcomeScene, GameScene, EndScene]
  };

const game = new Phaser.Game(config);

const playerName = document.querySelector(".playerName");

// playerName.addEventListener("keyup", (e) => {
//   if (e.key === "Enter") {
//     console.log('new player enter');
//     addPlayer();
//   }
// });

