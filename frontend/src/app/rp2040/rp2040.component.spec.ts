import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rp2040Component } from './rp2040.component';

describe('Rp2040Component', () => {
  let component: Rp2040Component;
  let fixture: ComponentFixture<Rp2040Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Rp2040Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Rp2040Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
