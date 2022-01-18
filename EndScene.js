class EndScene extends Phaser.Scene {
    constructor() {
    super({ key: 'EndScene' });
    }
    
    preload() {
      this.load.image('start', './assets2/startButton.png');
      this.load.image('goBack', './assets2/GoBackRed.png');


     
    }
    
    create() {
        this.add.rectangle(0, 0, 500, 5000, 0x4e0a83).setOrigin(0, 0);
        this.add.text( 100, 100, 'GAME OVER', { fontFamily: 'Georgia', fontSize: '40px', fill: '#cd2220' });
        const startB = this.add.image(300, 300, 'start').setOrigin(0, 0).setScale(0.3).setInteractive();
        const goBack =this.add.image(50, 300, 'goBack').setOrigin(0, 0).setScale(0.3).setInteractive();
        
        let newBestPlayer = localStorage.getItem('Player-Name');
    
        const bestScoreText = localStorage.getItem('bestScore');
        const bestScore = bestScoreText && parseInt(bestScoreText, 10);
        console.log(gameState.score);
        // localStorage.setItem ('bestScore', gameState.score);
        if (!bestScore || gameState.score > bestScore){
          localStorage.setItem('bestScore', gameState.score);
          gameState.highScore = localStorage.getItem('bestScore');
          localStorage.setItem('Best-Player', newBestPlayer);
          
        }



        startB.on('pointerdown', () => {
          this.scene.stop('EndScene')
          this.scene.start('GameScene')
          gameState.score = 0;
          gameState.lives = 3;
        })
        goBack.on('pointerdown', () => {
          this.scene.stop('EndScene')
          this.scene.start('IntroScene')
        })

        this.add.text( 110, 360, 'Click to restart!', {fontFamily: 'Georgia', fill: '#fffb22', fontSize: '30px'})
        this.add.text( 110, 190, `${gameState.playerName}`, {fontFamily: 'Georgia', fill: '#fffb22', fontSize: '30px'})
        this.add.text( 100, 240, ` your Score is : ${gameState.score}`, {fontFamily: 'Georgia', fill: '#fffb22', fontSize: '30px'})
   

        if (gameState.score >= gameState.highScore){
          this.add.text( 50, 250, `NEW High Score: ${gameState.highScore} by: ${newBestPlayer}`, { fontFamily: 'Georgia', fontSize: '25px', fill: '#ffd342' });
          this.add.text( 50, 300, `Congratulations: ${newBestPlayer}`, { fontFamily: 'Georgia', fontSize: '25px', fill: '#ffd342' });
          
        } else {
          gameState.scoreText = this.add.text(50, 260, 'Score: 0', { fontFamily: 'Georgia', fontSize: '20px', fill: '#ffd342' });
          gameState.scoreText.setText(`Your Score ${localStorage.getItem('Player-Name')}: ${gameState.score}`);
          this.add.text( 50, 300, `Highest Score: ${gameState.highScore} by ${gameState.bestScorePlayer}`, { fontFamily: 'Georgia', fontSize: '25px', fill: '#ffd342' });
        
  
        }



      this.input.on('pointerdown', () => {
      // this.scene.stop('EndScene')
      // this.scene.start('IntroScene')
      gameState.score = 0;
      gameState.lives = 3;


  //     fetch('http://localhost:5000/api/scores', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     game: `${gameState.gameName}`,
  //     playerName: `${gameState.score}`,
  //     score: `${gameState.highScore}`}) 

  // }).then((response) => response.json())
  //   .then((data) =>console.log(data))
  //   .catch( (error) =>console.warn('Something went wrong.', error));
 

    fetch('https://wbs-final-game-back.herokuapp.com/api/scores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        game: `${gameState.gameName}`,
        playerName: `${gameState.playerName}`,
        score: `${gameState.score}`}) 
  
    }).then((response) => response.json())
      .then((data) =>console.log(data))
      .catch( (error) =>console.warn('Something went wrong.', error));
 
     



    })
    
 

    }
    
    update() {
    
      
    }
    }