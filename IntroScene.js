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
		this.add.rectangle(50, 195, 350, 148, '#000000', 0.5).setOrigin(0, 0);
		this.add.text(210, 220, `Leader board:`, { fill: '#fffb22', fontSize: '22px '}).setOrigin(0.5, 0.5);
     
 

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


let scores = fetch(`https://wbs-final-game-back.herokuapp.com/api/scores/Angry Viruses`)
.then((response) => response.json())
.then(scores => {
	console.log(scores)
	// let player1 = `${(scores[0].playerName)}  ${(scores[0].score)}`;
	// console.log(player1)
	gameState.bestScorePlayer1 = (scores[0].score);
	gameState.bestScorePlayer1Name = (scores[0].playerName);
	gameState.bestScorePlayer2 = (scores[1].score);
	gameState.bestScorePlayer2Name = (scores[1].playerName);
	gameState.bestScorePlayer3 = (scores[2].score);
	gameState.bestScorePlayer3Name = (scores[2].playerName);
  console.log('more stuff to log')
	console.log(gameState.bestScorePlayer1);
	console.log(gameState.bestScorePlayer1Name);

	this.add.text(220, 250, `${gameState.bestScorePlayer1Name} `, { fill: '#fcff95', fontSize: '20px '}).setOrigin(1, 0.5);
  this.add.text(240, 250, `${gameState.bestScorePlayer1}`, { fill: '#fcff95', fontSize: '20px '}).setOrigin(0, 0.5);
  this.add.text(310, 250, `points`, { fill: '#fcff95', fontSize: '20px '}).setOrigin(0, 0.5);

	this.add.text(220, 280, `${gameState.bestScorePlayer2Name} `, { fill: '#fcff95', fontSize: '20px '}).setOrigin(1, 0.5);
  this.add.text(240, 280, `${gameState.bestScorePlayer2}`, { fill: '#fcff95', fontSize: '20px '}).setOrigin(0, 0.5);
  this.add.text(310, 280, `points`, { fill: '#fcff95', fontSize: '20px '}).setOrigin(0, 0.5);

	this.add.text(220, 310, `${gameState.bestScorePlayer3Name} `, { fill: '#fcff95', fontSize: '20px '}).setOrigin(1, 0.5);
  this.add.text(240, 310, `${gameState.bestScorePlayer3}`, { fill: '#fcff95', fontSize: '20px '}).setOrigin(0, 0.5);
  this.add.text(310, 310, `points`, { fill: '#fcff95', fontSize: '20px '}).setOrigin(0, 0.5);
 
  })
// .then(data => console.log(data))
// console.log(`from fetch request ${scores}`)
.catch((error) => console.log(`That is why: ${error}`));


console.log(gameState.bestScorePlayer1);
console.log('sfter fetch and checking GameState');
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
	// console.log(highScores);
	// console.log(highScores[0]);
  
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