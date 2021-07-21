import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FornecedoresService } from '../services/fornecedores.service';

@Component({
  selector: 'app-cadastro-fornecedores',
  templateUrl: './cadastro-fornecedores.component.html',
  styleUrls: ['./cadastro-fornecedores.component.css']
})
export class CadastroFornecedoresComponent implements OnInit {

  //atributos (campos)
  mensagemSucesso = '';
  mensagemErro = '';

  //inicialização por meio de injeção de dependencia (@AutoWired)
  constructor(private fornecedoresService: FornecedoresService) { }

  ngOnInit(): void {
  }

  //objeto para capturar os campos do formulário
  formCadastro = new FormGroup({

    //declarando o campo 'nome' do formulário
    nome: new FormControl('', [
      Validators.required, //campo obrigatório
      Validators.pattern('^[A-Za-zÀ-Üà-ü0-9\\s]{6,150}$')
      //expressão regular (REGEX)
    ]),

    //declarando o campo 'cnpj' do formulário
    cnpj: new FormControl('', [
      Validators.required, //campo obrigatório
      Validators.pattern('^[0-9]{14}$') //expressão regular (REGEX)
    ])

  });

  //criando um objeto para utilizar o formulário na página
  get form(): any {
    return this.formCadastro.controls;
  }

  //função executada no SUBMIT do formulário
  cadastrarFornecedor(): void {

    //limpar o conteudo das mensagens
    this.mensagemSucesso = '';
    this.mensagemErro = '';

    //executando uma chamada POST para a API

    this.fornecedoresService.post(this.formCadastro.value)
      .subscribe(
        (data) => { //retorno de sucesso da API
          this.mensagemSucesso = data;
          //limpar os campos do formulario
          this.formCadastro.reset();
        },
        (e) => { //retorno de erro da API
          this.mensagemErro = e.error;
        }
      );
  }
}
