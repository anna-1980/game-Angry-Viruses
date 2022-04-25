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
                let welcomeText = this.add.text(195, 50, `Welcome ${gameState.playerName}`, { fill: '#385129', fontSize: '30px '}).setOrigin(0.5, 0.5);
        // this.add.rectangle(0, 0, 500, 5000, 0x124282).setOrigin(0, 0);

 

      //game controls
        this.add.text( 85, 220, 'Game controls:', {fontFamily: 'Georgia', fill: '#dfff87', fontSize: '22px'});
        this.add.text( 85, 250, '← left arrow key to move left', {fontFamily: 'Georgia', fill: '#385129', fontSize: '18px'});
        // const left = this.add.text( 115, 258, '⬅️', {fontFamily: 'Georgia', fill: '#68f5ff', fontSize: '18px'}).setInteractive();
        this.add.text( 85, 275, '→ right arrow key to move right', {fontFamily: 'Georgia', fill: '#385129', fontSize: '18px'});
        // const right = this.add.text( 115, 292, '➡️', {fontFamily: 'Georgia', fill: '#68f5ff', fontSize: '18px'}).setInteractive();
        this.add.text( 85, 300, ' _ press space bar key to fire', {fontFamily: 'Georgia', fill: '#385129', fontSize: '18px'});
       
       
       //how to play
        this.add.text( 85, 95, 'How to play:', {fontFamily: 'Georgia', fill: '  #dfff87  ', fontSize: '22px'});
        this.add.text( 85, 125, ' - avoid enemies and drops', {fontFamily: 'Georgia', fill: '#385129', fontSize: '18px'});
        this.add.text( 85, 150, ' - catch a Vaccine to shoot Antibodies', {fontFamily: 'Georgia', fill: '#385129', fontSize: '18px'});
        this.add.text( 85, 175, ' - shoot Viruses with Antibodies', {fontFamily: 'Georgia', fill: '#385129', fontSize: '18px'});
       //how to play

        //start the game  
        gameState.avatar = this.physics.add.image(210, 390, 'avatar').setScale(.5).setInteractive();
        this.add.text( 100, 420, 'Click me to start!', {fontFamily: 'Georgia', fill: '#fffb22', fontSize: '30px'});
        //start the game 
        gameState.avatar.setGravityY(-200);
        gameState.avatar.setCollideWorldBounds(true);

        // left.on('pointerdown', () => {
        //     gameState.avatar.setTint(0xff0000);
        //     gameState.avatar.setVelocityX(-160);
        //     })
            
        // right.on('pointerdown', () => {
        //     gameState.avatar.setVelocityX(160);
        //     })
                
        gameState.avatar.on('pointerdown', () => {
        this.scene.stop('IntroScene')
        this.scene.start('GameScene')
        })


    
    }
    
    update() {
    
      
    }
    }