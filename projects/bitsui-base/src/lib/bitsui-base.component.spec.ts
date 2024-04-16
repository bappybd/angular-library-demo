import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BitsuiBaseComponent } from './bitsui-base.component';

describe('BitsuiBaseComponent', () => {
  let component: BitsuiBaseComponent;
  let fixture: ComponentFixture<BitsuiBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BitsuiBaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BitsuiBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
