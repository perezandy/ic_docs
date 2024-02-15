import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardtutorialComponent } from './boardtutorial.component';

describe('BoardtutorialComponent', () => {
  let component: BoardtutorialComponent;
  let fixture: ComponentFixture<BoardtutorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardtutorialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoardtutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
