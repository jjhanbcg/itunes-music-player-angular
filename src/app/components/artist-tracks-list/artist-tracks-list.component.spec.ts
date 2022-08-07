import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistTracksListComponent } from './artist-tracks-list.component';

describe('ArtistTracksListComponent', () => {
  let component: ArtistTracksListComponent;
  let fixture: ComponentFixture<ArtistTracksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtistTracksListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtistTracksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
