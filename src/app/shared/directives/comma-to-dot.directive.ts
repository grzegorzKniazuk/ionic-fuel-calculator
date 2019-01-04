import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
	selector: '[appCommaToDot]',
})
export class CommaToDotDirective {

	constructor(private elementRef: ElementRef) {
	}

	@HostListener('input')
	private watchInputValue(): void {
		this.elementRef.nativeElement.value = this.elementRef.nativeElement.value.replace(/,/g, '.');
	}
}
