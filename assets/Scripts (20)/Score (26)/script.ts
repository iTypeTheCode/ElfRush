class ScoreBehavior extends Sup.Behavior {
  timer: number;
  awake() {
    this.timer = 0;
    this.actor.setPosition(this.actor.getParent().getPosition());
    this.actor.setParent(null);
  }

  update() {
    this.timer++;
    this.actor.moveY(+0.005);
    if(this.timer >= 30){
      this.actor.textRenderer.setOpacity((this.actor.textRenderer.getOpacity())-0.01);
    }
    if(this.actor.textRenderer.getOpacity() <= 0){
       this.actor.destroy();
    }
  }
}
Sup.registerBehavior(ScoreBehavior);
