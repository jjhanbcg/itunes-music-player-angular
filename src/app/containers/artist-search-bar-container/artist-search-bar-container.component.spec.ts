import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistSearchBarContainerComponent } from './artist-search-bar-container.component';

describe('ArtistSearchBarContainerComponent', () => {
  let component: ArtistSearchBarContainerComponent;
  let fixture: ComponentFixture<ArtistSearchBarContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistSearchBarContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistSearchBarContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
