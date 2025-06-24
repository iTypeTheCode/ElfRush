class ObstacleDestroyedBehavior extends Sup.Behavior {
 
  presentbodies: Sup.ArcadePhysics2D.Body[] =[];
  
  awake() {
   let presentActors = Sup.getActor("PresentParent").getChildren();
    for (let presentActor of presentActors) this.presentbodies.push(presentActor.arcadeBody2D);
  }

  update() {
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.ArcadePhysics2D.getAllBodies());
    let touchPresents = this.actor.arcadeBody2D.getTouches().top;
    
    let touchpresents = false;
    
    for (let presentBody of this.presentbodies){
      Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, presentBody);
        if(this.actor.arcadeBody2D.getTouches().top){
          touchpresents = true;
          break;
        }
    }
    
    
    let touchPresent = touchPresents || touchpresents;
    if(touchPresent){
      touchPresents
    }
  }
}
Sup.registerBehavior(ObstacleDestroyedBehavior);
