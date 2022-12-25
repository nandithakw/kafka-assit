import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[actionHost]',
})
export class ActionDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}