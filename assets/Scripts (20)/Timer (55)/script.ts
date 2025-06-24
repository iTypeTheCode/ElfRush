class TimerBehavior extends Sup.Behavior {
  player: Sup.Actor;
  gameManager: Sup.Actor;
  position: Sup.Math.Vector3;
  timer: number;
  randomNUM: number;
  firedRay: boolean;
  
  collected: boolean;
  scale: number;
  
  tree: Sup.Actor;
  speed: number;
  awake() {
    this.timer = 0;
    this.scale =1;
    this.player = Sup.getActor("Player");
    this.gameManager = Sup.getActor("Game Manager");
    //this.actor.spriteRenderer.setAnimation(Sup.Math.Random.integer(1,14).toString(), false);
    this.actor.setPosition(Sup.getActor("LvlManager").getPosition());
    this.firedRay = false;
    
    this.tree = Sup.getActor("Tree");
    this.speed = this.tree.getBehavior<TreeManagerBehavior>(TreeManagerBehavior).speed;
  }

  update() {
    this.speed = this.tree.getBehavior<TreeManagerBehavior>(TreeManagerBehavior).speed;
    this.position = this.actor.getPosition();
    if(this.position.distanceTo(this.player.getPosition()) <= .3){
      if(this.player.getBehavior<PlayerBehavior>(PlayerBehavior).state == "alive"){
        
        this.collected=true;
      }
    }

    if(this.actor.getPosition().y <= -2)this.actor.destroy();
    this.actor.moveY(-this.speed);
    
    if(this.collected==true){
      if(this.scale <= 1.3){
        this.actor.setLocalScaleX(this.scale+0.05);
        this.actor.setLocalScaleY(this.scale+0.05);
        this.scale=this.scale+0.05;
      }else{this.actor.destroy();this.gameManager.getBehavior<GameManagerBehavior>(GameManagerBehavior).collectTimer();}       
    }
  }
  
  updatePosition(x: number){
    this.actor.setX(x);
  }
}
Sup.registerBehavior(TimerBehavior);
