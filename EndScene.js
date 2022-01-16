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
   
      this.input.on('pointerdown', () => {
      // this.scene.stop('EndScene')
      // this.scene.start('IntroScene')
      gameState.score = 0;
      gameState.lives = 3;

    })
    
 

    }
    
    update() {
    
      
    }
    }