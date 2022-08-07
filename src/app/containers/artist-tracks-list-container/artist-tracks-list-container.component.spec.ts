import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistTracksListContainerComponent } from './artist-tracks-list-container.component';

describe('ArtistTracksListContainerComponent', () => {
  let component: ArtistTracksListContainerComponent;
  let fixture: ComponentFixture<ArtistTracksListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtistTracksListContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtistTracksListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
