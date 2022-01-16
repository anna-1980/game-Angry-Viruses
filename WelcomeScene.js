class WelcomeScene extends Phaser.Scene {
    constructor() {
    super({ key: 'WelcomeScene' });
    }
    
    preload() {
     this.load.image('avatar', './assets2/avatar01.png');

    }
    
    create() {
        this.add.rectangle(0, 0, 500, 5000, 0x124282).setOrigin(0, 0);
        gameState.avatar = this.physics.add.image(210, 200, 'avatar').setScale(.4).setInteractive();
        this.add.text( 100, 240, 'Click me to start!', {fontFamily: 'Georgia', fill: '#fffb22', fontSize: '30px'});
        this.add.text( 120, 285, '⬅️ key to move left', {fontFamily: 'Georgia', fill: '#68f5ff', fontSize: '20px'});
        this.add.text( 120, 320, '➡️ key to move right', {fontFamily: 'Georgia', fill: '#68f5ff', fontSize: '20px'});
        this.add.text( 120, 350, 'space bar key to fire', {fontFamily: 'Georgia', fill: '#68f5ff', fontSize: '20px'});
        this.add.text( 100, 380, 'avoid enemies and drops', {fontFamily: 'Georgia', fill: '#ffcf02', fontSize: '20px'});
        const left = this.add.text( 20, 400, '⬅️', {fontFamily: 'Georgia', fill: '#68f5ff', fontSize: '20px'}).setInteractive();
        const right = this.add.text( 400, 400, '➡️', {fontFamily: 'Georgia', fill: '#68f5ff', fontSize: '20px'}).setInteractive();
        gameState.avatar.setGravityY(-200);
        gameState.avatar.setCollideWorldBounds(true);

        left.on('pointerdown', () => {
            gameState.avatar.setTint(0xff0000);
            gameState.avatar.setVelocityX(-160);
            })
            
        right.on('pointerdown', () => {
            gameState.avatar.setVelocityX(160);
            })
                
        gameState.avatar.on('pointerdown', () => {
        this.scene.stop('IntroScene')
        this.scene.start('GameScene')
        })

        let welcomeText = this.add.text(210, 50, `Welcome ${gameState.playerName}`, { fill: '#b5e6fd', fontSize: '30px '}).setOrigin(0.5, 0.5);
    
    }
    
    update() {
    
      
    }
    }