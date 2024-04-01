import axios, { type AxiosInstance } from 'axios';

export default class Auth {

    private static readonly _version: string = '1.17.0';
    private static readonly _authProvider: string = 'STEAM';
    private static readonly _payload = {
        "alc": "en",
        "ap": this._authProvider,
        "dlc": "pt",
        "glc": "ko",
        "idt": Bun.env.BEARER,
        "la": 2,
        "mn": Bun.env.DEVICE,
        "prm": {
            "authorizationCode": Bun.env.BEARER
        },
        "ver": this._version
    }

    private static readonly _instance: AxiosInstance = axios.create({
        baseURL: 'https://bser-rest-release.bser.io/api',
        headers: {
            'User-Agent': 'Aya 1.0.0',
            'X-BSER-AuthProvider': this._authProvider,
            'X-BSER-Version': this._version,
        }
    })

    public static authenticate() {
        this._instance.post('/users/authenticate', this._payload)
            .then(r => console.log(r.data))
            .catch(e => console.error(e.response));
    }

    private static renewalSession() {
        this._instance.post('/external/renewalSession')
            .then(r => console.log(r.data))
            .catch(e => console.error(e.response));
    }
}