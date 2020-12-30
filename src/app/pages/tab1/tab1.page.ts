import { Component, OnInit } from "@angular/core";
import { Article } from "src/app/interfaces/interfaces";
import { NoticiasService } from "../../services/noticias.service";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page implements OnInit {
  articles: Article[] = [];
  constructor(private noticiasService: NoticiasService) {}

  ngOnInit() {
    this.cargarNoticias();
  }

  loadData(event) {
    this.cargarNoticias(event);
  }

  cargarNoticias(event?) {
    this.noticiasService.getNoticias().subscribe((res) => {
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
}
