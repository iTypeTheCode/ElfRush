class SoundManagerBehavior extends Sup.Behavior {
  sfxSOUND: boolean;
  musicSOUND: boolean;
  actors: Array<Sup.Actor>;
  
  inGameMusicPlayer = new Sup.Audio.SoundPlayer("Sounds/Music", 1.0, { loop: true });
  awake() {
    //let inGameMusicPlayer = new Sup.Audio.SoundPlayer("Sounds/myLittleDrum", 1.0, { loop: true });
    this.actors = Array(Sup.getActor("sfxButtonCheck"),Sup.getActor("musicButtonCheck"));
    //CHECKING IF SFXSOUND SAVE EXISTS IF NOT AUTOMATICALLY SET IT TO PLAY
    if(Sup.Storage.get("sfxSOUND")== null){
      Sup.Storage.set("sfxSOUND","true");
      Sup.getActor("sfxButtonCheck").spriteRenderer.setAnimation("checked");
      Sup.log("Nothing found for sfx, automatically created and playing.")
    }else{
      Sup.log("SFX sound: "+Sup.Storage.get("sfxSOUND"));
      Sup.getActor("sfxButtonCheck").spriteRenderer.setAnimation("checked");
      if(Sup.Storage.get("sfxSOUND")=="true"){
        this.sfxSOUND = true;
        
      }else{this.sfxSOUND = false;Sup.getActor("sfxButtonCheck").spriteRenderer.setAnimation("unchecked");}
    }
    //CHECKING IF MUSICSOUND SAVE EXISTS IF NOT AUTOMATICALLY SET IT TO PLAY
    if(Sup.Storage.get("musicSOUND")== null){
      Sup.Storage.set("musicSOUND","true");
      Sup.getActor("musicButtonCheck").spriteRenderer.setAnimation("checked");
      Sup.log("Nothing found for music, automatically created and playing.");
      if(this.inGameMusicPlayer.isPlaying()==false){
      this.inGameMusicPlayer.play();
      }
    }else{
      Sup.log("MUSIC sound: "+Sup.Storage.get("musicSOUND"));
      Sup.getActor("musicButtonCheck").spriteRenderer.setAnimation("checked");
      if(Sup.Storage.get("musicSOUND")=="true"){
        this.musicSOUND = true;
        if(this.inGameMusicPlayer.isPlaying()==false){
        this.inGameMusicPlayer.play();
        }
      }else{this.musicSOUND = false;Sup.getActor("musicButtonCheck").spriteRenderer.setAnimation("unchecked");this.inGameMusicPlayer.stop();}
    }
    
  }

  update() {
    
    //CLEARS ALL DATA WHEN BACKSPACE IS PRESSED
    if(Sup.Input.wasKeyJustPressed("BACK_SPACE")){
      Sup.Storage.clear();
      Sup.log("cleared data.");
    }
    
    let ray = new Sup.Math.Ray();
    ray.setFromCamera(Sup.getActor("Cam").camera,Sup.Input.getMousePosition());
    
    let hits = ray.intersectActors(this.actors);
    
    for (let hit of hits){
      if(hit.actor.getName()=="sfxButtonCheck"){
        //Sup.log("Hitting: "+hit.actor.getName());
        if(Sup.Input.wasMouseButtonJustPressed(0)){
            if(Sup.Storage.get("sfxSOUND")=="false"){
              Sup.Storage.set("sfxSOUND","true");
              this.sfxSOUND=true;
              Sup.log(Sup.Storage.get("sfxSOUND"));
              hit.actor.spriteRenderer.setAnimation("checked");
            }else{
              Sup.Storage.set("sfxSOUND","false");
              this.sfxSOUND=false;
              Sup.log(Sup.Storage.get("sfxSOUND"));
              hit.actor.spriteRenderer.setAnimation("unchecked");
            }
        }
      }
      if(hit.actor.getName()=="musicButtonCheck"){
        //Sup.log("Hitting: "+hit.actor.getName());
        if(Sup.Input.wasMouseButtonJustPressed(0)){
          if(Sup.Storage.get("musicSOUND")=="false"){
            Sup.Storage.set("musicSOUND","true");
            this.musicSOUND=true;
            this.inGameMusicPlayer.play();
            Sup.log(Sup.Storage.get("musicSOUND"));
            hit.actor.spriteRenderer.setAnimation("checked");
          }else{
            Sup.Storage.set("musicSOUND","false");
            this.musicSOUND=false;
            this.inGameMusicPlayer.stop();
            Sup.log(Sup.Storage.get("musicSOUND"));
            hit.actor.spriteRenderer.setAnimation("unchecked");
          }
        }
      }
    }
    
    if(Sup.Input.wasKeyJustPressed("T")){
      if(this.inGameMusicPlayer.isPlaying()==true){
        //this.inGameMusicPlayer.
      }
    }
    
    
  }
  
  stopMusic(){
    this.inGameMusicPlayer.stop();
  }
  
  playSound(SOUND: string, TYPE: string, VOLUME: number){
    if(TYPE=="SFX"){if(this.sfxSOUND==true){Sup.Audio.playSound(SOUND,VOLUME);}}
    if(TYPE=="MUSIC"){if(this.musicSOUND==true){Sup.Audio.playSound(SOUND,VOLUME);}}
    Sup.log("YOO");
  }
  
}
Sup.registerBehavior(SoundManagerBehavior);
