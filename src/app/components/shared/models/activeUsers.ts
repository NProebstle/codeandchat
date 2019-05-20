export class ActiveUsers {
    private static _activeUsers: any[];

    //activeUsers
    public static get activeUsers(): any[] {
        return this._activeUsers;
    }
    
    public static set activeUsers(value: any[]) {
            this._activeUsers = value;
    }
}