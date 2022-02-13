import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.scss'],
  animations: [
    // banner animation
    trigger('banner-animation', [
      state('created', style({ opacity: 1 })),
      transition('void => created', [ // void é um estado já existente em angular animation, é o estado do componente no momento em que ainda não está criado na árvore DOM, ou seja, é realmente o estado inicial do componente
        style({ opacity: 0, transform: 'translate(-50px, 0)' }), // o transform: translate serve para dar essa ideia de movimento durante a animação, translate(eixo X, eixo Y)
        animate('500ms 0s ease-in-out') // duração, delay e animação
      ])
    ]),
    // login animation
    trigger('login-animation', [
      state('created', style({ opacity: 1 })),
      transition('void => created', [
        style({ opacity: 0, transform: 'translate(80px, 0)' }),
        animate('2s 0s ease-in-out', keyframes([
          style({ transform: 'translate(80px, 20px)', opacity: 1, offset: 0 }),
          style({ transform: 'translate(-80px, 40px)', opacity: 0, offset: 0.3 }),
          style({ transform: 'translate(100px, 60px)', opacity: 1, offset: 0.6 }),
          style({ transform: 'translate(-50px, 400px)', opacity: 0, offset: 0.8 }),
          style({ transform: 'translate(0, 0)', opacity: 1, offset: 1 })
        ])) // duração, delay e animação
      ])
    ])]
})
export class AccessComponent implements OnInit {

  public createdState: string = "created"
  public showRegisterComponent: boolean = false

  constructor() { }

  ngOnInit(): void {
  }
  toggleShowComponent(event: string): void {
    if (event === "showRegisterPanel") {
      this.showRegisterComponent = true
    } else {
      this.showRegisterComponent = false
    }
    console.log(event, this.showRegisterComponent)
  }

  animationStart(): void {
  console.log('Animation started')
  }

  animationEnd(): void {
    console.log('Animation ended')
  }
}
