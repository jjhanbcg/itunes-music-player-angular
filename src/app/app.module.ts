import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  ArtistCollectionDetailsComponent,
  ArtistSearchBarComponent,
  ArtistTracksListComponent,
  MusicPlayerControlsComponent,
} from './components';
import {
  ArtistCollectionDetailsContainerComponent,
  ArtistSearchBarContainerComponent,
  ArtistTracksListContainerComponent,
  MusicPlayerControlsContainerComponent,
} from './containers';

@NgModule({
  declarations: [
    AppComponent,
    ArtistCollectionDetailsComponent,
    ArtistCollectionDetailsContainerComponent,
    ArtistSearchBarComponent,
    ArtistSearchBarContainerComponent,
    ArtistTracksListComponent,
    ArtistTracksListContainerComponent,
    MusicPlayerControlsComponent,
    MusicPlayerControlsContainerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
