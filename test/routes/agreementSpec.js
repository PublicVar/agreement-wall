let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Agreement Routes', () => {
    describe('/POST agreement/sign-in', () => {

        it('should return 400', (done) => {
            let people = {
            firstname: 'fdqsfdq',
            lastname: '',
            email: 'fdsqfd@mail.com',
            job: 'fdq',
            organization: 'fds',
        };

        chai.request(app)
            .post('/agree/sign-in')
            .send(people)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
        })   
    })
})