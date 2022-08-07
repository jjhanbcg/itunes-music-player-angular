import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ItunesTrack } from '../../interfaces/itunes-search-result.interface';

@Component({
  selector: 'app-artist-tracks-list',
  templateUrl: './artist-tracks-list.component.html',
  styleUrls: ['./artist-tracks-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistTracksListComponent {
  @Input() tracks: ItunesTrack[] | null = [];
  @Input() selected: number | null = null;
  @Input() play: number | null = null;
  @Input() playing: boolean | null = false;

  @Output() onSelected = new EventEmitter<ItunesTrack>();

  trackByFn(_index: number, item: ItunesTrack): number {
    return item.trackId;
  }

  onSelectTrack(track: ItunesTrack): void {
    this.onSelected.emit(track);
  }
}
