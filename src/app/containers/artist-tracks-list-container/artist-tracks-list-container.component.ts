import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ItunesTrack } from '../../interfaces/itunes-search-result.interface';
import { MusicService } from '../../services/music.service';

@Component({
  selector: 'app-artist-tracks-list-container',
  template: `
    <app-artist-tracks-list
      [tracks]="tracks$ | async"
      [selected]="selected$ | async"
      [play]="play$ | async"
      [playing]="playing$ | async"
      (onSelected)="onSelectedTrack($event)"
    >
    </app-artist-tracks-list>
  `,
})
export class ArtistTracksListContainerComponent {
  tracks$: Observable<ItunesTrack[]>;
  selected$: Observable<number | null>;
  play$: Observable<number | null>;
  playing$: Observable<boolean | null>;

  constructor(private musicService: MusicService) {
    this.tracks$ = this.musicService.tracks$();
    this.selected$ = this.musicService.selectedTrackId$();
    this.play$ = this.musicService.playTrackId$();
    this.playing$ = this.musicService.streamState$.pipe(
      map((state) => state.playing)
    );
  }

  onSelectedTrack(track: ItunesTrack): void {
    this.musicService.selectTrack(track);
  }
}
