export type Factory = (args: Array<string>, truncate?: boolean) => Parser;

export type Parsed = Record<string, Array<string>>;

export type Alias = Record<string, string>;

export type Flag = (flag: string, alias?: string, fallback?: string | number | boolean) => Parser;

export type Command = (name: string | RegExp, fallback?: number | string) => Parser

export type Get = () => Parsed;

export type Parser = {
    command: Command,
    flag: Flag,
    get: Get,
}