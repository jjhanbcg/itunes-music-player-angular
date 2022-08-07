import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ItunesTrack } from './interfaces/itunes-search-result.interface';
import { MusicService } from './services/music.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  selectedTrack$: Observable<ItunesTrack | null>;

  constructor(private musicService: MusicService) {
    this.selectedTrack$ = this.musicService.selectedTrack$();
    this.musicService.observePlayTrack();
  }
}
