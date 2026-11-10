import { getReasonPhrase } from "http-status-codes";

export default class ApiRequest {
    public static readonly BASE = "http://localhost:8080/api";

    private endpoint : string
    private method = "GET"
    private body? : string

    public constructor(endpoint : string) {
        this.endpoint = ApiRequest.BASE + endpoint;
    }

    public withParameter(name : string, val : any) : ApiRequest {
        if (this.endpoint.endsWith("&")) {
            this.endpoint += name + "=" + encodeURIComponent(val) + "&";
        }else {
            this.endpoint += "?" + name + "=" + encodeURIComponent(val) + "&";
        }

        return this;
    }

    public withMethod(method : string) : ApiRequest {
        this.method = method;
        return this;
    }

    public withBody(body : string) : ApiRequest {
        this.body = body;
        return this;
    }

    public async execute(token : string) : Promise<any> {
        this.endpoint = this.endpoint.substring(0, this.endpoint.length);
        const res = await fetch(
            this.endpoint, {
                method: this.method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: this.body
            }
        )

        if (!res.ok) {
            const apiMsg = await res.json() as Error
            const msg = getReasonPhrase(res.status) + " (" + res.status + "): " + apiMsg.message;
            console.error("API request to '" + this.endpoint + "' returned error response: " + msg);
            throw new Error(msg);
        }

        return res
    }
}
