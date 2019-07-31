import { trigger, state, style, transition, animate } from '@angular/core';

export const AnimationFadeIn = trigger('fadeIn', [
  state('*', style({ opacity: 1 })),
  transition('void => *', [
    style({ opacity: 0.3 }),
    animate('0.3s ease-in'),
  ]),
]);

export const AnimationFadeInOut = trigger('fadeInOut', [
  state('*', style({ opacity: 1 })),
  transition('void => *', [
    style({ opacity: 0 }),
    animate('0.3s ease-in'),
  ]),
  transition('* => void',
    animate('0.3s ease-out', style({ opacity: 0 })),
  ),
]);

export const AnimationPushUp = trigger('pushUp', [
  state('*', style({ opacity: 1, transform: 'translateY(0)' })),
  transition('void => *', [
    style({ opacity: 0, transform: 'translateY(15%)' }),
    animate('0.3s cubic-bezier(0.0, 0.0, 0.2, 1)'),
  ]),
]);

export const AnimationPushUpDown = trigger('pushUpDown', [
  state('*', style({ opacity: 1, transform: 'translateY(0)' })),
  transition('void => *', [
    style({ opacity: 0, transform: 'translateY(-20%)' }),
    animate('0.3s ease-in'),
  ]),
  transition('* => void',
    animate('0.3s ease-out', style({ opacity: 0, transform: 'translateY(-20%)' })),
  ),
]);

export const AnimationScaleUp = trigger('scaleUp', [
  state('*', style({ opacity: 1, height: '*' })),
  transition('void => *', [
    style({ opacity: 0, height: 0 }),
    animate('0.3s ease-in'),
  ]),
  transition('* => void',
    animate('0.3s ease-out', style({ opacity: 0, height: 0 })),
  ),
]);
