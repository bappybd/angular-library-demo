import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BitsuiCoreComponent } from './bitsui-core.component';

describe('BitsuiCoreComponent', () => {
  let component: BitsuiCoreComponent;
  let fixture: ComponentFixture<BitsuiCoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BitsuiCoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BitsuiCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
