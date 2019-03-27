const parser = require('../lib/parser');
const {expect} = require('chai');

describe('micro-a', () => {

    // describe('no arg', () => {
    //     const args = parser(['node.exe', 'index.js'])
    //         .get()
    //     ;
    //
    //     it('should be empty', () => {
    //         expect(args).to.deep.equal({});
    //     });
    // });
    //
    // describe('action arg without declaration', () => {
    //     const args = parser(['node.exe', 'index.js', 'install'])
    //         .get()
    //     ;
    //
    //     it('should be empty', () => {
    //         expect(args).to.deep.equal({});
    //     });
    // });
    //
    // describe('action arg', () => {
    //     const args = parser(['node.exe', 'index.js', 'install'])
    //         .command('install')
    //         .get()
    //     ;
    //
    //     it('should be object with install:true', () => {
    //         expect(args).to.deep.equal({install: true});
    //     });
    // });
    //
    // describe('command arg with value', () => {
    //     const args = parser(['node.exe', 'index.js', 'install', 'foo'])
    //         .command('install')
    //         .get()
    //     ;
    //
    //     it('should be object with install:"foo"', () => {
    //         expect(args).to.deep.equal({install: "foo"});
    //     });
    // });
    //
    // describe('command arg with several values', () => {
    //     const args = parser(['node.exe', 'index.js', 'install', 'foo', 'bar', '-a'])
    //         .command('install')
    //         .get()
    //     ;
    //
    //     it('should be object with install:["foo", "bar"]', () => {
    //         expect(args).to.deep.equal({install: ['foo', 'bar']});
    //     });
    // });
    //
    // describe('command with 2 consecutive arguments and one single flag', () => {
    //     const args = parser(['node.exe', 'index.js', 'install', 'foo', 'bar', '-a' ])
    //         .command('install')
    //         .flag('a')
    //         .get()
    //     ;
    //
    //     it('should be object with install: ["foo", "bar"], a: true', () => {
    //         expect(args).to.deep.equal({install: ['foo', 'bar'], 'a': true});
    //     });
    // });
    //
    // describe('command with 2 consecutive arguments with available flag and missing second flag', () => {
    //     const args = parser(['node.exe', 'index.js', 'install', 'foo', 'bar', '-a' ])
    //         .command('install')
    //         .flag('a')
    //         .flag('b')
    //         .get()
    //     ;
    //
    //     it('should be object with install: ["foo", "bar"], a: true, b: false', () => {
    //         expect(args).to.deep.equal({install: ['foo', 'bar'], 'a': true, 'b': false});
    //     });
    // });
    //
    // describe('one flag with 3 parameters and one obsolete flag', () => {
    //     const args = parser(['node.exe', 'index.js', '-a', 'foo', 'baz', 'bar', '-b' ,' foo'])
    //         .flag('a')
    //         .get()
    //     ;
    //
    //     it('should be object with "a": ["foo", "baz", "bar"', () => {
    //         expect(args).to.deep.equal({'a': ['foo', 'baz', 'bar']});
    //     });
    // });

    describe('', () => {
        const args = parser(['node.exe', 'index.js', '-e', '123321', '-f', 'foo', '-c' ,'999', '-f', 'bar', '-b' ,'y', '-f', 'baz'])
            .flag('f')
            .get()
        ;

        it('should be object with "a": ["foo", "baz", "bar"', () => {
            expect(args).to.deep.equal({'a': ['foo', 'baz', 'bar']});
        });
    });
});

