// @Injectable()
// export class FilePreviewOverlayService {

//   ...

//   private getOverlayConfig(config: FilePreviewDialogConfig): OverlayConfig {
//     const positionStrategy = this.overlay.position()
//       .global()
//       .centerHorizontally()
//       .centerVertically();

//     const overlayConfig = new OverlayConfig({
//       hasBackdrop: config.hasBackdrop,
//       backdropClass: config.backdropClass,
//       panelClass: config.panelClass,
//       scrollStrategy: this.overlay.scrollStrategies.block(),
//       positionStrategy
//     });

//     return overlayConfig;
//   }
// }