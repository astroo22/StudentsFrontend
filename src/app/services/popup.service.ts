// export type PopupRect = {
//   top?: number,
//   left?: number,
//   ...
// }

// export type PopupData = {
//   readonly tr: TemplateRef<any>,
//   readonly rect: PopupRect
// }

// @Injectable()
// export class PopupService {
//   private readonly _popups: PopupData[] = [];

//   set(tr: TemplateRef<any>, rect: PopupRect, overlay: boolean|undefined){
//     this.initializeHost();

//     this._popups.push({tr, rect, overlay});
//     this._hostComponent?.update(this._popups);
//   }

//   remove(tr: TemplateRef<any>){
//     const i = this._popups.findIndex(p=>p.tr === tr);
//     if(i>=0){
//       this._popups.splice(i, 1);
//     }
//     this._hostComponent?.update(this._popups);
//   }  
// }