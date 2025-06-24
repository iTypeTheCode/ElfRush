class PresentBehavior extends Sup.Behavior {
  player: Sup.Actor;
  gameManager: Sup.Actor;
  position: Sup.Math.Vector3;
  timer: number;
  randomNUM: number;
  
  collected: boolean;
  animTimer: number;
  scale: number;
  
  tree: Sup.Actor;
  speed: number;
  currentspeed: number;
  awake() {
    this.timer = 0;
    this.player = Sup.getActor("Player");
    this.gameManager = Sup.getActor("Game Manager");
    //Sup.log(this.gameManager.getName());
    this.actor.spriteRenderer.setAnimation(Sup.Math.Random.integer(1,7).toString(), false);
    this.actor.setPosition(Sup.getActor("LvlManager").getPosition());
    
    this.tree = Sup.getActor("Tree");
    this.speed = this.tree.getBehavior<TreeManagerBehavior>(TreeManagerBehavior).speed;
    
    this.collected = false;
    this.animTimer = 0;
    this.scale = 1;
  }

  update() {
    if(this.tree.getBehavior<TreeManagerBehavior>(TreeManagerBehavior).speed >= this.speed){
      this.speed = this.tree.getBehavior<TreeManagerBehavior>(TreeManagerBehavior).speed;
      this.timer =0;
    }
    this.position = this.actor.getPosition();
    if(this.position.distanceTo(this.player.getPosition()) <= .3){
      if(this.player.getBehavior<PlayerBehavior>(PlayerBehavior).state == "alive"){
        if(this.collected==false){
          this.gameManager.getBehavior<GameManagerBehavior>(GameManagerBehavior).updateScore(50);
          let score = Sup.appendScene("Presets/Score",this.actor);
          Sup.getActor("SoundManager").getBehavior<SoundManagerBehavior>(SoundManagerBehavior).playSound("Sounds/presentCollected","SFX",1);
          this.collected=true;
        }
      }
    }
    
    if(this.actor.getPosition().y <= -2)this.actor.destroy();
    
    this.actor.moveY(-this.speed);
    
    if(this.collected==true){
      if(this.scale <= 1.3){
        this.actor.setLocalScaleX(this.scale+0.05);
        this.actor.setLocalScaleY(this.scale+0.05);
        this.scale=this.scale+0.05;
      }else{this.actor.destroy();}       
    }
    
    
    
  }
  
  updatePosition(x:number){
    this.actor.setX(x);
  }
}
Sup.registerBehavior(PresentBehavior);
