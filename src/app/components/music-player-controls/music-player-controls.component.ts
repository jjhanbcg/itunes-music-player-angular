import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ItunesTrack } from 'src/app/interfaces/itunes-search-result.interface';

@Component({
  selector: 'app-music-player-controls',
  templateUrl: './music-player-controls.component.html',
  styleUrls: ['./music-player-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MusicPlayerControlsComponent {
  @Input() track: ItunesTrack | null = null;
  @Input() playing: boolean | null = false;

  @Output() toggle = new EventEmitter<{
    track: ItunesTrack | null;
    playing: boolean | null;
  }>();

  onToggle(): void {
    this.toggle.emit({ track: this.track, playing: this.playing });
  }
}
