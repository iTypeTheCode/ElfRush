class BranchBehavior extends Sup.Behavior {
  tree: Sup.Actor;
  timer: number;
  speed: number;
  awake(){
    //DEBUGGING CODE WILL DISPLAY THE SPEED OF THE LEVEL AT TIME OF BRANCH SPAWN ON EACH BRANCH
    //if(this.actor.getName()!="Trunk")
      //this.actor.getChild("Text").textRenderer.setText(Sup.getActor("Tree").getBehavior<TreeManagerBehavior>(TreeManagerBehavior).speed);
    //MUST ADD A TEXT RENDERER TO BRANCH PRESET OBJECT
    this.speed = 0.01;
    this.timer = 0;
    this.tree = Sup.getActor("Tree");
    this.tree.getBehavior<TreeManagerBehavior>(TreeManagerBehavior).updateBranch(this.actor);
    if(this.actor.getName() == "Branch"){
      this.actor.setPosition(Sup.getActor("treespawn").getPosition());
    }else{
      this.actor.setPosition(Sup.getActor("trunkspawn").getPosition());
    }
  }
  
  update(){
    //Sup.log(this.tree.getBehavior<TreeManagerBehavior>(TreeManagerBehavior).speed);
    this.speed = this.tree.getBehavior<TreeManagerBehavior>(TreeManagerBehavior).speed;
    if(this.actor.getPosition().y <= -2)this.actor.destroy();
    this.actor.moveY(-this.speed);
  }
}
Sup.registerBehavior(BranchBehavior);
