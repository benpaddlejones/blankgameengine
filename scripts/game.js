var gameLevel = 0;
var enemyKill = 0;
var playerDeath = 0;
var tokenCount = 0;
var totalTokenCount = 0;
var maxLevels = 2; // total levels + 1

document.getElementById("body").style.backgroundColor = newBackgroundColor;
document.getElementById("newTitle").innerHTML = titleText;


window.addEventListener("load",function() {
  var Q = window.Q = Quintus({development: true})
    .include("Scenes, Sprites, 2D, Input, Touch, UI, TMX, Audio")
    .include("ActionPlatformerPlayer, ActionPlatformerEnemy")
    .setup({
      width: 480,   //to fit devices with a screne resolution of 1280 x 720
      height: 270,
      scaleToFit: true,
	  maximize:false 
    }).controls().touch();
	
	
	
    Q.enableSound();
    Q.setImageSmoothing(false);

    
	
	Q.scene("level",function(stage) {
      var player;
      var levelLayer; 

	  switch (gameLevel) {
		case 0:
			Q.stageTMX("level1.tmx",stage);    
			
			var container = stage.insert(new Q.UI.Container({
				fill: "#FFFF00",
				border: 5,
				shadow: 10,
				shadowColor: "rgba(0,0,0,0.5)",
				x: Q.width/2,
				y: Q.height/2 
			}));

			stage.insert(new Q.UI.Button({ 
			label: "Click to PLAY!",
			}, function() {
				gameLevel = 1;
				Q.stageScene("level");
				Q.audio.stop();
			}),container);
	
			container.fit(20,20);
		    // Q.audio.play('openingtitle.mp3', { loop: true }); Keep for if using intro and gameover music 
			break;		
		 case 1:
		  	Q.stageTMX("level1.tmx",stage); 
		  	player = Q("Player").first();
		  	break;
		default:
		    // Q.audio.play('gameover.mp3', { loop: true }); Keep for if using intro and gameover music 
			Q.stageTMX("level1.tmx", stage);
			Q.stageScene("hud", 3);

			var container = stage.insert(new Q.UI.Container({
				fill: "#FFFF00",
				border: 5,
				shadow: 10,
				shadowColor: "rgba(0,0,0,0.5)",
				x: Q.width/2,
				y: Q.height/2 
			}));

			stage.insert(new Q.UI.Button({ 
			    label: "GAME OVER!",
			}, function() {
			    gameLevel = 1;
				enemyKill = 0;
				playerDeath = 0;
				tokenCount = 0;
				levelTokenGoal = 0;
				totalTokenCount = 0;
				Q.stageScene("hud", 3);
				Q.stageScene("level");
				Q.audio.stop();
			}), container);

			container.fit (20,20);	
		};	
	  
	  if (gameLevel != 0) {
	      if (gameLevel != maxLevels) {
	          stage.add("viewport").follow(player, { x: true, y: true });
	      };
	  };
	
	});
	
	Q.scene("hud", function (stage) {
	  stage.insert(new Q.UI.Text({
	      label: "Deaths: " + playerDeath + "\n" + tokenName + ": " + totalTokenCount + "\n" + enemyName + ": " + enemyKill,
      color: hudColour,
      align: 'left',
	  size: 10,
      x: 10,
      y: 0
    }))
	
	});
	
	

    //load assets
    // Q.loadTMX("level1.tmx, sprites.json, sprites.png, commondeath.mp3, gameover.mp3, openingtitle.mp3, jump.mp3, coin.mp3", function() {   Keep for if using intro and gameover music    
	Q.loadTMX("level1.tmx, sprites.json, sprites.png, commondeath.mp3, jump.mp3, coin.mp3", function() {       
      Q.compileSheets("sprites.png","sprites.json");     
      Q.stageScene("level");
	  Q.stageScene("hud", 3);
    });
 
});