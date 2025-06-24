class TreeManagerBehavior extends Sup.Behavior {
  lastBranch: Sup.Actor;
  lvlManager: Sup.Actor;
  timer: number;
  gamestart: boolean;
  spawnedtrunk: boolean;
  spawnedgapcatch: boolean;
  
  gameTimer: number;
  slowTimer: number;
  frameCOUNTER: number;
  
  levelTargetSpeed: number;
  
  public speedLEVEL: number;
  public speed: number;
  awake(){
    this.frameCOUNTER = 0;
    this.slowTimer = 0;
    this.gameTimer = 0;
    this.speed = 0.01;
    this.speedLEVEL = 1;
    this.spawnedtrunk = false;
    this.gamestart = false;
    this.timer = 0;
    
    this.lvlManager = Sup.getActor("LvlManager");
  }
  
  startGame(){
    this.gamestart = true;
    this.lvlManager.getBehavior<LvlManagerBehavior>(LvlManagerBehavior).updateBanner(this.speedLEVEL);
  }
  
  updateBranch(branch: Sup.Actor){
    this.lastBranch = branch;
  }
  
  update(){
    
    //LEVEL UP IN(SECONDS*FPS) WHEN THE GAME TIMER REACHES THAT TIME, ALSO SPAWNS GAP CATCH
    if(this.gameTimer >= 10*Sup.Game.getFPS()){ this.gameTimer = 0; if(Sup.getActor("gapcatch").getVisible()== false){Sup.getActor("gapcatch").setVisible(true);}}
    
   
    
    if(this.gamestart){
      this.frameCOUNTER++;
      this.slowTimer++;
      this.gameTimer++;
      this.timer = this.timer +1;
      if(this.timer >= this.roundNumber(68/this.speed/100,1)){
        if(this.spawnedtrunk == false){
          
          this.spawnBranch("trunk");
          this.spawnedtrunk = true;
          }else{
            this.spawnBranch("branch");
            //Sup.log(this.speed/100);
          }
        this.timer = 0;
      }
    }
    
    if(Sup.Input.wasKeyJustPressed("P")){
     this.levelup();
    }
    
    //INCREASING THE SPEED SLOWLY
    if(this.speed<this.levelTargetSpeed){
      if(this.slowTimer >= 60){
        this.speed= this.speed+0.001;
        //this.speed = this.roundNumber(this.speed,3);
        //this.speed = this.speed/1000;
        this.slowTimer =0;
        Sup.log("speed: "+this.speed );
      }
    }
    
    //this.speed = this.speed+0.0000000000001;
  }
  
  roundNumber(num: number, places: number){
    return Math.round(num* Math.pow(10, places))/ Math.pow(10,places);
  }
  
  levelup(){
    this.speedLEVEL++;
    this.lvlManager.getBehavior<LvlManagerBehavior>(LvlManagerBehavior).updateBanner(this.speedLEVEL);
      if(this.speedLEVEL == 2)this.levelTargetSpeed = 0.014;
      if(this.speedLEVEL == 3)this.levelTargetSpeed = 0.018;
      if(this.speedLEVEL == 4)this.levelTargetSpeed = 0.025;
      if(this.speedLEVEL == 5)this.levelTargetSpeed = 0.033;
      if(this.speedLEVEL == 6)this.levelTargetSpeed = 0.040;
      if(this.speedLEVEL == 7)this.levelTargetSpeed = 0.047;
      if(this.speedLEVEL == 8)this.levelTargetSpeed = 0.054;
      if(this.speedLEVEL == 9)this.levelTargetSpeed = 0.060;
      if(this.speedLEVEL == 10)this.levelTargetSpeed = 0.066;
      if(this.speedLEVEL == 11)this.levelTargetSpeed = 0.070;
  }
  
  
  spawnBranch(type: string){
    if(type == "branch"){
      Sup.appendScene("Presets/TreeBranch");
    }else if(type == "trunk"){
      Sup.appendScene("Presets/TreeTrunk");
    }
  }
}
Sup.registerBehavior(TreeManagerBehavior);
