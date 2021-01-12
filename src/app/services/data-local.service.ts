import { Injectable } from "@angular/core";
import { Article } from "src/app/interfaces/interfaces";
import { Storage } from "@ionic/storage";
@Injectable({
  providedIn: "root",
})
export class DataLocalService {
  noticias: Article[] = [];
  constructor(private storage: Storage) {
    this.getFavoritos();
  }

  guardarNoticia(noticia: Article): void {
    const existe = this.noticias.find((noti) => noti.title === noticia.title);
    if (!existe) {
      this.noticias.unshift(noticia);
      this.storage.set("favoritos", this.noticias);
    }
  }

  async getFavoritos() {
    const favoritos = await this.storage.get("favoritos");
    this.noticias = favoritos;
    if (!this.noticias) {
      this.noticias = [];
    }
  }

  borrarFavoritos(noticia: Article): void {
    this.noticias = this.noticias.filter((noti) => noti.title != noticia.title);
    this.storage.set("favoritos", this.noticias);
  }
}
