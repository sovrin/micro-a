import parser from "../src/parser";
import {expect} from "chai";

describe('micro-a', () => {

    describe('no arg', () => {
        const args = parser(['node.exe', 'index.js'])
            .get()
        ;

        it('should be empty', () => {
            expect(args).to.deep.equal({});
        });
    });

    describe('test source input', () => {
        const input = ['node.exe', 'index.js', 'foo', '-a'];

        parser(input)
            .command('foo')
            .flag('a')
            .get()
        ;

        it('should be equal after parsing', () => {
            expect(input).to.deep.equal(input);
        });
    });

    describe('test truncate option', () => {
        const input = ['foo', '-a'];

        parser(input, false)
            .command('foo')
            .flag('a')
            .get()
        ;

        it('should be equal after parsing', () => {
            expect(input).to.deep.equal(input);
        });
    });

    describe('get functions', () => {
        const input = ['node.exe', 'index.js', 'foo', 'a'];

        const p = parser(input)
            .flag('a')
            .command('foo')
        ;

        it('should return parser context', () => {
            expect(p).to.deep.equal(p.flag('test'));
        });
    });


    describe('action arg without declaration', () => {
        const args = parser(['node.exe', 'index.js', 'install'])
            .get()
        ;

        it('should be empty', () => {
            expect(args).to.deep.equal({});
        });
    });

    describe('action arg', () => {
        const args = parser(['node.exe', 'index.js', 'install'])
            .command('install')
            .get()
        ;

        it('should be object with install:true', () => {
            expect(args).to.deep.equal({install: true});
        });
    });

    describe('command arg with value', () => {
        const args = parser(['node.exe', 'index.js', 'install', 'foo'])
            .command('install')
            .get()
        ;

        it('should be object with install:"foo"', () => {
            expect(args).to.deep.equal({install: 'foo'});
        });
    });

    describe('command arg with several values', () => {
        const args = parser(['node.exe', 'index.js', 'install', 'foo', 'bar', '-a'])
            .command('install')
            .get()
        ;

        it('should be object with install:["foo", "bar"]', () => {
            expect(args).to.deep.equal({install: ['foo', 'bar']});
        });
    });

    describe('command arg with several values and default val', () => {
        const args = parser(['node.exe', 'index.js', 'foobar', 'foo', 'bar', '-a'])
            .command('install', 'noinstall')
            .get()
        ;

        it('should be object with install:["foo", "bar"]', () => {
            expect(args).to.deep.equal({install: 'noinstall'});
        });
    });

    describe('command with 2 consecutive arguments and one single flag', () => {
        const args = parser(['node.exe', 'index.js', 'install', 'foo', 'bar', '-a'])
            .command('install')
            .flag('a')
            .get()
        ;

        it('should be object with install: ["foo", "bar"], a: true', () => {
            expect(args).to.deep.equal({install: ['foo', 'bar'], 'a': true});
        });
    });

    describe('command with 2 consecutive arguments with available flag and missing second flag', () => {
        const args = parser(['node.exe', 'index.js', 'install', 'foo', 'bar', '-a'])
            .command('install')
            .flag('a')
            .flag('b')
            .get()
        ;

        it('should be object with install: ["foo", "bar"], a: true, b: false', () => {
            expect(args).to.deep.equal({install: ['foo', 'bar'], 'a': true, 'b': false});
        });
    });

    describe('one flag with 3 parameters and one obsolete flag', () => {
        const args = parser(['node.exe', 'index.js', '-a', 'foo', 'baz', 'bar', '-b', ' foo'])
            .flag('a')
            .get()
        ;

        it('should be object with "a": ["foo", "baz", "bar"', () => {
            expect(args).to.deep.equal({'a': ['foo', 'baz', 'bar']});
        });
    });

    describe('multiple flags throughout the array', () => {
        const args = parser(['node.exe', 'index.js', '-e', '123321', '-f', 'foo', '-c', '999', '-f', 'bar', '-b', 'y', '-f', 'baz'])
            .flag('f')
            .get()
        ;

        it('should be object with "f": ["foo", "bar", "baz"', () => {
            expect(args).to.deep.equal({'f': ['foo', 'bar', 'baz']});
        });
    });

    describe('with flag name', () => {
        const args = parser(['node.exe', 'index.js', '-e', '123321', '-f', 'foo', '-c', '999', '-f', 'bar', '-b', 'y', '-f', 'baz'])
            .flag('f', 'file')
            .get()
        ;

        it('should be object with "f": ["foo", "bar", "baz"', () => {
            expect(args).to.deep.equal({'file': ['foo', 'bar', 'baz']});
        });
    });

    describe('several flags', () => {
        const args = parser(['node.exe', 'index.js', '-f', 'a', 'b', 'c', '-f', 'd'])
            .flag('f', 'file')
            .get()
        ;

        it('should be object with "f": ["a", "b", "c", "d"', () => {
            expect(args).to.deep.equal({'file': ['a', 'b', 'c', 'd']});
        });
    });

    describe('several flags and noise', () => {
        const args = parser(['node.exe', 'index.js', '-a', '-b', '-c', '-d'])
            .flag('a')
            .flag('b')
            .flag('c')
            .get()
        ;

        it('should be object with "a":true, "b":true, "c":true', () => {
            expect(args).to.deep.equal({a: true, b: true, c: true});
        });
    });

    describe('several flags, different order', () => {
        const args = parser(['node.exe', 'index.js', '-c', '-b', '-u', '-a'])
            .flag('a')
            .flag('b')
            .flag('c')
            .get()
        ;

        it('should be object with "a":true, "b":true, "c":true', () => {
            expect(args).to.deep.equal({a: true, b: true, c: true});
        });
    });

    describe('several flags, different order#2', () => {
        const args = parser(['node.exe', 'index.js', '-c', '-b', '-u', '-a'])
            .flag('u')
            .flag('a')
            .flag('z')
            .get()
        ;

        it('should be object with "a":true, "b":true, "c":true', () => {
            expect(args).to.deep.equal({u: true, a: true, z: false});
        });
    });

    describe('several flags, use default value', () => {
        const args = parser(['node.exe', 'index.js', '-c', '-b', '-u', '-a'])
            .flag('u')
            .flag('a')
            .flag('z', 'zoosh', 'defaultVal')
            .get()
        ;

        it('should be object with "a":true, "b":true, "c":true', () => {
            expect(args).to.deep.equal({u: true, a: true, zoosh: 'defaultVal'});
        });
    });

    describe('wrong flag usage', () => {
        const args = parser(['node.exe', 'index.js', '-a', 'foo', '-a'])
            .flag('a')
            .get()
        ;

        it('should be singla a flag value', () => {
            expect(args).to.deep.equal({a: 'foo'});
        });
    });

    describe('wrong flag usage#2', () => {
        const args = parser(['node.exe', 'index.js', '-a', '-a', 'foo'])
            .flag('a')
            .get()
        ;

        it('should be true', () => {
            expect(args).to.deep.equal({a: true});
        });
    });

    describe('flag literal', () => {
        const args = parser(['node.exe', 'index.js', '-a', 'foo bar baz', '-b', 'honey badger'])
            .flag('a')
            .flag('b')
            .get()
        ;

        it('should be whole string', () => {
            expect(args).to.deep.equal({a: 'foo bar baz', b: 'honey badger'});
        });
    });

    describe('flag literal with flag string', () => {
        const args = parser(['node.exe', 'index.js', '-d', 'a', 'b', 'c', '-a', 'foo bar -b',])
            .flag('d')
            .flag('a')
            .get()
        ;

        it('should be whole string', () => {
            expect(args).to.deep.equal({a: 'foo bar -b', d: ['a', 'b', 'c']});
        });
    });

    describe('command regexp', () => {
        const input = ['node.exe', 'index.js', 'foo', 'bar', '-c', '-a'];

        const args = parser(input)
            .command(/[a-z]+/)
            .flag('a')
            .flag('b')
            .flag('c')
            .get()
        ;

        it('should get dynamic variable name', () => {
            expect(args).to.deep.equal({foo: true, a: true, b: false, c: true});
        });
    });

    describe('command add several regexp', () => {
        const input = ['node.exe', 'index.js', 'foo', '123456789', '-c', '-a'];

        const args = parser(input)
            .command(/[a-z]+/)
            .command(/[0-9]+/)
            .flag('a')
            .get()
        ;

        it('should get both dynamic variable names', () => {
            expect(args).to.deep.equal({foo: true, 123456789: true, a: true});
        });
    });

    describe('command add irrelevant regexp', () => {
        const input = ['node.exe', 'index.js', '123456789', '-c', '-a'];

        const args = parser(input)
            .command(/[a-z]+/)
            .flag('a')
            .get()
        ;

        it('should get both dynamic variable names', () => {
            expect(args).to.deep.equal({a: true});
        });
    });
});

