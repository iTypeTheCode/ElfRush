class GameManagerBehavior extends Sup.Behavior {
  public fadeSpeed: number;
  playerEnabled: boolean;
  startFade: boolean;
  retryFade: boolean;
  inORout: boolean;
  inORoutFADE: boolean;
  showdeadScreen: boolean;
  gameFadeIN: boolean;  
  gameStart: boolean;
  autoStart: boolean;
  menuState: string;
  gameStarted: boolean;
  score: number;
  presents: number;
  timer: number;
  gameTIME: number;
  gameSeconds: number;
  blackScreen: Sup.SpriteRenderer;
  pressStart: Sup.TextRenderer;
  scoreTxt: Sup.TextRenderer;
  retryTxt: Sup.TextRenderer;
  timerTxt: Sup.TextRenderer;
  presentsTxt: Sup.TextRenderer;
  title: Sup.Actor;
  scoreBar: Sup.Actor;
  deathScreen: Sup.Actor;
  player: Sup.Actor;
  awake() {
    this.player = Sup.getActor("Player");
    this.title = Sup.getActor("Title");
    this.scoreBar = Sup.getActor("Scorebar");
    this.pressStart = Sup.getActor("pressspace").textRenderer;
    this.blackScreen = Sup.getActor("blackScreen").spriteRenderer;
    this.scoreTxt = Sup.getActor("score").textRenderer;
    this.presentsTxt = Sup.getActor("presentsTxt").textRenderer;
    this.retryTxt = Sup.getActor("retryTxt").textRenderer;
    this.timerTxt = Sup.getActor("TimerText").textRenderer;
    this.deathScreen = Sup.getActor("deathScreen");
    this.playerEnabled = false;
    this.startFade = false;
    this.gameFadeIN = false;
    this.showdeadScreen = false;
    this.gameStarted = false;
    this.menuState = "black";
    this.score = 0;
    this.presents = 0;
    this.timer = 0;
    this.gameTIME =0;
    this.gameSeconds = 20;
    this.fadeSpeed = 0.005;
    
    if(this.autoStart==false){
      if(this.gameStarted==false){
        this.blackScreen.setOpacity(1);
      }
    }else{Sup.getActor("Buttons").setLocalX(3);}
  }
  
  

  update(){
    
    //Checks to see if the game should automatically start, (for Retry scene).
    if(this.autoStart == true){
      this.title.setY(2);
      if(this.blackScreen.getOpacity() > 0){
        this.blackScreen.setOpacity(this.blackScreen.getOpacity()-this.fadeSpeed);
      }else{
        this.gameFadeIN = true;
      }
      if(!this.gameStarted){
        this.STARTGAME();
        //Sup.log("autoStarted");
      }
    }else{
      if(this.gameStarted == false){
        this.menuState = "black";
        if(this.blackScreen.getOpacity() > 0){
          this.blackScreen.setOpacity(this.blackScreen.getOpacity()-this.fadeSpeed);
          if(Sup.Input.wasKeyJustPressed("SPACE")){
            this.blackScreen.setOpacity(0);
          }
        }else{
          this.menuState = "menu";
        }
      }
    }
    
    if(this.menuState == "menu"){
      if(Sup.Input.wasKeyJustPressed("SPACE")){
        this.STARTGAME();
        this.blackScreen.setOpacity(0);
        this.gameFadeIN = true;
      }
    }
    
    if(this.gameFadeIN){
        if(this.title.getY() < 2){
          this.title.moveY(0.01);
        }else{this.gameFadeIN = false;}
      }
    
    if(this.menuState == "game"){
      if(this.scoreBar.getLocalPosition().y > 1.5){
        this.scoreBar.moveY(-0.02);
      }
      if(this.showdeadScreen == false){
        this.timer = this.timer +1;
        if(this.timer >=10){
          this.timer = 0;
          this.score = this.score +1;
          this.updateText();
        }
      }
    }
    
    
    if(this.showdeadScreen){
      if(this.deathScreen.getLocalPosition().y > 0){
        this.deathScreen.moveLocalY(-0.05);
      }else{
        if(Sup.Input.wasKeyJustPressed("SPACE")){
            //Sup.log("Escape!");
            Sup.getActor("SoundManager").getBehavior<SoundManagerBehavior>(SoundManagerBehavior).stopMusic();
            Sup.loadScene("SceneRetry");}
        }
      if(Sup.Input.wasKeyJustPressed("ESCAPE")){
            //Sup.log("Escape!");
            Sup.getActor("SoundManager").getBehavior<SoundManagerBehavior>(SoundManagerBehavior).stopMusic();
            Sup.loadScene("Scene");
        }
      }else{
        this.deathScreen.setLocalY(2);
              //Sup.log("reset");
      }
    
    
    //Sup.log(this.menuState);
      if(Sup.Input.wasKeyJustPressed("ESCAPE")){
        if(Sup.getActor("settingsScreen").getLocalX()==0.647){
          this.toggleSETTINGS();
        }
      }
    
    //TIMER FUNCTIONALITY(SCRAPPED)
    //this.gameTIME++;
    //if(this.gameTIME>=60){
      //if(this.gameSeconds>0){this.gameSeconds--;}
      //this.gameTIME=0;
      //this.timerTxt.setText(": "+this.gameSeconds);
      //if(this.gameSeconds<=0){
        //this.playerDead();
      //}
    //}
    
    
    }
  
  STARTGAME(){
    Sup.getActor("LvlManager").getBehavior<LvlManagerBehavior>(LvlManagerBehavior).startGame();
    Sup.getActor("Tree").getBehavior<TreeManagerBehavior>(TreeManagerBehavior).startGame();
    Sup.getActor("instructions").textRenderer.setText("");
    this.menuState = "game";
    this.gameStarted = true;
    if(this.autoStart==false){
      this.blackScreen.setOpacity(0);
      
    }
    this.gameFadeIN = true;
    if(Sup.getActor("playButton")!=null){
      //Sup.getActor("playButton").destroy();
      //Sup.getActor("musicButton").destroy();
    }
    if(!this.autoStart)
    Sup.getActor("Buttons").setLocalX(3);
    //if(Sup.getActor("Buttons").getLocalX()!=0.647){
      //up.getActor("Buttons").setLocalX(0.647);
    //}else{//Sup.getActor("Buttons").setLocalX(3);}
  }
  
  toggleSETTINGS(){
    if(Sup.getActor("settingsScreen").getLocalX()!=0.647){
      Sup.getActor("settingsScreen").setLocalX(0.647);
      Sup.getActor("Buttons").setLocalX(3);
    }else{Sup.getActor("settingsScreen").setLocalX(3);Sup.getActor("Buttons").setLocalX(0.647);}
    
  }
  
  playerDead(){
    this.player.getBehavior<PlayerBehavior>(PlayerBehavior).updateState("dead");
    this.showdeadScreen = true;
    this.deathScreen.getChild("presentCount").textRenderer.setText("You've managed to save "+ this.presents + " presents.");
    //Sup.log("playerdead");
    this.deathScreen.setLocalY(0);

  }
  
  collectTimer(){
      this.gameSeconds+=20;
     this.timerTxt.setText(": "+this.gameSeconds);
  }
  
  updateScore(score: number){
    this.score = this.score + score;
    this.presents++;
    Sup.getActor("LvlManager").getBehavior<LvlManagerBehavior>(LvlManagerBehavior).collectedPresent();
    this.updateText();
  }
  
  updateText(){
    this.scoreTxt.setText(this.score);
    this.presentsTxt.setText("= "+ this.presents);
  }
}
Sup.registerBehavior(GameManagerBehavior);
