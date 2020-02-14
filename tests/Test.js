/* Dependencies */
let chai = require("chai"),
    chaiHttp = require("chai-http"),
    app = require("../index"),
    expect = chai.expect;

const nock = require('nock');

chai.use(chaiHttp);

describe('app', () => {
    context('GET /', () => {
        it('should get /', (done) => {
            chai.request(app)
                .get('/')
                .end((_error, res) => {
                    expect(res.statusCode).to.equal(200);
                    done();
                });
        })
    })

    context('GET /person', () => {
        it('should get /api/person', (done) => {
            chai.request(app)
                .get('/api/person')
                .end((_error, res) => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('object');
                    done();
                });
        })
    })

    context('GET /person Failed', () => {
        beforeEach((done) => {
            nock('https://randomuser.me')
                .get('/api/')
                .replyWithError({
                    message: 'something awful happened',
                    code: 'AWFUL_ERROR',
                })
            done();
        });
        it('should get /api/person error', (done) => {
            chai.request(app)
                .get('/api/person')
                .end((_error, res) => {
                    expect(res.statusCode).to.equal(500);
                    done();
                });
        })
    })
})
