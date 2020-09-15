export type Factory = (args: Array<string>, truncate: boolean) => Parser;

export type Parsed = {
    [key in string]: Array<string>;
};

export type Alias = {
    [key in string]: string;
}

export type Flag = (flag: string, alias: string, fallback: boolean) => Parser;

export type Command = (name: string, fallback: number | string) => Parser

export type Get = () => Parsed;

export type Parser = {
    command: Command,
    flag: Flag,
    get: Get,
}