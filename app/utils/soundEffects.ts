class SoundEffects {
  private static instance: SoundEffects;
  private sounds: { [key: string]: HTMLAudioElement } = {};
  private isMuted: boolean = false;
  private isInitialized: boolean = false;

  private constructor() {
    if (typeof window !== 'undefined') {
      try {
        this.sounds = {
          hover: new Audio('/sounds/hover.mp3'),
          scroll: new Audio('/sounds/scroll.mp3'),
          click: new Audio('/sounds/click.mp3')
        };
        this.isInitialized = true;
      } catch (error) {
        console.warn('Sound effects initialization failed:', error);
      }
    }
  }

  public static getInstance(): SoundEffects {
    if (!SoundEffects.instance) {
      SoundEffects.instance = new SoundEffects();
    }
    return SoundEffects.instance;
  }

  public play(soundName: 'hover' | 'scroll' | 'click'): void {
    if (!this.isInitialized || this.isMuted || typeof window === 'undefined') return;
    
    try {
      const sound = this.sounds[soundName];
      if (sound) {
        sound.currentTime = 0;
        sound.play().catch(error => {
          console.warn(`Failed to play sound ${soundName}:`, error);
        });
      }
    } catch (error) {
      console.warn(`Error playing sound ${soundName}:`, error);
    }
  }

  public toggleMute(): void {
    this.isMuted = !this.isMuted;
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
  }

  public isSoundMuted(): boolean {
    return this.isMuted;
  }
}

export const soundEffects = SoundEffects.getInstance(); 