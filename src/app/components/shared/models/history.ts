export class History {
    private static _chatHistory: any[];
    private static _push: any[];

    //chatHistory
    public static get chatHistory(): any[] {
        return this._chatHistory;
    }

    public static set chatHistory(value: any[]) {
        this._chatHistory = value;
    }

    //push
    public static get push(): any[] {
        return this._push;
    }

    public static set push(value: any[]) {
        this._push = value;
        if(this._push[0] === Array){
            var l = this._push.length;
            for(var i = 0; i < l; i++){
                this._chatHistory.push(this._push[i]);
            }
        } else {
            this._chatHistory.push(this._push);
        }
    }
}