class IntroScene extends Phaser.Scene {
  constructor() {
  super({ key: 'IntroScene' });
  }
  
  preload() {
    this.load.html('nameform', './assets2/nameform.html');
	this.load.image('firstScreen', './assets2/backgroundGreen0.png');
	this.load.image('heart', './assets2/heart03.png');


}
  
  create() {
 
    this.add.image(0, 0, 'firstScreen').setOrigin(0, 0);




    //add player name form
    let text = this.add.text(210, 50, 'Please enter your name', { fill: '#385129', fontSize: '20px '}).setOrigin(0.5, 0.5);
    this.add.text(210, 150, '..and press enter', { fill: '#385129', fontSize: '20px '}).setOrigin(0.5, 0.5);
    let nameInput = this.add.dom(220, 30).createFromCache('nameform');
    var names = text.eventNames();
    // console.log(nameInput);

     
 

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

let highScores =  0
let scores = fetch(`https://wbs-final-game-back.herokuapp.com/api/scores/Angry Viruses`)
.then((response) => response.json())
.then(scores => {
	console.log(scores)
	console.log('more stuff to log')
  
})
// .then(data => console.log(data))
// console.log(`from fetch request ${scores}`)
.catch((error) => console.log(`That is why: ${error}`));
console.log(highScores)
 
 
// fetch(`http://localhost:5000/api/scores/${gameState.gameName}`)

const api_url = 
      "https://wbs-final-game-back.herokuapp.com/api/scores/Angry Viruses";

// async function getScores(url){
// 	const response = await fetch(url);
// 	let data = await response.json();
// 	// console.log(data);
// 	highScores.push = data
// 	}
   
// 	getScores(api_url);
//   const winners = highScores.length;
	console.log(highScores);
	console.log(highScores[0]);
  
// const promiseFromFetch = fetch('https://wbs-final-game-back.herokuapp.com/api/scores/Angry Viruses');
// console.log(promiseFromFetch);

// const promiseFromJSON = promiseFromFetch.then(
//   response => response.json(),
//   error => console.log(error)
// );
// console.log(promiseFromJSON);
// promiseFromJSON.then(posts => console.log(posts)).catch(error => console.log(error));	


	}
 
  update() {
    // if (gameState.playerName !== '' ) {
    //   this.add.text(210, 50, `Welcome ${gameState.playerName}` , { fill: '#b5e6fd', fontSize: '20px '}).setOrigin(0.5, 0.5);
    //   console.log(gameState.playerName);
    // } else {
      
    // }
    
  }
  }