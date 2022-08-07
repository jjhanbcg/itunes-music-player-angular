import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ItunesTrack } from '../../interfaces/itunes-search-result.interface';
import { MusicService } from '../../services/music.service';

@Component({
  selector: 'app-artist-collection-details-container',
  template: `
    <app-artist-collection-details
      [track]="track$ | async"
      [tracks]="tracks$ | async"
    >
    </app-artist-collection-details>
  `,
})
export class ArtistCollectionDetailsContainerComponent {
  track$: Observable<ItunesTrack | null>;
  tracks$: Observable<ItunesTrack[]>;

  constructor(private musicService: MusicService) {
    this.track$ = this.musicService.selectedTrack$();
    this.tracks$ = this.musicService.collection$();
  }
}
