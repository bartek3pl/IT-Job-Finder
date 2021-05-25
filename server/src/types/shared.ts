export type Token = string;

export type ClientRequest = Request & { headers: { accesstoken: Token } };
