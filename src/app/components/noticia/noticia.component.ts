import { Component, Input, OnInit } from "@angular/core";
import { Article } from "../../interfaces/interfaces";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { ActionSheetController, ToastController } from "@ionic/angular";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { DataLocalService } from "../../services/data-local.service";

@Component({
  selector: "app-noticia",
  templateUrl: "./noticia.component.html",
  styleUrls: ["./noticia.component.scss"],
})
export class NoticiaComponent implements OnInit {
  @Input() article: Article;
  @Input() index: number;
  @Input() favorito: boolean = false;
  constructor(
    private iab: InAppBrowser,
    public actionSheetController: ActionSheetController,
    private socialSharing: SocialSharing,
    public dataLocalService: DataLocalService,
    public toastController: ToastController
  ) {}

  ngOnInit() {}

  abrirNoticia() {
    const browser = this.iab.create(this.article.url, "system");
  }

  async presentActionSheet() {
    const button = this.checkButton();

    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          cssClass: "dark",
          text: "Share ",
          icon: "share",
          handler: () => {
            this.socialSharing.share(
              "Noticias  ",
              this.article.title,
              "",
              this.article.url
            );
          },
        },
        button,
        {
          cssClass: "dark",
          text: "Cancel",
          icon: "close",
          handler: () => {
            this.actionSheetController.dismiss();
          },
        },
      ],
    });
    await actionSheet.present();
  }
  checkButton() {
    if (!this.favorito) {
      return {
        cssClass: "dark",
        text: "Favorite",
        icon: "heart",
        handler: () => {
          this.dataLocalService.guardarNoticia(this.article);
          this.presentToast("Se ha guardado la noticia en Favoritos");
        },
      };
    } else {
      return {
        cssClass: "dark",
        text: "Eliminar",
        icon: "trash",
        handler: () => {
          this.dataLocalService.borrarFavoritos(this.article);
          this.presentToast("Se ha eliminado la noticia de Favoritos");
        },
      };
    }
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      position: "middle",
      color: "primary",
      message: msg,
      duration: 2000,
    });
    toast.present();
  }
}
