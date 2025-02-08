import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ALterarPetDialogComponent } from './alterar-pet-dialog.component';

describe('ALterarPetDialogComponent', () => {
  let component: ALterarPetDialogComponent;
  let fixture: ComponentFixture<ALterarPetDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ALterarPetDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ALterarPetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
