import { Component, Input, OnInit } from "@angular/core";
import { Article } from "../../interfaces/interfaces";

@Component({
  selector: "app-lista-noticias",
  templateUrl: "./lista-noticias.component.html",
  styleUrls: ["./lista-noticias.component.scss"],
})
export class ListaNoticiasComponent implements OnInit {
  @Input() articles: Article[];
  @Input() favorito: boolean = false;
  constructor() {}

  ngOnInit() {}
}
