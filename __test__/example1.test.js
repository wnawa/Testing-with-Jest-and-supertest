const request = require('supertest');
//1-We use “describe ”function to describe the unit test. 
//it is like a suit which groups together a set of individual tests related to it.
//it will help identify tests in test results
describe('api tests: regres api', () => {

    let baseUrl = 'https://reqres.in';
    //2-In it/test function, we write the actual test code. Tell what the test performs in the first argument, 
    //and then in the second argument, write a callback function that contains the test code.
    test('should return all users', async () => {
        //3-In the callback function, the request is sent to the endpoint first, 
        const res = await request(baseUrl)
            .get('/api/users')

        //and the expected and actual responses are then compared. 
        //The test passes if both answers match, else, it fails
        expect(res.ok).toBe(true);
        expect(res.statusCode).toBe(200);
        expect(res.body.data[0].id).toBe(1);
        // expect(res.body.data[0].id).toBe(2);
    });

    test('should return a single user', async () => {
        const res = await request(baseUrl)
            .get('/api/users/1')
        expect(res.statusCode).toBe(200);
        expect(res.body.data.first_name).toBe("George");
    });

    test('should create a new user', async () => {
        const res = await request(baseUrl)
            .post('/api/users')
            .send({
                "name": "zotho",
                "job": "qa engineer"
            })
            .expect(201);
        expect(res.body.name).toBe("zotho");
        expect(res.body).toHaveProperty("id");
        expect(res.body).toHaveProperty("createdAt");
        console.log(res.body);
    });
 

    test('should update a new user', async () => {
        const res = await request(baseUrl)
            .put('/api/users/853')
            .send({
                "name": "zethe",
                "job": "sdet"
            })
            .expect(200);
        expect(res.body.job).toBe("sdet");
        expect(res.body).toHaveProperty("updatedAt");
        console.log(res.body);
    });

    test('should delete a user', async () => {
        await request(baseUrl)
            .delete('/api/users/853')
            .expect(204);
    });

});