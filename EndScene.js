class EndScene extends Phaser.Scene {
    constructor() {
    super({ key: 'EndScene' });
    }
    
    preload() {
     
    }
    
    create() {
        this.add.text( 50, 100, 'GAME OVER', { fontFamily: 'Georgia', fontSize: '40px', fill: '#e00000' });

        this.add.text( 110, 240, 'Click to restart!', {fontFamily: 'Georgia', fill: '#fffb22', fontSize: '30px'})
   
      this.input.on('pointerdown', () => {
      this.scene.stop('EndScene')
      this.scene.start('IntroScene')
      gameState.score = 0;
      gameState.lives = 3;

    })
    
    }
    
    update() {
    
      
    }
    }