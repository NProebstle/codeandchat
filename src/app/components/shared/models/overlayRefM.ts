import { OverlayRef } from '@angular/cdk/overlay';
import { OverlayRefRemote } from 'src/app/overlayRefRemote';

export class OverlayRefM {
    private static _overlayRef: OverlayRefRemote;

    //ovlRef
    public static get overlayRef(): OverlayRefRemote {
        return this._overlayRef;
    }

    public static set overlayRef(value: OverlayRefRemote) {
        this._overlayRef = value;
    }
}