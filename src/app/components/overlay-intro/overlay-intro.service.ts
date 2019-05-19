import { Injectable, Inject } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { OverlayIntroComponent } from './overlay-intro.component';
import { OverlayRefRemote } from '../../overlayRefRemote';

interface InitOverlayConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
}

const DEFAULT_CONFIG: InitOverlayConfig = {
  hasBackdrop: true,
  backdropClass: 'dark-backdrop',
  panelClass: 'intro-overlay-panel'
}

@Injectable()
export class OverlayIntroService {

  constructor(
    private overlay: Overlay) { }

  open(config: InitOverlayConfig = {}) {
    // Override default configuration
    const dialogConfig = { ...DEFAULT_CONFIG, ...config };

    // Returns an OverlayRef which is a PortalHost
    const overlayRef = this.createOverlay(dialogConfig);
    const dialogRef = new OverlayRefRemote(overlayRef);

    // Create ComponentPortal that can be attached to a PortalHost
    const IntroPortal = new ComponentPortal(OverlayIntroComponent);

    // Attach ComponentPortal to PortalHost
    overlayRef.attach(IntroPortal);

    return dialogRef;
  }

  private createOverlay(config: InitOverlayConfig) {
    const overlayConfig = this.getOverlayConfig(config);
    return this.overlay.create(overlayConfig);
  }

  private getOverlayConfig(config: InitOverlayConfig): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();
    
    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });

    return overlayConfig;
  }
}