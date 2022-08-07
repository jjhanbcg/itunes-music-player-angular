import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StreamState } from '../interfaces/stream-state';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  constructor() {}

  private stop$ = new Subject<void>();
  private audioObj = new Audio();
  private audioEvents = ['canplay', 'playing', 'pause', 'error'];
  private state: StreamState = {
    url: null,
    playing: false,
    duration: null,
    canplay: false,
    error: false,
  };

  stateChange$: BehaviorSubject<StreamState> = new BehaviorSubject(this.state);

  // Load new audio from url and play, subscribe to the observable until stop
  load(url: string): Observable<Event> {
    return this.streamObservable(url).pipe(takeUntil(this.stop$));
  }

  play(): void {
    this.audioObj.play();
  }

  pause(): void {
    this.audioObj.pause();
  }

  stop(): void {
    this.stop$.next();
  }

  private streamObservable(url: string): Observable<Event> {
    return new Observable((observer) => {
      // Load audio
      this.resetState();
      this.state.url = url;
      this.state.canplay = false;
      this.audioObj.src = url;
      this.audioObj.load();

      const handler = (event: Event) => {
        this.updateStateEvents(event);
        observer.next(event);
      };

      this.addEvents(this.audioObj, this.audioEvents, handler);

      // Return the unsubscribe function
      // Clean up and reset when unsubscribe
      return () => {
        // Stop Playing
        this.audioObj.pause();
        // remove event listeners
        this.removeEvents(this.audioObj, this.audioEvents, handler);
        // reset state
        this.resetState();
      };
    });
  }

  // Update audio state based on events
  private updateStateEvents(event: Event): void {
    let state = { ...this.state };
    switch (event.type) {
      case 'canplay':
        state.duration = this.audioObj.duration;
        state.canplay = true;
        break;
      case 'playing':
        state.playing = true;
        break;
      case 'pause':
        state.playing = false;
        break;
      case 'error':
        this.resetState();
        state.error = true;
        break;
    }
    this.stateChange$.next(state);
  }

  // Reset audio state
  private resetState() {
    this.state = {
      url: null,
      playing: false,
      duration: null,
      canplay: false,
      error: false,
    };
  }

  // Add listener to audio events
  private addEvents(
    obj: HTMLAudioElement,
    events: string[],
    handler: EventListenerOrEventListenerObject
  ) {
    events.forEach((event) => {
      obj.addEventListener(event, handler);
    });
  }

  // Remove listener on audio events
  private removeEvents(
    obj: HTMLAudioElement,
    events: string[],
    handler: EventListenerOrEventListenerObject
  ) {
    events.forEach((event) => {
      obj.removeEventListener(event, handler);
    });
  }
}
