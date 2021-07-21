import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FornecedoresService } from '../services/fornecedores.service';
import { CategoriasService } from '../services/categorias.service';
import { ProdutosService } from '../services/produtos.service';

@Component({
  selector: 'app-cadastro-produtos',
  templateUrl: './cadastro-produtos.component.html',
  styleUrls: ['./cadastro-produtos.component.css']
})
export class CadastroProdutosComponent implements OnInit {

  //atributos (campos)
  mensagemSucesso = '';
  mensagemErro = '';

  fornecedores = [
    {
      idFornecedor: 0,
      nome: '',
      cnpj: ''
    }
  ];

  categorias = [];

  //inicialização por injeção de dependencia (@Autowired)
  constructor(
    private fornecedoresService: FornecedoresService,
    private categoriasService: CategoriasService,
    private produtosService: ProdutosService
  ) { }

  //objeto para definir o conteudo do formulario
  formCadastro = new FormGroup({

    nome: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-zÀ-Üà-ü0-9\\s]{6,150}$')
    ]),

    preco: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9.]{1,9}$')
    ]),

    quantidade: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{1,6}$')
    ]),

    dataCompra: new FormControl('', [
      Validators.required
    ]),

    categoria: new FormControl('', [
      Validators.required
    ]),

    fornecedor: new FormControl('', [
      Validators.required
    ])

  });

  //objeto para manipular os campos do formulario
  get form(): any {
    return this.formCadastro.controls;
  }

  //evento executado quando o componente é carregado (aberto)
  ngOnInit(): void {

    //executando uma chamada HTTP GET para a API..
    //consultar fornecedores
    this.fornecedoresService.get()
      .subscribe(
        (data) => {
          this.fornecedores = (data as any[]);
        },
        (e) => {
          console.log(e);
        }
      );

    //executando uma chamada HTTP GET para a API..
    //consultar categorias
    this.categoriasService.get()
      .subscribe(
        (data) => {
          this.categorias = (data as []);
        },
        (e) => {
          console.log(e);
        }
      );
  }

  //função para realizar o cadastro do produto
  //executada no evento SUBMIT do formulário
  cadastrarProduto(): void {

    //limpar o conteudo das mensagens
    this.mensagemSucesso = '';
    this.mensagemErro = '';

    //executando uma chamada POST para a API
    this.produtosService.post(this.formCadastro.value)
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
