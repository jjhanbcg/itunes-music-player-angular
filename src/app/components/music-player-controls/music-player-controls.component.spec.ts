import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicPlayerControlsComponent } from './music-player-controls.component';

describe('MusicPlayerControlsComponent', () => {
  let component: MusicPlayerControlsComponent;
  let fixture: ComponentFixture<MusicPlayerControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicPlayerControlsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicPlayerControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
