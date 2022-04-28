class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene', config });
  }
  
    
  
  
  preload()
  {
    this.load.image('virus01', './assets2/Virus01.png');
    this.load.image('virus02', './assets2/Virus02.png');
    this.load.image('virus03', './assets2/Virus03.png');
    this.load.image('virus04', './assets2/Virus04.png');
    this.load.image('virus05', './assets2/Virus05.png');
    this.load.image('platform', './assets2/ground02.png');
    this.load.image('background', './assets2/backgroundGreen0.png');
    this.load.image('standOn', './assets2/standingPlatforms.png');
    this.load.image('vaccine', './assets2/Vaccine-03.png');
    // this.load.image('dude', './avatar01.png');
    this.load.image('virusDrop', './assets2/redTriangle.png');
    this.load.image('antibody', './assets2/antibody06.png');
    this.load.image('heart', './assets2/heart03.png');
    this.load.image('left', './assets2/left01.png');
    this.load.image('right', './assets2/right01.png');

    this.load.spritesheet('dude', 
      './assets2/SpriteDude-04.png',
      { frameWidth: 125, frameHeight: 201 }
    );
    this.load.audio('blaster', ['./assets2/public_assets_audio_SoundEffects_blaster.mp3'])
    this.load.audio('squish', ['./assets2/squish06a.mp3'])
    this.load.audio('puff', ['./assets2/puff01.mp3'])
    this.load.audio('auch', ['./assets2/aua02.mp3'])
    this.load.audio('gotit', ['./assets2/cought.mp3'])

  }
  
   
  
  create()
  {
   
   gameState.puff = this.sound.add('puff', { loop: false , volume: 0.5});
   gameState.auch = this.sound.add("auch", { loop: false });
   gameState.gotit = this.sound.add("gotit", { loop: false });
 

    // When gameState.active is true, the game is being played and not over. When gameState.active is false, then it's game over
    gameState.active = true;
     
    
    // When gameState.active is false, the game will listen for a pointerup event and restart when the event happens
    this.input.on('pointerup', () => {
    if (gameState.active === false) {
      // console.log('gameState false')
      // this.scene.restart();
    }
    })
    this.add.text(440, 8, `${gameState.playerName}`, {fontFamily: 'Georgia', fill: '#004f75', fontSize: '20px'}).setOrigin(1, 0)

    // Creating static platforms
    const platforms = this.physics.add.staticGroup();
    platforms.create(225, 530, 'platform').setScale(1).refreshBody();
    this.add.image(225, 250, 'background').setScale(1);
    this.add.image(225, 500, 'standOn').setScale(1);
    
    // Displays the initial number of viruses, this value is initially hardcoded as 24 
    // gameState.scoreText = this.add.text(300, 8, `viruses Left: 32`, { fontFamily: 'Georgia', fontSize: '20px', fill: '#000000' });
    gameState.TotalScore = this.add.text(15, 8,  ` Score: 0` , { fontFamily: 'Georgia', fontSize: '20px', fill: '#cf0707' });
    gameState.livesText = this.add.text(33, 472, `Lives: ${gameState.lives}`, { fontFamily: 'Arial', fontSize: '20px', fill: '#ffee79' });

    // Uses the physics plugin to create dude
    gameState.player = this.physics.add.sprite(200, 250, 'dude')
    .setGravityY(400)
    .setScale(.3)
    .setSize(90, 130)
    .setOffset(21, 70);
    gameState.player.setBounce(0.5);
    // Create Collider objects
    gameState.player.setCollideWorldBounds(true);
  
  //   console.log("animStart");
     this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 2 }),
    frameRate: 10,
    repeat: -1
      });	
    // console.log("middle");
     this.anims.create({
    key: 'turn',
    frames: [ { key: 'dude', frame: 3 } ],
    frameRate: 20
       });
  
     this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 6 }),
    frameRate: 10,
    repeat: -1
       });	
    //   console.log("animEND");
    this.physics.add.collider(gameState.player, platforms);
    

   
const heart = this.add.image(15, 485, 'heart').setOrigin(0.5, 0.5).setScale(0.15);

this.tweens.add({
  targets: heart, 
  scaleX:0.2,
  scaleY:0.2,
  duration: 400,
  ease: 'Sine.easeInOut',
    
  yoyo: true,
  repeat: -1,
  alpha: {value: 1, duration: 300}, 
 
})



gameState.catch = this.physics.add.sprite(80, 50, 'vaccine')
.setOrigin(.5, .5)
.setScale(0.3)
.setSize(90, 200)
.setOffset(25, 240)
.setBounce(1)
// .setCircle(50)
.setVelocity(Phaser.Math.Between(-200, 200), 10);
gameState.catch.setCollideWorldBounds(true);
// gameState.catch.allowRotation(true);

this.physics.add.collider(gameState.catch, platforms);

this.physics.add.collider(gameState.catch, gameState.player, () => {
  console.log(gameState.catch);
  gameState.catch.destroy();
  gameState.player.setTint(0x9BFF0B);
  gameState.player.setScale(0.5);
  gameState.vaccine = true;
  gameState.gotit.play(),
 
  this.time.addEvent({
   targets: gameState.player,
     delay: 250, 
     loop: false,
     completeDelay: 800,
   callback: () => {
    gameState.player.clearTint();
     gameState.player.setScale(.3);
 }, 
 })
 } );

//reacting to game screen width
  this.time.addEvent({
    delay: 300,
    callback: ()=>{
      if(gameState.vaccine === true && gameState.gameWidth < 413)
      {
       
      gameState.antibody.create(gameState.player.x, gameState.player.y, 'antibody').setGravityY(-600).setScale(.25)
      //  console.log('sound') 
      gameState.blaster.play();

    } else{
      if (gameState.gameWidth < 413){
        left.setVisible(true);
          right.setVisible(true);
      }
    }
  },
    loop: true
})




      // create bug list var
   
   const viruses = ['virus01', 'virus02', 'virus03', 'virus04', 'virus05']; 
   let randomVir1 = viruses[Math.floor(Math.random()*viruses.length)]
   let randomVir2 = viruses[Math.floor(Math.random()*viruses.length)]
   let randomVir3 = viruses[Math.floor(Math.random()*viruses.length)]
   let randomVir4 = viruses[Math.floor(Math.random()*viruses.length)]
  //  console.log(randomVir)
   
    
    // Creates cursor objects to be used in update()
    gameState.cursors = this.input.keyboard.createCursorKeys();
  
    // Add new code below:
  //creates rows of enemies
    gameState.enemies = this.physics.add.group();
let yVal
let xVal
    for (yVal = 1; yVal < 2; yVal++){
    for (xVal = 1; xVal < 9 ; xVal++){
    gameState.enemies.create(
    50 * xVal, 
    50 * yVal,  `${randomVir1}` ,
     
     //`${'randomVir'}` 
    ).setScale(.15).setGravityY(-200);
    gameState.enemies.create(
    50 * xVal, 
    100 * yVal,  `${randomVir2}`,
      
    ).setScale(.15).setGravityY(-200);
    
    gameState.enemies.create(
    50 * xVal, 
    150 * yVal, `${randomVir3}` 
    ).setScale(.15).setGravityY(-200);

    gameState.enemies.create(
      50 * xVal, 
      200 * yVal, `${randomVir4}` 
      ).setScale(.15).setGravityY(-200);
  //    console.log(gameState.enemies.children);
    }
   
  }
  
  // create group of pellets
  let pellets =
   this.physics.add.group()
  const genPellet = () => {
    let randomVir = 
    Phaser.Utils.Array.GetRandom(
    gameState.enemies.getChildren()) || 0;
    
    try{
     pellets.create(randomVir.x, 
    randomVir.y, 'virusDrop').setScale(.2)
    // console.log(randomVir)
  } catch (e) {
    console.log(e);
    }
  }
  // create an event loop that continously creates Vir pellets
  gameState.pelletsLoop = 
  this.time.addEvent({
    delay: 300, 
    callback: genPellet,
    callbackScope: this, 
    loop: true
  });
  //collider removes pellets when they hit the gorund
  this.physics.add.collider(pellets, platforms, function(pellet) 
   { pellet.destroy();
   });

   this.physics.add.collider(gameState.enemies, platforms, function(virus, platform) 
   {  
    //  console.log(virus);
     virus.destroy();
    //  this.physics.pause();
 

   });
    
  
   //collider between dude  and the pellets, callback will set the condition to the GAME OVER
   this.physics.add.collider(pellets, gameState.player, ( player, pelet) => {
    //  gameState.active = false;
   
    //  this.physics.pause();
    //  this.add.text(80, 250, 'Game Over\nClick to restart', {fontFamily: 'Georgia', fontSize: '20px', fill: '#e31c60'});
    //  gameState.enemyVelocity = 1;
     pelet.destroy();
     gameState.auch.play(),
     player.setTint(0xff0000),
     player.setScale(0.25),
     this.time.addEvent({
      targets: player,
        delay: 200, 
        loop: false,
        scale: 2,
        completeDelay: 500,
      callback: () => {
        player.clearTint();
        player.setScale(0.3);
    }, 
    })
     gameState.lives -= 1;
     gameState.livesText.setText(`Lives: ${gameState.lives}`);
     if (gameState.lives === 0)
     {this.physics.pause();
      gameState.pelletsLoop.destroy();

      gameState.puff.play(),
     this.time.addEvent({
       delay: 2000, 
         loop: false,
       callback: () => {
         this.physics.pause();
         this.scene.stop('GameScene');
         this.scene.start('EndScene');
         
         }, 
        })
       }


    })
  //create dude's ammo
  gameState.antibody = 
  this.physics.add.group()
  
  //collider between antibody and bug cause bug to dissapear and updates the score
  this.physics.add.collider(gameState.enemies, gameState.antibody, (virus, antibody) => {
   virus.destroy();
   antibody.destroy();
   gameState.puff.play(),
  //  console.log(gameState);
   gameState.score += 25;
  //  gameState.scoreText.setText(`Viruses Left ${numOfTotalEnemies()}`)
   gameState.TotalScore.setText(`Score: ${gameState.score}`)
    
   
    
  
  } );
 
  
  this.physics.add.collider(pellets, gameState.antibody, (pellets, antibody) => {
   
  antibody.destroy();
  pellets.destroy();
  gameState.score += 15;
  // console.log(score2);
  // gameState.scoreText.setText(`Viruses Left ${numOfTotalEnemies()}`)
  gameState.TotalScore.setText(` Score: ${gameState.score}`)
    
  });
  
  gameState.blaster = this.sound.add("blaster", { loop: false });
  gameState.squish = this.sound.add("squish", { loop: false });
  

  console.log(gameState.gameWidth)
 
  // const left = this.add.text( 20, 440, '⬅️', {fontFamily: 'Georgia', fill: '#68f5ff', fontSize: '30px'}).setInteractive();
  // const right = this.add.text( 410, 440, '➡️', {fontFamily: 'Georgia', fill: '#68f5ff', fontSize: '30px'}).setInteractive();
  
const left = this.add.image(30, 448, 'left')
.setOrigin(0.5, 0.5)
.setScale(0.25)
.setInteractive();
const right = this.add.image(420, 448, 'right')
.setOrigin(0.5, 0.5)
.setScale(0.25)
.setInteractive();
 

  left.on('pointerdown', () => {
    gameState.player.setAccelerationX(-8000);
    
    })
  left.on('pointerup', () => {
    gameState.player.setAccelerationX(0);
    
    })
    
  right.on('pointerdown', () => {
    gameState.player.setAccelerationX(8000);
     
    })

    right.on('pointerup', () => {
      gameState.player.setAccelerationX(0);
      
      })

  }
  
  
  update()  
  {



    if (gameState.active) {
    // If the game is active, then players can control dude
    if (gameState.cursors.left.isDown) {
      gameState.player.setVelocityX(-160);
      gameState.player.anims.play('left', true);
      gameState.player.setAccelerationX(0);
    
   
    } else if (gameState.cursors.right.isDown) {
      gameState.player.setVelocityX(160);
      gameState.player.anims.play('right', true);
      gameState.player.setAccelerationX(0);
     
 
   
     } else {
      gameState.player.setVelocityX(0);
      gameState.player.anims.play('turn');
       
  
    }
  
    // Execute code if the spacebar key is pressed
    if (Phaser.Input.Keyboard.JustDown(gameState.cursors.space) && gameState.vaccine === true) {
      gameState.antibody.create(gameState.player.x, gameState.player.y, 'antibody').setGravityY(-600).setScale(.25)
      //  console.log('sound') 
      gameState.blaster.play();
    }
      
    // Add logic for winning condition and enemy movements below:
    if(numOfTotalEnemies() === 0){
    
    gameState.active = false;
    // console.log(gameState.active)
    this.physics.pause();
    
    gameState.enemyVelocity = 1;
    
    this.time.addEvent({
      delay: 3000, 
        loop: false,
      callback: () => {
        this.physics.pause();
        this.scene.stop('GameScene');
        this.scene.start('EndScene');
        
        }, 
       });
       const text = this.add.text(210, 150, 'Great Job', { fontFamily: 'Georgia', fontSize: '30px', fill: '#cd2220' }).setOrigin(0.5, 0.5);

     
       this.tweens.add({
        targets: text, 
        scaleX: 2,
        scaleY: 2,
        delay: 0,
        duration: 550,
        ease: 'Sine.easeInOut',
        velocityY: -550,
        angle: -8,
        yoyo: true,
        // repeat: 2,
        alpha: {value: 0.5, duration: 300}, 
        onComplete: function(){
           
           }
      }) 
  
    
  } else if (numOfTotalEnemies() === 16) {
     
    gameState.enemyVelocity = 3;
    gameState.enemies.getChildren().forEach(
      Virus => {
      Virus.y += 1;
       
      });
    if(gameState.leftMostVirus.x < 10 || gameState.rightMostVirus.x > 440) {
      gameState.enemyVelocity *= -1;
      gameState.enemies.getChildren().forEach(
        virus => {
        virus.y +=10;
        });
      }
    
      this.tweens.add({
        targets: gameState.enemies.getChildren(), 
        delay: 0,
        duration: 550,
        ease: 'Sine.easeInOut',
        velocityY: -550,
        angle: 180,
        yoyo: true,
        repeat: -1,
        alpha: {value: 1, duration: 300}, 
      }) 
    
    
 
    

    }else {
    gameState.enemies.getChildren().forEach(
    Virus => {
    Virus.x += gameState.enemyVelocity;
    });
    gameState.leftMostVirus = 
    sortedEnemies()[0];
    gameState.rightMostVirus = 
    sortedEnemies()[sortedEnemies().length -1];
    if(gameState.leftMostVirus.x < 10 || gameState.rightMostVirus.x > 440) {
    gameState.enemyVelocity *= -1;
    gameState.enemies.getChildren().forEach(
    virus => {
    virus.y +=10;
    });
    }
    
    }
  }

  gameState.gameWidth = parseInt(`${this.scale.canvas.style.width}`, 10);
 
  

  } 
  }