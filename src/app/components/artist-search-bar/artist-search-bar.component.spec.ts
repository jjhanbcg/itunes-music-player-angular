import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistSearchBarComponent } from './artist-search-bar.component';

describe('ArtistSearchBarComponent', () => {
  let component: ArtistSearchBarComponent;
  let fixture: ComponentFixture<ArtistSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistSearchBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
