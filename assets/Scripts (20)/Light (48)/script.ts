class LightBehavior extends Sup.Behavior {
  timer: number;
  awake() {
    this.timer=0;
    this.actor.spriteRenderer.setAnimation(Sup.Math.Random.integer(1,8).toString(), false);
  }

  update() {
    this.timer+=Sup.Math.Random.integer(0,10);
    if(this.timer>=600){this.actor.spriteRenderer.setAnimation(Sup.Math.Random.integer(1,8).toString(), false);this.timer=0;}
  }
}
Sup.registerBehavior(LightBehavior);
