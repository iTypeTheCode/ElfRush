class MenuButtonsBehavior extends Sup.Behavior {
  public idleanimation: string;
  public clickanimation: string;
  public hoveranimation: string;
  
  update() {
    let ray = new Sup.Math.Ray();
    ray.setFromCamera(Sup.getActor("Cam").camera,Sup.Input.getMousePosition());
    
    let hits = ray.intersectActor(this.actor);
    
    for(let hit of hits){
      if(hit.actor == this.actor){
        if(Sup.Input.wasMouseButtonJustPressed(0)){
          this.actor.spriteRenderer.setAnimation(this.clickanimation, false);
          return;
        }
        if(Sup.Input.wasMouseButtonJustReleased(0)){
          this.actor.spriteRenderer.setAnimation(this.hoveranimation, false);
          if(this.idleanimation=="playI"){
            Sup.getActor("Game Manager").getBehavior<GameManagerBehavior>(GameManagerBehavior).STARTGAME();
            return;
          }else{Sup.getActor("Game Manager").getBehavior<GameManagerBehavior>(GameManagerBehavior).toggleSETTINGS();}
        }
        if(Sup.Input.isMouseButtonDown(0)== false)
          this.actor.spriteRenderer.setAnimation(this.hoveranimation, false);
      }
    }if(hits.length==0){this.actor.spriteRenderer.setAnimation(this.idleanimation, false);}
  }
}
Sup.registerBehavior(MenuButtonsBehavior);
