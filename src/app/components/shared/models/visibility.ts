export class Visibility {
    private static _showProfile: boolean;
    private static _showOnline: boolean;

    //Profile (lg)
    public static get showProfile(): boolean {
        return this._showProfile;
    }

    public static set showProfile(value: boolean) {
        this._showProfile = value;
    }

    //Online (lg)
    public static get showOnline(): boolean {
        return this._showOnline;
    }

    public static set showOnline(value: boolean) {
        this._showOnline = value;
    }
}