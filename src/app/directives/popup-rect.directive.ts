// import { Directive, Input, OnChanges, OnDestroy, SimpleChanges, TemplateRef } from '@angular/core';

// @Directive({
//   selector: '[appPopupRect]'
// })
// export class PopupRectDirective implements OnDestroy, OnChanges {

//   constructor(private readonly _popupService: PopupService, private _tr: TemplateRef<any>) {   
//   }
//   private readonly _rect: PopupRect = {};

//   @Input("libPopupRect")
//   visible: boolean = false;

//   @Input("libPopupRectTop")
//   top: number | undefined;

//   @Input("libPopupRectLeft")
//   left: number | undefined;

//   @Input("libPopupRectBottom")
//   bottom: number | undefined;

//   @Input("libPopupRectRight")
//   right: number | undefined;

//   @Input("libPopupRectHeight")
//   height: number | undefined;

//   @Input("libPopupRectWidth")
//   width: number | undefined;

//   @Input("libPopupRectOverlay")
//   overlay: boolean | undefined;

//   ngOnChanges(changes: SimpleChanges): void {
//     this._rect.top = this.top;
//     this._rect.left = this.left;
//     this._rect.bottom = this.bottom;
//     this._rect.right = this.right;
//     this._rect.height = this.height;
//     this._rect.width = this.width;

//     if(changes["visible"].previousValue === true && changes["visible"].currentValue=== false){
//       this._popupService.remove(this._tr);  
//     }

//     if(this.visible){
//       this._popupService.set(this._tr, this._rect, this.overlay);
//     }
//   }

//   ngOnDestroy(): void {    
//     if(this.visible){
//        this._popupService.remove(this._tr);
//     }
//   }
// }

