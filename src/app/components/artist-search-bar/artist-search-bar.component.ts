import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-artist-search-bar',
  templateUrl: './artist-search-bar.component.html',
  styleUrls: ['./artist-search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistSearchBarComponent {
  @Input() control!: FormControl<string | null>;
  @Input() requesting: string | null = '';
}
