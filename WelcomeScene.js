class WelcomeScene extends Phaser.Scene {
    constructor() {
    super({ key: 'WelcomeScene' });
    }
    
    preload() {
     this.load.image('avatar', './assets2/avatarSmile.png');
     this.load.image('firstScreen', './assets2/backgroundGreen0.png');
    }
    
    create() {
        this.add.image(0, 0, 'firstScreen').setOrigin(0, 0);
                let welcomeText = this.add.text(210, 50, `Welcome ${gameState.playerName}`, { fill: '#385129', fontSize: '30px '}).setOrigin(0.5, 0.5);
        // this.add.rectangle(0, 0, 500, 5000, 0x124282).setOrigin(0, 0);
        gameState.avatar = this.physics.add.image(210, 180, 'avatar').setScale(.5).setInteractive();
        this.add.text( 100, 220, 'Click me to start!', {fontFamily: 'Georgia', fill: '#fffb22', fontSize: '30px'});
        this.add.text( 133, 265, '  key to move left', {fontFamily: 'Georgia', fill: '#385129', fontSize: '20px'});
        this.add.text( 133, 300, '  key to move right', {fontFamily: 'Georgia', fill: '#385129', fontSize: '20px'});
        this.add.text( 120, 323, 'space bar key to fire', {fontFamily: 'Georgia', fill: '#385129', fontSize: '20px'});
        this.add.text( 100, 368, 'avoid enemies and drops', {fontFamily: 'Georgia', fill: '#D14A0F', fontSize: '20px'});
        this.add.text( 40, 395, ' to shoot Antibodies at the Viruses', {fontFamily: 'Georgia', fill: '#D14A0F', fontSize: '22px'});
        this.add.text( 110, 423, 'catch a VACCINE !!!   ', {fontFamily: 'Georgia', fill: '#fffb22', fontSize: '22px'});
        const left = this.add.text( 115, 268, '⬅️', {fontFamily: 'Georgia', fill: '#68f5ff', fontSize: '20px'}).setInteractive();
        const right = this.add.text( 115, 302, '➡️', {fontFamily: 'Georgia', fill: '#68f5ff', fontSize: '20px'}).setInteractive();
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


    
    }
    
    update() {
    
      
    }
    }