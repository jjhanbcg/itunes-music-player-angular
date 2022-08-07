import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicPlayerControlsContainerComponent } from './music-player-controls-container.component';

describe('MusicPlayerControlsContainerComponent', () => {
  let component: MusicPlayerControlsContainerComponent;
  let fixture: ComponentFixture<MusicPlayerControlsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicPlayerControlsContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicPlayerControlsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
