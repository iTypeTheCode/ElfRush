class PlayerBehavior extends Sup.Behavior {
  state: string;
  moving: string;
  timer: number;
  movCount: number;
  laneNum: number;
  
  awake() {
    
    this.state = "alive";
    this.moving = "false";
    this.laneNum = 5;
  }

  update() { 
    if(this.state == "alive"){
      if(this.moving == "false"){
          if(this.laneNum > 1){
            if(Sup.Input.wasKeyJustPressed("LEFT")||Sup.Input.wasKeyJustPressed("A")){
              this.moving = "left";
              this.movCount = 4;
              this.laneNum--;
              Sup.getActor("SoundManager").getBehavior<SoundManagerBehavior>(SoundManagerBehavior).playSound("Sounds/playerMovement","SFX",0.5);
            }
          }
        if(this.laneNum < 9){
            if(Sup.Input.wasKeyJustPressed("RIGHT")||Sup.Input.wasKeyJustPressed("D")){
              this.moving = "right";
              this.movCount = 4;
              this.laneNum++;
              Sup.getActor("SoundManager").getBehavior<SoundManagerBehavior>(SoundManagerBehavior).playSound("Sounds/playerMovement","SFX",0.5);
            }
        }
      }
      //Sup.log("movCount: "+this.movCount+ " moving: "+this.moving);
    //Movement LERP
      if(this.moving == "right"){
        if(this.movCount > 0){
          this.actor.moveX(.08);
          this.movCount--;
        }else{this.moving = "false";}
      }
      if(this.moving == "left"){
        if(this.movCount > 0){
          this.actor.moveX(-.08);
          this.movCount--;
        }else{this.moving = "false";}
      }
      
    }else if(this.state == "dead"){
      if(this.timer > 0){
        this.timer--;
      }else{
        if(this.actor.getPosition().y > -1.75)
          this.actor.moveY(-0.05);
      }
    }
  }
  
    updateState(state:string){
      this.state = state;
      if(this.state == "dead"){
        this.flipPlayer("3");
        this.timer = 240;
      }
    }
  
  flipPlayer(state:string){
   this.actor.spriteRenderer.setAnimation(state,true);
  }
  
  }
Sup.registerBehavior(PlayerBehavior);
