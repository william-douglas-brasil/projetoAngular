import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  //atributo
  endpoint = environment.apiUrl + "/produtos";

  //injeção de dependência (@Autowired)
  constructor(private httpClient: HttpClient) { }

  //método para chamar o serviço POST
  post(produto: any) {

    const formData = new FormData();

    formData.append('nome', produto.nome);
    formData.append('preco', produto.preco);
    formData.append('quantidade', produto.quantidade);
    formData.append('dataCompra', produto.dataCompra);
    formData.append('categoria', produto.categoria);
    formData.append('fornecedor', produto.fornecedor);

    return this.httpClient.post(this.endpoint, formData,
      { responseType: 'text' })
  }

  //método para chamar o serviço PUT 
  put(produto: any) {

    const formData = new FormData();

    formData.append('idProduto', produto.idProduto);
    formData.append('nome', produto.nome);
    formData.append('preco', produto.preco);
    formData.append('quantidade', produto.quantidade);
    formData.append('dataCompra', produto.dataCompra);
    formData.append('categoria', produto.categoria);

    return this.httpClient.put(this.endpoint, formData,
      { responseType: 'text' })
  }

  //método para chamar o serviço DELETE
  delete(idProduto: number) {
    return this.httpClient.delete(this.endpoint + "/" + idProduto,
      { responseType: 'text' })
  }


  //método para chamar o serviço GET
  get() {
    return this.httpClient.get(this.endpoint);
  }

  //método para chamar o serviço GET por ID
  getById(idProduto: number) {
    return this.httpClient.get(this.endpoint + "/" + idProduto)
  }

}
