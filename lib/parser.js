const DELIMITER = '-';
const NOT_WITH_DELIMITER = `^(?!${DELIMITER}).`;

/**
 *
 * @param args
 * @param truncate
 * @returns {{flag: (function(*=, *=)), get: (function()), command: (function(*=))}}
 */
const factory = (args, truncate = true) => {
    const parsed = {};
    const aliases = {};

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
    const set = (key, value) => {
        key = aliases[key] || key;

        if (parsed[key]) {
            if (value === false || value === true) {
                // do nothing
            } else if (Array.isArray(parsed[key])) {
                if (Array.isArray(value)) {
                    parsed[key].push(...value)
                } else {
                    parsed[key].push(value)
                }
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
     * @param deflt
     * @returns {{flag: (function(*=, *=)), get: (function()), command: (function(*=))}}
     */
    const extract = (prefix = '', name, deflt = false) => {
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
            set(name, deflt);

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
        } else if (extracted.length > 1) {
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
     * @param deflt
     * @returns {{flag: (function(*, *=)), get: (function()), command: (function(*=))}}
     */
    const command = (name, deflt = false) => {
        extract('', name, deflt);

        return context;
    };

    /**
     *
     * @param flag
     * @param alias
     * @param deflt
     * @returns {{flag: (function(*=, *=)), get: (function()), command: (function(*=))}}
     */
    const flag = (flag, alias, deflt = false) => {
        aliases[flag] = alias;

        extract(DELIMITER + DELIMITER, flag);
        extract(DELIMITER, flag, deflt);

        return context;
    };

    /**
     *
     */
    const get = () => parsed;

    const context = {
        flag,
        command,
        get,
    };

    return context;
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 18.03.2019
 * Time: 23:09
 *
 * @type {function(*=): {flag: (function(*=, *, *=)), get: (function()), command: (function(*=, *=))}}
 */
module.exports = factory;
