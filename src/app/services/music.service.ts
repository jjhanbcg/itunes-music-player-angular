import { Injectable, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  filter,
  map,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { ItunesTrack } from '../interfaces/itunes-search-result.interface';
import { StreamState } from '../interfaces/stream-state';
import { ApiService } from './api.service';
import { AudioService } from './audio.service';

@Injectable({
  providedIn: 'root',
})
export class MusicService implements OnDestroy {
  control = new FormControl('');
  // Requesting status, requesting "tracks" or "collection" or no requests ""
  requesting$ = new BehaviorSubject<string>('');
  // A hash map of requested tracks
  tracksMap$ = new BehaviorSubject<{ [key: number]: ItunesTrack }>({});
  streamState$: Observable<StreamState> =
    this.audio.stateChange$.asObservable();

  private readonly destroyed$ = new Subject<void>();

  constructor(
    private api: ApiService,
    private audio: AudioService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  // On input text changes, update the location query param with the searched term
  // The API requests will be fired on location history changes
  search(): void {
    this.control.valueChanges
      .pipe(
        debounceTime(500),
        map((term) => term?.trim()),
        filter((term) => !!term),
        distinctUntilChanged(),
        tap((term) => this.addQueryParam({ term })),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  // Search a list of tracks based on the searched term from query param
  tracks$(): Observable<ItunesTrack[]> {
    return this.activatedRoute.queryParams.pipe(
      map((params) => params['term']?.trim()),
      filter((term) => !!term),
      distinctUntilChanged(),
      tap((term) => {
        this.requesting$.next('tracks');
        const queryTerm = decodeURIComponent(term);
        // Update input text with the search term from location history changes
        if (this.control.value !== queryTerm) {
          this.control.setValue(queryTerm, { onlySelf: true });
        }
      }),
      switchMap((terms) => this.api.searchArtistTracks(terms)),
      tap((tracks) => {
        this.requesting$.next('');
        // Save the tracks result in a hash map based on trackId
        const tracksMap = tracks.reduce(
          (map: { [key: string]: ItunesTrack }, track) => {
            map[track.trackId] = track;
            return map;
          },
          {}
        );
        this.tracksMap$.next(tracksMap);
      }),
      takeUntil(this.destroyed$)
    );
  }

  // Select a track track and update the query param with the track id and collection id
  selectTrack(track: ItunesTrack): void {
    const queryParams: Object = {
      selected: track.trackId,
      collection: this.isMobile() ? null : track.collectionId,
      // If it is mobile, then add the track id to the play query param, otherwise retain play track id
      play: this.isMobile()
        ? track.trackId
        : this.activatedRoute.snapshot.queryParamMap.get('play'),
    };
    this.addQueryParam(queryParams);
  }

  // Get selected track id from query param
  selectedTrackId$(): Observable<number | null> {
    return this.getQueryParamId$('selected');
  }

  // Get selected track from tracks hash map by track id
  selectedTrack$(): Observable<ItunesTrack | null> {
    return this.getTrack$(this.selectedTrackId$());
  }

  // Get play track id from query param
  playTrackId$(): Observable<number | null> {
    return this.getQueryParamId$('play');
  }

  // Get play track from tracks hash map by track id
  playTrack$(): Observable<ItunesTrack | null> {
    return this.getTrack$(this.playTrackId$());
  }

  observePlayTrack(): void {
    // Load audio on play track id changes from query param
    this.playTrack$()
      .pipe(
        map((track) => track?.previewUrl),
        distinctUntilChanged(),
        tap((previewUrl) => {
          if (previewUrl) {
            this.audio.stop();
            this.audio.load(previewUrl as string).subscribe();
          } else {
            this.audio.pause();
          }
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe();

    // Play audio on audio event canplay
    this.streamState$
      .pipe(
        distinctUntilKeyChanged('canplay'),
        filter((state) => state.canplay),
        tap(() => this.audio.play()),
        takeUntil(this.destroyed$)
      )
      .subscribe();

    // Remove play track id from query param on audio pause/stop
    combineLatest([
      this.playTrack$(),
      this.streamState$.pipe(distinctUntilKeyChanged('playing')),
    ]).pipe(
      tap(([track, state]) => {
        if (track?.previewUrl === state.url && !state.playing) {
          this.addQueryParam({ play: null });
        }
      }),
      takeUntil(this.destroyed$)
    );
  }

  // Get collection id from query param
  collectionId$(): Observable<number | null> {
    return this.getQueryParamId$('collection');
  }

  // Seach current selected tracks's collection based on collection query param
  collection$(): Observable<ItunesTrack[]> {
    return this.collectionId$().pipe(
      filter((collectionId) => !!collectionId),
      tap(() => this.requesting$.next('collection')),
      switchMap((collectionId) =>
        this.api.lookupCollection([collectionId as number])
      ),
      tap(() => this.requesting$.next(''))
    );
  }

  // Add track id to query param when user clicks play
  play(track: ItunesTrack | null): void {
    if (track) {
      this.addQueryParam({ play: track.trackId });
    }
  }

  // The audio will be paused on play query param removed
  pause(): void {
    this.addQueryParam({ play: null });
  }

  // Only show music playing if the audio is playing and
  // the selected track id is the same as the playing track id
  isPlaying$(): Observable<boolean> {
    return combineLatest([
      this.streamState$,
      this.activatedRoute.queryParams,
    ]).pipe(
      map(
        ([state, params]) =>
          state.playing && params['selected'] === params['play']
      )
    );
  }

  // Mobile break point is 768px
  private isMobile(): boolean {
    return window.innerWidth <= 768;
  }

  // Add/Update query param
  private addQueryParam(param: object): void {
    this.router.navigate([], {
      queryParams: param,
      queryParamsHandling: 'merge',
    });
  }

  private getQueryParamId$(param: string): Observable<number | null> {
    return this.activatedRoute.queryParams.pipe(
      map((params) => Number(params[param]?.trim())),
      map((id) => (isNaN(id) ? null : id)),
      distinctUntilChanged()
    );
  }

  private getTrack$(
    id$: Observable<number | null>
  ): Observable<ItunesTrack | null> {
    return combineLatest([id$, this.tracksMap$]).pipe(
      map(([id, tracksMap]) => (id ? tracksMap[id] : null))
    );
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
