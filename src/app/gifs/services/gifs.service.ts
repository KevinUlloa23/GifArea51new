import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsReponse, Gif } from '../interface/gifs.interface';


@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey     :string = "SqL9o4WCp5JN4zChDsE6uap40fYfbjfy"
  private servicioUrl:string = "https://api.giphy.com/v1/gifs"
  private _historial : string[] = [];

  public resultados: Gif[] = [];


  get historial() {
    return [...this._historial];
  }

  constructor ( private http:HttpClient ){

    this._historial = JSON.parse(localStorage.getItem("historial")!) || [] ;
    this.resultados = JSON.parse(localStorage.getItem("resultados")!) || [] ;


    // if(localStorage.getItem("historial")) {
    //   this._historial =  JSON.parse(localStorage.getItem("historial")! );
    // }


  }

  buscargifs( query:string = "" ) {

    query = query.trim().toLocaleLowerCase();

    if( !this._historial.includes(query) ){
      this._historial.unshift(query);
      this._historial = this._historial.slice(0,10);

      localStorage.setItem( 'historial', JSON.stringify( this._historial ) );
    }


    const params = new HttpParams()
    .set("api_key", this.apiKey)
    .set("limit", "10")
    .set("q", query);

    this.http.get<SearchGifsReponse>(`${this.servicioUrl}/search`, { params })
    .subscribe( (resp) => {

      this.resultados = resp.data;
      localStorage.setItem( 'resultados', JSON.stringify( this.resultados ) );
    } )


  }


}
