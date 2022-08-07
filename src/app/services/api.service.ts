import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, UrlCreationOptions, UrlSerializer } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import {
  ItunesArtist,
  ItunesArtistResponse,
  ItunesArtistTracksResponse,
  ItunesCollectionTracksResponse,
  ItunesTrack,
} from '../interfaces/itunes-search-result.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private serializer: UrlSerializer
  ) {}

  private readonly _endpoint = 'https://itunes.apple.com';

  // Search tracks from an artist
  // Consists two calls, firstly search artists by name then look up tracks by artist ids
  searchArtistTracks(term: string | null): Observable<ItunesTrack[]> {
    return this.searchArtists(term).pipe(
      // Extracting artistIds from a list of artists match the search term
      map((artists) => artists.map((artist) => artist.artistId)),
      // Lookup artists' tracks by artistIds
      switchMap((artistIds) => this.lookupArtistTracks(artistIds))
    );
  }

  // Search artists by name
  // https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/Searching.html#//apple_ref/doc/uid/TP40017632-CH5-SW1
  searchArtists(term: string | null): Observable<ItunesArtist[]> {
    term = term && term.trim();
    const queryStr = this.getQueryStr(['/search'], {
      queryParams: {
        term,
        entity: 'allArtist',
        limit: 50,
      },
    });
    return this.http
      .jsonp<ItunesArtistResponse>(queryStr, 'callback')
      .pipe(map((resp) => resp.results));
  }

  // Look up artists' tracks by artistIds
  // https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/LookupExamples.html#//apple_ref/doc/uid/TP40017632-CH7-SW1
  lookupArtistTracks(artistIds: number[]): Observable<ItunesTrack[]> {
    const queryStr = this.getTracksQueryStr(artistIds);

    return this.http
      .jsonp<ItunesArtistTracksResponse>(queryStr, 'callback')
      .pipe(
        map((resp) =>
          resp.results.filter(
            (item): item is ItunesTrack => item.wrapperType === 'track'
          )
        )
      );
  }

  // Look up tracks in collection
  // https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/LookupExamples.html#//apple_ref/doc/uid/TP40017632-CH7-SW1
  lookupCollection(collectionIds: number[]): Observable<ItunesTrack[]> {
    const queryStr = this.getTracksQueryStr(collectionIds);
    return this.http
      .jsonp<ItunesCollectionTracksResponse>(queryStr, 'callback')
      .pipe(
        map((resp) =>
          resp.results.filter(
            (item): item is ItunesTrack => item.wrapperType === 'track'
          )
        )
      );
  }

  // Encode query string
  private getQueryStr(
    commands: any[],
    navigationExtras?: UrlCreationOptions | undefined
  ): string {
    const tree = this.router.createUrlTree(commands, navigationExtras);
    /*
     * https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/Searching.html#//apple_ref/doc/uid/TP40017632-CH5-SW1
     * Note: URL encoding replaces spaces with the plus (+) character and all characters
     * except the following are encoded: letters, numbers, periods (.), dashes (-), underscores (_), and asterisks (*).
     */
    const query = this.serializer.serialize(tree).replace(/%20/g, '+');
    return this._endpoint + query;
  }

  // Get query string for looking up tracks
  // By default, limit the results to get the latest 5 tracks from each artist
  private getTracksQueryStr(ids: number[], limit = 5): string {
    // Limit results for optimising performance, at least one track from each artist
    limit = Math.ceil(50 / ids.length);
    return this.getQueryStr(['/lookup'], {
      queryParams: {
        id: ids.join(','),
        media: 'music',
        entity: 'song',
        limit,
      },
    });
  }
}
