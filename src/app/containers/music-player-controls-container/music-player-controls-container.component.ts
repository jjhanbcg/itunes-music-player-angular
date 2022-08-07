import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ItunesTrack } from 'src/app/interfaces/itunes-search-result.interface';
import { MusicService } from '../../services/music.service';

@Component({
  selector: 'app-music-player-controls-container',
  template: `
    <app-music-player-controls
      [track]="track$ | async"
      [playing]="playing$ | async"
      (toggle)="onToggle($event)"
    >
    </app-music-player-controls>
  `,
})
export class MusicPlayerControlsContainerComponent {
  track$: Observable<ItunesTrack | null>;
  playing$: Observable<boolean>;

  constructor(private musicService: MusicService) {
    this.track$ = this.musicService.selectedTrack$();
    this.playing$ = this.musicService.isPlaying$();
  }

  onToggle(event: {
    track: ItunesTrack | null;
    playing: boolean | null;
  }): void {
    if (event.playing) {
      this.musicService.pause();
    } else if (event.track) {
      this.musicService.play(event.track);
    }
  }
}
