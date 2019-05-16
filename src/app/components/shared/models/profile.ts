export class Profile {
    private static _nickname = '';
    private static _color = '#00802F';
    private static _img = '../../../assets/profile.png';
    private static _uid = '';

    //Nickname
    public static get Nickname(): string {
        return this._nickname;
    }

    public static set Nickname(value: string) {
        this._nickname = value;
    }

    //Color
    public static get Color(): string {
        return this._color;
    }

    public static set Color(value: string) {
        this._color = value;
    }

    //IMG
    public static get IMG(): string {
        return this._img;
    }

    public static set IMG(value: string) {
        this._img = value;
    }

    //UID
    public static get UID(): string {
        return this._uid;
    }

    public static set UID(value: string) {
        this._uid = value;
    }

}