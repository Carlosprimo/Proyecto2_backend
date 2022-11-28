const createServer = require('../server');
const  request = require('supertest');
const mongoose = require("mongoose");

describe('user route tests', ()=>{
   let app;
   let user_id;
    beforeAll(() => {
        app = createServer()
    })

    test("/", async()=>{
        const {status}= await request(app).get("/")
        expect(status).toBe(200)
    })

    

})