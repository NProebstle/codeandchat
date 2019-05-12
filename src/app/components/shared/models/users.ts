export class Users {
    private static _userHistory: any[];

    //userHistory
    public static get userHistory(): any[] {
        return this._userHistory;
    }

    public static set initUserHistory(value: any[]) {
        this._userHistory = value;
    }
    
    public static set userHistory(value: any[]) {
        this._userHistory.push(value);
    }
}