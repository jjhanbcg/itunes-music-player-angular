import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ItunesTrack } from '../../interfaces/itunes-search-result.interface';

@Component({
  selector: 'app-artist-collection-details',
  templateUrl: './artist-collection-details.component.html',
  styleUrls: ['./artist-collection-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistCollectionDetailsComponent {
  @Input() track: ItunesTrack | null = null;
  @Input() tracks: ItunesTrack[] | null = [];

  trackByFn(_index: number, item: ItunesTrack): number {
    return item.trackId;
  }
}
