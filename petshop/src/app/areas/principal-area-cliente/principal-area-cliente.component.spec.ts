import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalAreaClienteComponent } from './principal-area-cliente.component';

describe('PrincipalAreaClienteComponent', () => {
  let component: PrincipalAreaClienteComponent;
  let fixture: ComponentFixture<PrincipalAreaClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrincipalAreaClienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrincipalAreaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
