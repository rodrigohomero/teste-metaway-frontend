import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarPetDialogComponent } from './adicionar-pet-dialog.component';

describe('AdicionarPetDialogComponent', () => {
  let component: AdicionarPetDialogComponent;
  let fixture: ComponentFixture<AdicionarPetDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdicionarPetDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdicionarPetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
