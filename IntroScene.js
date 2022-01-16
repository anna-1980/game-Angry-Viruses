class IntroScene extends Phaser.Scene {
  constructor() {
  super({ key: 'IntroScene' });
  }
  
  preload() {
    this.load.html('nameform', './nameform.html');
  }
  
  create() {
  //   this.add.image(225, 200, 'avatar').setScale(.4).setInteractive();
  //   this.add.text( 110, 240, 'Click to start!', {fontFamily: 'Georgia', fill: '#fffb22', fontSize: '30px'})
  //   this.add.text( 110, 285, '⬅️ key to move left', {fontFamily: 'Georgia', fill: '#68f5ff', fontSize: '20px'})
  //   this.add.text( 110, 320, '➡️ key to move right', {fontFamily: 'Georgia', fill: '#68f5ff', fontSize: '20px'})
  //   this.add.text( 110, 350, 'space bar key to fire', {fontFamily: 'Georgia', fill: '#68f5ff', fontSize: '20px'})
  //   this.add.text( 100, 380, 'avoid enemies and drops', {fontFamily: 'Georgia', fill: '#ffcf02', fontSize: '20px'})
  //  console.log(`input ${gameState}`)
    // this.input.on('pointerdown', () => {
    //   this.scene.stop('IntroScene')
    //   this.scene.start('GameScene')
    // })
    // console.log(this.scene);
    
    //add player name form
    let text = this.add.text(210, 50, 'Please enter your name', { fill: '#b5e6fd', fontSize: '20px '}).setOrigin(0.5, 0.5);
    let nameInput = this.add.dom(220, 30).createFromCache('nameform');
    var names = text.eventNames();
    console.log(nameInput);

     
 

    nameInput.addListener('keyup');

    nameInput.on('keyup', function (event) {
			// console.log(event.target);
			if (event.target.name === 'nameField' && event.key === "Enter")
			{ 
				var inputText = this.getChildByName('nameField');
				//  Have they entered anything?
        console.log(event);
				if (inputText.value !== '' )
				{
					//  Turn off the click events
					this.removeListener('keyup');
					
					//  Populate the text with whatever they typed in
					// text.setText('Welcome ' + inputText.value);
          text.setAlpha(0);
					//  Hide the login nameInput
					this.setVisible(false);

		      localStorage.setItem('Player-Name', inputText.value);
					gameState.playerName = inputText.value;
                    // console.log(gameState);
          // welcomeText.setText(`Welcome ${gameState.playerName}`)          
			    console.log(this.text);     
              // this.scene.add.text(100, 380, 'avoid enemies and drops', {fontFamily: 'Georgia', fill: '#ffcf02', fontSize: '20px'})    ;
              this.scene.scene.stop('IntroScene');
              this.scene.scene.start('WelcomeScene');

            }
				else
				{
					//  Flash the prompt
					this.scene.tweens.add({
						targets: text,
						scaleX: 1.2,
						scaleY: 1.2,
						onStart: function () {
							// setColor('#800000')
							text.setTint(0xff0000);
						 } ,
						setTint: ('#800000'),
						alpha: 0.4,
						duration: 250,
						ease: 'Power3',
						yoyo: true,
						onComplete: function () {
							// setColor('#800000')
							text.setTint(0xb5e6fd);
						 } ,
					});
							}
			}
	
		});
		this.tweens.add({
			targets: nameInput,
			y: 100,
			duration: 3000,
			ease: 'Power3'
		});
  
  }
  
  update() {
    // if (gameState.playerName !== '' ) {
    //   this.add.text(210, 50, `Welcome ${gameState.playerName}` , { fill: '#b5e6fd', fontSize: '20px '}).setOrigin(0.5, 0.5);
    //   console.log(gameState.playerName);
    // } else {
      
    // }
    
  }
  }