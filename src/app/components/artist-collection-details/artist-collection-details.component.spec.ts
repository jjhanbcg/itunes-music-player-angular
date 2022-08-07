import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistCollectionDetailsComponent } from './artist-collection-details.component';

describe('ArtistCollectionDetailsComponent', () => {
  let component: ArtistCollectionDetailsComponent;
  let fixture: ComponentFixture<ArtistCollectionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistCollectionDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistCollectionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
