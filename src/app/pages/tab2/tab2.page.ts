import { Component, OnInit, ViewChild } from "@angular/core";
import { NoticiasService } from "../../services/noticias.service";
import { Article } from "src/app/interfaces/interfaces";
import { IonSegment } from "@ionic/angular";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page implements OnInit {
  articles: Article[] = [];
  categorias: string[] = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];
  categoriaActual: string = this.categorias[0];
  constructor(private noticiasService: NoticiasService) {}

  ngOnInit() {
    this.setNoticias(this.categorias[0]);
  }

  segmentChanged(event) {
    this.categoriaActual = event.detail.value;
    this.articles = [];
    this.setNoticias(this.categoriaActual);
    console.log(this.categoriaActual);
  }

  setNoticias(categoria: string, event?) {
    this.noticiasService.getNoticiasByCategoria(categoria).subscribe((res) => {
      if (res.articles.length === 0) {
        event.target.disabled = true;
        event.target.complete();
        return;
      }
      this.articles.push(...res.articles);
      if (event) {
        event.target.complete();
      }
    });
  }

  loadData(event) {
    this.setNoticias(this.categoriaActual, event);
  }
}
