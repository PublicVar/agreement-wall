let chai = require('chai');
let should = chai.should();
let expect = chai.expect;
let People = require('../../services/people');
let AssertionError = require('assert').AssertionError;

describe('People', () => {
    describe('#create', () => {
        it('should raise exception when firstname empty', () => {
            let peopleFixtures = {
                firstname: '',
                lastname: 'fqds',
                email: 'fdsqfd@mail.com',
                job: 'fdq',
                organization: 'fds',
            };

            expect(function(){
                People.create(peopleFixtures)
            }).to.throw(AssertionError,"AssertionError: '' == true");
        });

        it('should raise exception when lastname empty', () => {
            let peopleFixtures = {
                firstname: 'fdqsfdq',
                lastname: '',
                email: 'fdsqfd@mail.com',
                job: 'fdq',
                organization: 'fds',
            };

            expect(function(){
                People.create(peopleFixtures)
            }).to.throw(AssertionError,"AssertionError: '' == true");
        });

        it('should raise exception when email empty', () => {
            let peopleFixtures = {
                firstname: 'fdqsfdq',
                lastname: 'fds',
                email: '',
                job: 'fdq',
                organization: 'fds',
            };

            expect(function(){
                People.create(peopleFixtures)
            }).to.throw(AssertionError,"AssertionError: '' == true");
        });

        it('should raise exception when job empty', () => {
            let peopleFixtures = {
                firstname: 'fdqsfdq',
                lastname: 'fds',
                email: 'fdsqfd@mail.com',
                job: '',
                organization: 'fds',
            };

            expect(function(){
                People.create(peopleFixtures)
            }).to.throw(AssertionError,"AssertionError: '' == true");
        });

        it('should raise exception when organization empty', () => {
            let peopleFixtures = {
                firstname: 'fdqsfdq',
                lastname: 'fds',
                email: 'fdsqfd@mail.com',
                job: 'fds',
                organization: '',
            };

            expect(function(){
                People.create(peopleFixtures)
            }).to.throw(AssertionError,"AssertionError: '' == true");
        });

        it('should raise exception when email is not an email', () => {
            let peopleFixtures = {
                firstname: 'fdqsfdq',
                lastname: 'fds',
                email: 'fdsqfdmail.com',
                job: 'fds',
                organization: 'fdsqf',
            };

            expect(function(){
                People.create(peopleFixtures)
            }).to.throw(AssertionError,'Email not valid');
        });
    })
})