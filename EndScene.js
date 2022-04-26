class EndScene extends Phaser.Scene {
    constructor() {
    super({ key: 'EndScene' });
    }
    
    preload() {
      this.load.image('start', './assets2/startButton.png');
      this.load.image('goBack', './assets2/GoBackOgange.png');
      this.load.image('endScreen', './assets2/backgroundGreen0.png');
      this.load.image('avatarSaid', './assets2/avatarSaid.png');
    }
    create() {
      this.add.image(0, 0, 'endScreen').setOrigin(0, 0);


      if ( gameState.bestScorePlayer1 < gameState.score ){
        this.add.text( 90, 190, `${gameState.playerName}`, {fontFamily: 'Georgia', fill: '#fffb22', fontSize: '30px'})
      this.add.text( 80, 240, ` New Best Score ! : ${gameState.score}`, {fontFamily: 'Georgia', fill: '#fffb22', fontSize: '30px'})
      this.add.text( 80, 285, ` Great job ! `, {fontFamily: 'Georgia', fill: '#ff3f08', fontSize: '30px'})
    
      } else {
        this.add.text( 90, 190, `${gameState.playerName}`, {fontFamily: 'Georgia', fill: '#fffb22', fontSize: '30px'})
        this.add.text( 80, 240, ` your Score is : ${gameState.score}`, {fontFamily: 'Georgia', fill: '#fffb22', fontSize: '25px'})
        this.add.text( 45, 285, ` Best score:  ${gameState.bestScorePlayer1Name}     ${gameState.bestScorePlayer1}`, {fontFamily: 'Georgia', fill: '#ff3f08', fontSize: '25px'})
      }
        
        
        if (gameState.lives === 0){
          this.add.image(190, 100, 'avatarSaid').setOrigin(0, 0).setScale(0.5);
          this.add.text( 100, 50, 'You failed...', { fontFamily: 'Georgia', fontSize: '40px', fill: '#cd2220' });
        } else {
          this.add.image(190, 100, 'avatar').setOrigin(0, 0).setScale(0.5);
          this.add.text( 100, 50, 'YOU WON!!!', { fontFamily: 'Georgia', fontSize: '40px', fill: '#cd2220' });
        }

        const startB = this.add.image(300, 340, 'start').setOrigin(0, 0).setScale(0.3).setInteractive();
        const goBack =this.add.image(50, 340, 'goBack').setOrigin(0, 0).setScale(0.3).setInteractive();
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

      this.add.text( 70, 400, 'Click START to try gain or Go back !', {fontFamily: 'Georgia', fill: '#fffb22', fontSize: '20px'})

      this.input.on('pointerdown', () => {
      gameState.score = 0;
      gameState.lives = 3;
      gameState.vaccine = false;
    });

    
    fetch('https://wbs-final-game-back.herokuapp.com/api/scores', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        game: `${gameState.gameName}`,
        playerName: `${gameState.playerName}`,
        score: `${gameState.score}`}) 
      }).then((response) => response.json())
      .then((data) =>console.log(data))
      .catch( (error) =>console.warn('Something went wrong.', error));

     console.log(gameState.bestScorePlayer1);

      }
    update() {

    }
    }