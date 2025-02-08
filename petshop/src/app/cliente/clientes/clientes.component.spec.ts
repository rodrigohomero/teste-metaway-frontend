import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarClientesComponent } from './clientes.component';

describe('GerenciarClientesComponent', () => {
  let component: GerenciarClientesComponent;
  let fixture: ComponentFixture<GerenciarClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciarClientesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GerenciarClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
