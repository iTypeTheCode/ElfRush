class SplashScreenBehavior extends Sup.Behavior {
  blackScreen: Sup.SpriteRenderer;
  fadeSpeed: number;
  timer: number;
  awake() {
    this.timer = 60;
    this.blackScreen = Sup.getActor("BLACK").spriteRenderer;
  }

  update() {
    this.blackScreen.setOpacity(this.blackScreen.getOpacity()-this.fadeSpeed);
    this.timer--;
    if(this.timer<= 0){
      Sup.loadScene("Scene");
    }
    if(Sup.Input.wasKeyJustPressed("SPACE")){
      Sup.loadScene("Scene");
    }
  }
}
Sup.registerBehavior(SplashScreenBehavior);
