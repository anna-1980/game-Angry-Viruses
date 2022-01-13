class IntroScene extends Phaser.Scene {
  constructor() {
  super({ key: 'introScene' });
  }
  
  preload() {
   
  }
  
  create() {
    this.add.text( 110, 240, 'Click to start!', {fontFamily: 'Georgia', fill: '#fffb22', fontSize: '30px'})
    this.add.text( 110, 285, '⬅️ key to move left', {fontFamily: 'Georgia', fill: '#68f5ff', fontSize: '20px'})
    this.add.text( 110, 320, '➡️ key to move right', {fontFamily: 'Georgia', fill: '#68f5ff', fontSize: '20px'})
    this.add.text( 110, 350, 'space bar key to fire', {fontFamily: 'Georgia', fill: '#68f5ff', fontSize: '20px'})
    this.add.text( 100, 380, 'avoid enemies and drops', {fontFamily: 'Georgia', fill: '#ffcf02', fontSize: '20px'})
  this.input.on('pointerdown', () => {
    this.scene.stop('introScene')
    this.scene.start('GameScene')
  })
  
  }
  
  update() {
  
    
  }
  }