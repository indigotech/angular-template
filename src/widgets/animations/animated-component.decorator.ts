import { trigger, state, style, transition, animate } from '@angular/animations';


let animationList = {
 fadeIn: [
   trigger('routeAnimation', [
     state('*', style({opacity: 1 })),
     transition('void => *', [
       style({ opacity: 0 }),
       animate('0.3s ease-in'),
     ]),
     transition('* => void',
       style({ opacity: 0 }),
     ),
   ]),
 ],
 pushRight:  [
    trigger('routeAnimation', [
      state('*', style({transform: 'translateX(0)', opacity: 1})),
      transition('void => *', [
        style({transform: 'translateX(-100%)', opacity: 0}),
        animate('0.5s cubic-bezier(0.215, 0.610, 0.355, 1.000)'),
      ]),
      transition('* => void',
        animate('0.5s cubic-bezier(0.215, 0.610, 0.355, 1.000)', style({
          transform: 'translateX(-100%)',
          opacity: 0,
        })),
      ),
    ]),
  ],
};

const NG_ANNOTATION = '__annotations__';

export function AnimatedComponent(animationName: string = 'fadeIn') {
  return function (target: Function) {
    let annotations = Object.getOwnPropertyDescriptor(target, NG_ANNOTATION).value;

    if (annotations[0].styles == null) {
      annotations[0].styles = [];
    }
    annotations[0].styles.push(':host { display: block; }');

    if (annotations[0].animations == null) {
      annotations[0].animations = [];
    }

    annotations[0].animations.push(...animationList[animationName] );

    if (annotations[0].host == null) {
      annotations[0].host = {};
    }
    annotations[0].host['[@routeAnimation]'] = 'true';

    Object.defineProperty(target, NG_ANNOTATION, annotations);
  };
}
