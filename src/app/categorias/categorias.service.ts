import { Categoria } from './model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  categoriasURL = environment.urlServicos+'/categorias';
  urlFiltro;

  constructor(private http: HttpClient) { }



  pesquisar(filtro: any): Promise<any> {
    if(filtro.nome){
      this.urlFiltro =  environment.urlServicos+'/categorias/filtro?nome='+filtro.nome;
    }else{
      this.urlFiltro =  environment.urlServicos+'/categorias';
    }

    return this.http.get<any>(this.urlFiltro).toPromise();
  }

  excluir(id:number):Promise<void>{
    return this.http.delete(this.categoriasURL+'/'+id)
    .toPromise()
    .then(() => null);
  }

  adicionar(categoria: Categoria): Promise<any>{
    return this.http.post(this.categoriasURL, categoria)
    .toPromise();
  }

  alterar(categoria: Categoria): Promise<any>{
    return this.http.put(this.categoriasURL+'/'+categoria.id, categoria)
    .toPromise();
  }

  buscarPorCodigo(codigo: number): Promise<Categoria> {
    return this.http.get<Categoria>(this.categoriasURL+'/'+codigo).toPromise();
  }




}
