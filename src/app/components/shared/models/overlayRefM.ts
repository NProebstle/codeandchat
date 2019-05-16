export class OverlayRefM {
    private static _overlayRef: object;

    //userHistory
    public static get overlayRef(): object {
        return this._overlayRef;
    }

    public static set overlayRef(value: object) {
        this._overlayRef = value;
    }
}