import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroFornecedoresComponent } from './cadastro-fornecedores.component';

describe('CadastroFornecedoresComponent', () => {
  let component: CadastroFornecedoresComponent;
  let fixture: ComponentFixture<CadastroFornecedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroFornecedoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroFornecedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
