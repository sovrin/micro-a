import {Alias, Command, Parser, Flag, Parsed, Factory} from "./types/Parser";

const DELIMITER = '-';
const NOT_WITH_DELIMITER = `^(?!${DELIMITER}).`;

/**
 *
 * @param args
 * @param truncate
 */
const factory: Factory = (args, truncate = true): Parser => {
    const parsed: Parsed = {};
    const aliases: Alias = {};

    // clone args
    args = [...args];

    if (truncate) {
        // remove caller and entryPoint
        args.splice(0, 2);
    }

    /**
     *
     * @param key
     * @param value
     */
    const set = (key: string, value: any) => {
        key = aliases[key] || key;

        if (parsed[key]) {
            if (value === false || value === true) {
                // do nothing
            } else if (Array.isArray(parsed[key])) {
                parsed[key].push(value)
            } else {
                parsed[key] = [parsed[key], value];
            }
        } else {
            parsed[key] = value;
        }
    };

    /**
     *
     * @param prefix
     * @param name
     * @param fallback
     */
    const extract = (prefix: string, name, fallback: number | string | boolean = false) => {
        let key;
        let index;

        if (name instanceof RegExp) {
            const first = args.slice(0, 1);
            const regExp = new RegExp(NOT_WITH_DELIMITER + name.source);
            const match = first.pop().match(regExp);

            if (!match) {
                return context;
            }

            args.splice(0, 1);

            const [value] = match;
            name = value;
        } else {
            key = prefix + name;
            index = args.indexOf(key);
        }

        // no flag found
        if (index === -1) {
            set(name, fallback);

            return context;
        }

        const indexes = args
            .map((_, i) => i)
            .filter((i) => i > (index))
            .filter((i) => args
                .slice(index + 1, i + 1)
                .every(arg => arg[0] !== DELIMITER),
            )
        ;

        // flag found
        if (indexes.length === 0) {
            set(name, true);

            return context;
        }

        const next = indexes.shift();
        const extracted = args.splice(next - 1, indexes.length + 2);
        extracted.shift();

        let value;

        if (extracted.length === 1) {
            value = extracted.shift();
        }

        if (extracted.length > 1) {
            value = extracted;
        }

        set(name, value);

        // recursive extract
        if (args.indexOf(key) !== -1) {
            extract(prefix, name);
        }
    };

    /**
     *
     * @param name
     * @param fallback
     */
    const command: Command = (name, fallback = null) => {
        extract('', name, fallback);

        return context();
    };

    /**
     *
     * @param flag
     * @param alias
     * @param fallback
     */
    const flag: Flag = (flag, alias, fallback = false) => {
        aliases[flag] = alias;

        extract(DELIMITER + DELIMITER, flag);
        extract(DELIMITER, flag, fallback);

        return context();
    };

    /**
     *
     */
    const get = () => (
        parsed
    );

    /**
     *
     */
    const context = (): Parser => ({
        flag,
        command,
        get
    }
)
    return context();
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 18.03.2019
 * Time: 23:09
 */
export default factory;