export class InitApp {
    private static _initApp: boolean;

    //activeUsers
    public static get initApp(): boolean{
        return this._initApp;
    }
    
    public static set initApp(value: boolean) {
            this._initApp = value;
    }
}