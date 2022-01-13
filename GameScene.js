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
    this.load.image('background', './assets2/bacgroundWithPlatform2.png');
    // this.load.image('dude', './avatar01.png');
    this.load.image('virusDrop', './assets2/redTriangle.png');
    this.load.image('antibody', './assets2//antibody06.png');
    this.load.spritesheet('dude', 
      './assets2/SpriteDude-04.png',
      { frameWidth: 125, frameHeight: 201 }
    );
    this.load.audio('blaster', ['./assets2/public_assets_audio_SoundEffects_blaster.mp3'])
    this.load.audio('squish', ['./assets2/squish06a.mp3'])
    this.load.audio('puff', ['./assets2/puff01.mp3'])
    this.load.audio('auch', ['./assets2/aua02.mp3'])

  }
  
   
  
  create()
  {

    var style = {
      'background-color': 'white',
      'width': '80px',
      'height': '30px',
      'font': '20px Arial',
      'font-weight': 'bold', 
      'class': 'playerName',
  }
    let element = this.add.dom(200, 300, 'input', style, 'Phaser 3');
     
 
      
   gameState.puff = this.sound.add('puff', { loop: false , volume: 0.5});
   gameState.auch = this.sound.add("auch", { loop: false });
 

    // When gameState.active is true, the game is being played and not over. When gameState.active is false, then it's game over
    gameState.active = true;
     
    this.add.image(225, 250, 'background').setScale(.75);
    // When gameState.active is false, the game will listen for a pointerup event and restart when the event happens
    this.input.on('pointerup', () => {
    if (gameState.active === false) {
      console.log('gameState false')
      this.scene.restart();
    }
    })
  
    // Creating static platforms
    const platforms = this.physics.add.staticGroup();
    platforms.create(225, 535, 'platform').setScale(1).refreshBody();
  
    // Displays the initial number of viruses, this value is initially hardcoded as 24 
    gameState.scoreText = this.add.text(300, 8, `viruses Left: 32`, { fontFamily: 'Georgia', fontSize: '20px', fill: '#000000' });
    gameState.TotalScore = this.add.text(15, 8,  `${gameState.playerName} Score: 0` , { fontFamily: 'Georgia', fontSize: '20px', fill: '#cf0707' });
    gameState.livesText = this.add.text(10, 475, `Lives: ${gameState.lives}`, { fontFamily: 'Georgia', fontSize: '20px', fill: '#ffee79' });

    // Uses the physics plugin to create dude
    gameState.player = this.physics.add.sprite(200, 300, 'dude')
    .setGravityY(400)
    .setScale(.3)
    .setSize(90, 130)
    .setOffset(21, 70);
    gameState.player.setBounce(0.3);
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
     // create bug list var
   
     const viruses = ['virus01', 'virus02', 'virus03', 'virus04', 'virus05']; 
   let randomBug1 = viruses[Math.floor(Math.random()*viruses.length)]
   let randomBug2 = viruses[Math.floor(Math.random()*viruses.length)]
   let randomBug3 = viruses[Math.floor(Math.random()*viruses.length)]
   let randomBug4 = viruses[Math.floor(Math.random()*viruses.length)]
  //  console.log(randomBug)
   
    
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
    50 * yVal,  `${randomBug1}` ,
     
     //`${'randomBug'}` 
    ).setScale(.15).setGravityY(-200);
    gameState.enemies.create(
    50 * xVal, 
    100 * yVal,  `${randomBug2}`,
      
    ).setScale(.15).setGravityY(-200);
    
    gameState.enemies.create(
    50 * xVal, 
    150 * yVal, `${randomBug3}` 
    ).setScale(.15).setGravityY(-200);

    gameState.enemies.create(
      50 * xVal, 
      200 * yVal, `${randomBug4}` 
      ).setScale(.15).setGravityY(-200);
  //    console.log(gameState.enemies.children);
    }
   
  }
  
  // create group of pellets
  let pellets =
   this.physics.add.group()
  const genPellet = () => {
    
    
    let randomBug = 
    Phaser.Utils.Array.GetRandom(
    gameState.enemies.getChildren());
    
    try{
     pellets.create(randomBug.x, 
    randomBug.y, 'virusDrop').setScale(.2)
    // console.log(randomBug)
  } catch (e) {
    console.log(e);
    }
  
    
  }
  // create an event loop that continously creates bug pellets
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
  
    
  
   //collider between dude  and the pellets, callback will set the condition to the GAME OVER
   this.physics.add.collider(pellets, gameState.player, ( player, pelet) => {
    //  gameState.active = false;
   
    //  this.physics.pause();
    //  this.add.text(80, 250, 'Game Over\nClick to restart', {fontFamily: 'Georgia', fontSize: '20px', fill: '#e31c60'});
    //  gameState.enemyVelocity = 1;
     pelet.destroy();
     gameState.auch.play(),
     player.setTint(0xff0000),
     this.time.addEvent({
      targets: player,
        delay: 100, 
        loop: false,
        scaley: 2,
        completeDelay: 500,
      callback: () => {
        player.clearTint();
    }, 
    })
     gameState.lives -= 1;
     gameState.livesText.setText(`Lives: ${gameState.lives}`);
     if (gameState.lives === 0)
     {this.physics.pause();
      gameState.pelletsLoop.destroy();
     const text = this.add.text(210, 150, 'Game Over', { fontFamily: 'Georgia', fontSize: '40px', fill: '#ff0202' }).setOrigin(0.5, 0.5);
      
     this.tweens.add({
      targets: text, 
      scaleX: 2,
      scaleY: 2,
      delay: 0,
      duration: 550,
      ease: 'Sine.easeInOut',
      velocityY: -550,
      angle: 10,
      yoyo: true,
      repeat: 1,
      alpha: {value: 0.5, duration: 300}, 
    }) 
    
      gameState.puff.play(),
     this.time.addEvent({
       delay: 1500, 
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
   gameState.score += 10;
   gameState.scoreText.setText(`Viruses Left ${numOfTotalEnemies()}`)
   gameState.TotalScore.setText(`Score: ${gameState.score}`)
    
   
    
  
  } );
 
  
  this.physics.add.collider(pellets, gameState.antibody, (pellets, antibody) => {
   
  antibody.destroy();
  pellets.destroy();
  gameState.score += 5;
  // console.log(score2);
  gameState.scoreText.setText(`Viruses Left ${numOfTotalEnemies()}`)
   gameState.TotalScore.setText(`Score: ${gameState.score}`)
   
    
  });
  
  gameState.blaster = this.sound.add("blaster", { loop: false });
  gameState.squish = this.sound.add("squish", { loop: false });
  
 
  
   
  }
  
  update()  
  {
    if (gameState.active) {
    // If the game is active, then players can control dude
    if (gameState.cursors.left.isDown) {
      gameState.player.setVelocityX(-160);
      gameState.player.anims.play('left', true);
    
   
    } else if (gameState.cursors.right.isDown) {
      gameState.player.setVelocityX(160);
      gameState.player.anims.play('right', true);
     
 
   
     } else {
      gameState.player.setVelocityX(0);
      gameState.player.anims.play('turn');
       
  
    }
  
    // Execute code if the spacebar key is pressed
    if (Phaser.Input.Keyboard.JustDown(gameState.cursors.space)) {
      gameState.antibody.create(gameState.player.x, gameState.player.y, 'antibody').setGravityY(-600).setScale(.25)
      //  console.log('sound') 
      gameState.blaster.play();
    }
      
    // Add logic for winning condition and enemy movements below:
    if(numOfTotalEnemies() === 0){
    
    gameState.active = false;
    console.log(gameState.active)
    this.physics.pause();
    
    gameState.enemyVelocity = 1;
    this.add.text(80, 200, 'All the Viruses are gone\n You are the winner!!!', {
    fontFamily: 'Georgia',
    fontSize: '20px', 
    fill: '#000000'
    });
    this.add.text(100, 300, 'Click to start over', {
    fontFamily: 'Georgia',
    fontSize: '20px', 
    fill: '#fcff68'
    });
  
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
    
    
    
      // gameState.enemies.setGravity = 200;
    // if(gameState.leftMostVirus.x < 10 || gameState.rightMostVirus.x > 440) {
    // 	gameState.enemyVelocity *= -1;
    // 	gameState.enemies.getChildren().forEach(
    // 	  virus => {
    // 	  virus.y +=18;
    // 	  });
    // 	}
    

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
  } 

  }