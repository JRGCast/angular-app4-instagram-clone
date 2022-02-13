import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ImageModel } from './image.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  animations: [trigger('banner', [ // em animações, o trigger é o ativador, o primeiro parâmetro será o nome do trigger, deve ser uma string. O segundo parâmetro são as definições da animação.
    state('hidden', style({ opacity: 0 })), // aqui utilizamos o state e o style. O state recebe 2 parâmetros: o seu nome e o estilo CSS que deverá ser aplicado quando ele for chamado, e aqui utilize a notação igual ao REACT (camelCase)
    state('shown', style({ opacity: 1 })),
    transition('hidden => shown', animate('1s ease-in-out')),
    transition('shown => hidden', animate('1s ease-in-out'))
  ]),]
})
export class BannerComponent implements OnInit {

  public allImages: Array<ImageModel> = [
    { state: "shown", url: "../../../assets/banner-acesso/img_1.png" },
    { state: "hidden", url: "../../../assets/banner-acesso/img_2.png" },
    { state: "hidden", url: "../../../assets/banner-acesso/img_3.png" },
    { state: "hidden", url: "../../../assets/banner-acesso/img_4.png" },
    { state: "hidden", url: "../../../assets/banner-acesso/img_5.png" },
  ]
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => { this.loopImages() }, 2500)
  }

  public loopImages(): void {
    let nextImgIndex: number = 0;

    for (let i = 0; i <= 4; i++) {
      if (this.allImages[i].state === "shown") {
        this.allImages[i].state = "hidden"
        nextImgIndex = i === 4 ? 0 : i + 1
        console.log('image passed')
        break
      }
    }
    this.allImages[nextImgIndex].state = "shown"
    setTimeout(() => { this.loopImages() }, 2500)
  }
}
