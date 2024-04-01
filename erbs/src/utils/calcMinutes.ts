import moment from 'moment-timezone';

export default class calcMinutes {

    private static readonly _minutes: number = 60;
    private static readonly _timezone: string = 'America/Sao_Paulo';

    private static now(): number {
        const date = new Date();
        return new Date(date.toLocaleString('en-US', { timeZone: this._timezone })).getTime();
    }

    private static startDtm(start: string): number {
        return new Date(this.convertTimezone(start)).getTime();
    }

    private static convertTimezone(time: string): string {
        return moment(time).tz(this._timezone).format('YYYY-MM-DD HH:mm:ss');
    }

    public static diff(start: string): boolean {
        const diffMs: number = this.now() - this.startDtm(start);
        const diffMinutes: number = diffMs / (1000 * 60);
        return diffMinutes > this._minutes ? true : false;
    }
}
