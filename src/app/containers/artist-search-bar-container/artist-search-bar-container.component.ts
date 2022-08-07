import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MusicService } from '../../services/music.service';

@Component({
  selector: 'app-artist-search-bar-container',
  template: `
    <app-artist-search-bar
      [control]="control"
      [requesting]="requesting$ | async"
    >
    </app-artist-search-bar>
  `,
})
export class ArtistSearchBarContainerComponent implements OnInit {
  control: FormControl<string | null>;
  requesting$: Observable<string>;

  constructor(private musicService: MusicService) {
    this.control = this.musicService.control;
    this.requesting$ = this.musicService.requesting$;
  }

  ngOnInit(): void {
    this.musicService.search();
    this.musicService.tracks$();
  }
}
