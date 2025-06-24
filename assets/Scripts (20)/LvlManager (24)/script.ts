class LvlManagerBehavior extends Sup.Behavior {
  timer: number;
  gameStart: boolean;
  ornamentsSpawned: number;
  presentsSpawned: number;
  presentsCollected: number;
  rNUMO: number;
  rNUMP: number;
  player: Sup.Actor;
  banner: Sup.Actor;
  shouldBanner: boolean;
  
  tree: Sup.Actor;
  speed: number;
  awake() {
    this.player = Sup.getActor("Player");
    this.timer = 0;
    this.gameStart = false;
    this.ornamentsSpawned = 0;
    this.presentsSpawned = 0;
    this.presentsCollected = 0;
    
    this.tree = Sup.getActor("Tree");
    this.speed = this.tree.getBehavior<TreeManagerBehavior>(TreeManagerBehavior).speed;
    
    this.banner = Sup.getActor("LevelBanner");
    this.banner.setLocalX(-2.6)
    this.shouldBanner = false;
  }

  startGame(){
    this.gameStart = true;
    this.player.spriteRenderer.setAnimation("2");
  }
  
  update() {
    this.speed = this.tree.getBehavior<TreeManagerBehavior>(TreeManagerBehavior).speed;
    if(this.gameStart){
      this.timer = this.timer +1;
      if(this.timer >= 68/(this.speed*100)){
        this.rNUMP = Sup.Math.Random.integer(-3,3);
        this.rNUMO = Sup.Math.Random.integer(-3,3);
        //WILL NOT SPAWN A PRESENT IF THE ORNAMENT IS OVERLAPPING
        if(this.rNUMP == this.rNUMO){
          this.spawnOrnament(0+0.32*this.rNUMO);
        }else{
          this.spawnPresent(0+0.32*this.rNUMP);
          this.spawnOrnament(0+0.32*this.rNUMO);
        }
        this.timer = 0;
      }
    }
    if(Sup.Input.wasKeyJustPressed("B")){
      this.shouldBanner = true;
      
    }
    
    if(this.shouldBanner){
        if(this.banner.getLocalX() <= 3.75){
          this.banner.moveLocalX(0.02);
        }else{this.shouldBanner = false; this.banner.setLocalX(-2.6)}
      
      }
  }
  
  public updateBanner(level: number){
    this.banner.getChild("bannerTxt").textRenderer.setText("Level "+level);
    this.shouldBanner = true;
    Sup.getActor("SoundManager").getBehavior<SoundManagerBehavior>(SoundManagerBehavior).playSound("Sounds/bannerSound","SFX",1);

  }
  
  collectedPresent(){
    this.presentsCollected++;
    if(this.presentsCollected%10==0){
      this.tree.getBehavior<TreeManagerBehavior>(TreeManagerBehavior).levelup();
    }
  }
  
  
  spawnPresent(x: number){
    this.presentsSpawned++;
    let present = new Sup.Actor("Present"+this.presentsSpawned,Sup.getActor("PresentParent"));
    new Sup.SpriteRenderer(present);
    present.spriteRenderer.setSprite("GameSprites/Presents");
    present.addBehavior<PresentBehavior>(PresentBehavior);
    present.getBehavior<PresentBehavior>(PresentBehavior).updatePosition(x);
  }
  spawnOrnament(x: number){
    this.ornamentsSpawned++;
    let ornament = new Sup.Actor("Ornament"+this.ornamentsSpawned);
    new Sup.SpriteRenderer(ornament);
    ornament.spriteRenderer.setSprite("GameSprites/Ornament2");
    ornament.addBehavior<OrnamentBehavior>(OrnamentBehavior);
    ornament.getBehavior<OrnamentBehavior>(OrnamentBehavior).updatePosition(x);
  }
  
}
Sup.registerBehavior(LvlManagerBehavior);
