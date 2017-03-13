let chai = require('chai');
let should = chai.should();
let expect = chai.expect;
let People = require('../../services/people');
let AssertionError = require('assert').AssertionError;



describe('People', () => {
    describe('#create', () => {

        it('should return a People', () => {
            let peopleFixtures = {
                firstname: 'aa',
                lastname: 'bb',
                email: 'fdsqfd@mail.com',
                job: 'cc',
                organization: 'dd',
            };
            let people = new People();
    
            let newPeople = people.importData(peopleFixtures);

            let expectedPeople = {
                firstname : "aa",
                lastname : "bb",
                email : "fdsqfd@mail.com",
                job : "cc",
                organization : "dd"
            };

            newPeople.should.be.deep.equal(expectedPeople)

        })

        it('should raise exception when firstname empty', () => {
            let peopleFixtures = {
                firstname: '',
                lastname: 'fqds',
                email: 'fdsqfd@mail.com',
                job: 'fdq',
                organization: 'fds',
            };

            expect(function(){
                let people = new People();
                people.importData(peopleFixtures);
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
                let people = new People();
                people.importData(peopleFixtures);
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
                let people = new People();
                people.importData(peopleFixtures);
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
                let people = new People();
                people.importData(peopleFixtures);
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
               let people = new People();
                people.importData(peopleFixtures);
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
                let people = new People();
                people.importData(peopleFixtures);
            }).to.throw(AssertionError,'Email not valid');
        });
    })
})