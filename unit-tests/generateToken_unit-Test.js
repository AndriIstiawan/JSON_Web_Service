/* Dependencies */
const { generateToken } = require('../components/generator/generatorsService');

let chai = require('chai');
let expect = chai.expect;

//delete user
describe('generateToken test', () => {
    it('make token test', async function () {
        const token = await generateToken();
        expect(token).to.be.a('string')
    })
})
