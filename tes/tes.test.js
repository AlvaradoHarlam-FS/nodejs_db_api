const  { connect, findWriter, postWriter, disconnect } = require('./tes');
const Writer = require('../api/models/writer');

jest.mock("./tes");
describe('DB Functions', () => {
    beforeAll(() => {
        connect();
    })
    test('As a user I wan to post a movie to the database', async () => {
        const newWriter = new Writer({
            title: 'WAR II',
            actor: 'Juan',
        });
        const writer = await postWriter(newWriter);
        expect(writer.title).to.equal('WAR II');
        expect(writer.actor).to.equal('Juan');
    });
    test('As a user I wan to find a movie', async () => {
        const writer = await findWriter({ title: 'WAR II', actor: 'Juan' });
        expect(writer[0].title).to.equal('WAR II');
        expect(writer[0].actor).to.equal('Juan');
    });

    afterAll(() => disconnect());

});
