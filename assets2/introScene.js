class IntroScene extends Phaser.Scene {
	constructor() {
	  super({ key: 'introScene' });
	}
  
	preload() {
   
  }
  
	create() {
        this.add.text( 150, 250, 'Click to start!', {fill: '#000000', fontSize: '20px'})
		this.input.on('pointerdown', () => {
			this.scene.stop('introScene')
			this.scene.start('GameScene')
		})
	  
	}
  
	update() {
	  
        
	}
  }