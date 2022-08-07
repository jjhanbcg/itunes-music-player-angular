import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistCollectionDetailsContainerComponent } from './artist-collection-details-container.component';

describe('ArtistCollectionDetailsContainerComponent', () => {
  let component: ArtistCollectionDetailsContainerComponent;
  let fixture: ComponentFixture<ArtistCollectionDetailsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistCollectionDetailsContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistCollectionDetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
