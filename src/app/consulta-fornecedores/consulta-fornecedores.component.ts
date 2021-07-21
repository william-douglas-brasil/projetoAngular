import { Component, OnInit } from '@angular/core';
import { FornecedoresService } from '../services/fornecedores.service';

@Component({
  selector: 'app-consulta-fornecedores',
  templateUrl: './consulta-fornecedores.component.html',
  styleUrls: ['./consulta-fornecedores.component.css']
})
export class ConsultaFornecedoresComponent implements OnInit {

  //atributos..

  mensagemSucessoExclusao = "";
  mensagemErroExclusao = "";

  mensagemSucessoEdicao = "";
  mensagemErroEdicao = "";

  pesquisa = "";

  //listagem de fornecedores
  fornecedores = [
    {
      idFornecedor: 0,
      nome: '',
      cnpj: ''
    }
  ];

  //armazenar os dados de 1 fornecedor
  fornecedor = {
    idFornecedor: 0,
    nome: '',
    cnpj: ''
  }

  //atributo para armazenar a página atual
  //do componente de paginação
  page = 1;


  //@Autowired -> injeção de dependencia
  constructor(private fornecedoresService: FornecedoresService) { }

  //função executada quando o componente é carregado!

  ngOnInit(): void { //abrir o componente..
    //executando a consulta de fornecedores na API..
    this.fornecedoresService.get()
      .subscribe( //callback da API (retorno)
        (data) => { //resposta de sucesso
          this.fornecedores = (data as any[]);
        },
        (e) => { //resposta de erro
          console.log(e);
        }
      )
  }

  //função para buscar 1 fornecedor na API atraves do ID
  obterFornecedor(idFornecedor: number): void {

    this.mensagemSucessoExclusao = "";
    this.mensagemErroExclusao = "";

    this.mensagemSucessoEdicao = "";
    this.mensagemErroEdicao = "";

    //consultar o fornecedor na API atraves do ID
    this.fornecedoresService.getById(idFornecedor)
      .subscribe(
        (data) => {
          this.fornecedor = (data as any);
        },
        (e) => {
          console.log(e);
        }
      )
  }

  //função para excluir o fornecedor na API
  excluirFornecedor(idFornecedor: number): void {
    //fazendo uma chamada ao serviço de exclusão da API
    this.fornecedoresService.delete(idFornecedor)
      .subscribe(
        (data) => {
          this.mensagemSucessoExclusao = data;
          this.ngOnInit(); //executando a consulta
        },
        (e) => {
          this.mensagemErroExclusao = e.error;
        }
      )
  }


  //função para atualizar um fornecedor
  atualizarFornecedor(formEdicao: any): void {
    //fazendo uma chamada para o serviço de edição da API
    this.fornecedoresService.put(formEdicao.form.value)
      .subscribe(
        (data) => {
          this.mensagemSucessoEdicao = data;
          this.ngOnInit(); //executar a consulta
        },
        (e) => {
          console.log(e);
          this.mensagemErroEdicao = "Não foi possível realizar a exclusão do fornecedor.";
        }
      )
  }

  //função para realizar a paginação
  //avançar ou voltar na paginação
  handlePageChange(event: number) {
    this.page = event;
  }

}
