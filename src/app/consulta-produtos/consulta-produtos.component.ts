import { Component, OnInit } from '@angular/core';
import { ProdutosService } from '../services/produtos.service';

@Component({
  selector: 'app-consulta-produtos',
  templateUrl: './consulta-produtos.component.html',
  styleUrls: ['./consulta-produtos.component.css']
})
export class ConsultaProdutosComponent implements OnInit {

  //listagem de produtos
  produtos = [
    {
      idFornecedor: 0,
      nome: '',
      preco: '',
      quantidade: '',
      total: '',
      dataCompra: '',
      categoria: '',
      fornecedor: {
        nome: '',
        cnpj: ''
      }
    }
  ];

  //atributo para armazenar a página atual
  //do componente de paginação
  page = 1;

  //Injeção de dependencia
  constructor(private produtosService: ProdutosService) { }

  //função executada quando o componente é carregado!

  ngOnInit(): void { //abrir o componente..
    //executando a consulta de produtos na API..
    this.produtosService.get()
      .subscribe( //callback da API (retorno)
        (data) => { //resposta de sucesso
          this.produtos = (data as any[]);
        },
        (e) => { //resposta de erro
          console.log(e);
        }
      )
  }
  //função para realizar a paginação
  //avançar ou voltar na paginação
  handlePageChange(event: number) {
    this.page = event;
  }
}
