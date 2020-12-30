import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { ListaNoticiasComponent } from "./lista-noticias/lista-noticias.component";
import { NoticiaComponent } from "./noticia/noticia.component";

@NgModule({
  declarations: [ListaNoticiasComponent, NoticiaComponent],
  imports: [CommonModule, IonicModule],
  exports: [ListaNoticiasComponent, NoticiaComponent],
})
export class ComponentsModule {}
