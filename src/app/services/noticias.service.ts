import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RootObject } from "../interfaces/interfaces";
import { environment } from "../../environments/environment";

const API_KEY = environment.apiKey;
const API_URL = environment.apiUrl;
const headers: HttpHeaders = new HttpHeaders({
  "X-Api-Key": API_KEY,
});

@Injectable({
  providedIn: "root",
})
export class NoticiasService {
  constructor(private http: HttpClient) {}
  page: number = 0;

  categoriaActual: string = "";
  categoriaPage: number = 1;

  private ejecutarQuery<T>(query: string) {
    query = API_URL + query;
    return this.http.get<T>(query, { headers });
  }
  getNoticias() {
    this.page++;
    return this.ejecutarQuery<RootObject>(
      `/top-headlines?country=us&page=${this.page}`
    );
  }

  getNoticiasByCategoria(categoria) {
    if (this.categoriaActual === categoria) {
      this.categoriaPage++;
    } else {
      this.categoriaActual = categoria;
      this.categoriaPage = 1;
    }
    console.log(categoria);
    return this.ejecutarQuery<RootObject>(
      `/top-headlines?category=${categoria.toLowerCase()}&page=${
        this.categoriaPage
      }`
    );
  }
}
