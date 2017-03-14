let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../app');
let should = chai.should();
let cheerio = require('cheerio');
const shortid = require('shortid');
chai.use(chaiHttp);//make http request while testing
const agent = chai.request.agent(app); //make http request an keep session

describe('Agreement Routes', () => {
    describe('/POST agreement/sign-in', () => {
        let csrf = "";

        it('should return 400', (done) => {
            //First we need to get the csrf by going to the path "/"
            agent.get('/')
                .end((err, res) => {
                    csrf = extractCsrfToken(res);
                    let people = {
                        firstname: 'fdqsfdq',
                        lastname: '',
                        email: 'ernest.debogue@yopmail.com',
                        job: 'fdq',
                        organization: 'fds',
                        _csrf: csrf
                    };
                    //the real tested request
                    agent.post('/agree/sign-in')
                        .send(people)
                        .end((err, res) => {
                            res.should.have.status(400);
                            done();
                        });
                });
        });

        it('should return 200', (done) => {
            agent.get('/')
                .end((err, res) => {

                    csrf = extractCsrfToken(res);
                    let people = {
                        firstname: 'fdqsfdq',
                        lastname: 'dfqs',
                        email: shortid.generate()+'@yopmail.com',
                        job: 'fdq',
                        organization: 'fds',
                        _csrf: csrf
                    };
                    //the real tested request
                    agent.post('/agree/sign-in')
                        .send(people)
                        .end((err, res) => {
                            res.should.have.status(200);
                            done();
                        });
                });
        })
    });
    describe('/POST agreement/opt-in', () => {
        
    });
});
/**
 * Extract _csrf from html response
 */
function extractCsrfToken(res) {
    var $ = cheerio.load(res.text);
    return $('[name=_csrf]').val();
}