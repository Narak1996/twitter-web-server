const {userModel} = require('./models/userModel')
const {faker} = require('@faker-js/faker')
const dbConnect = require('./db/db-connect')
const mongoose = require("mongoose");
const {twitModel} = require("./models/twitModel");
dbConnect().catch((err)=>{
    console.log(err)})
async function generate_twit() {
    const users = await userModel.find()

    users.forEach(async function (data) {
        let twits_id = []
        let twit_number = Math.floor(Math.random() * 20)
        for (let i = 0;i<=twit_number;i++){
            const twit = new twitModel({
                byUser:data._id,
                text:faker.lorem.paragraph(),
                image : faker.image.avatar(),
                createdDate:faker.date.anytime()
            })
            await twit.save()
            twits_id.push(twit._id)

        }
        data.twits = twits_id;
        await data.save()
        console.log(`${data.name} have inserted ${twit_number} twit (s)`)
    })

    console.log('Done twit.')
    return
}
async function generate_user(){
    for (let i=0;i<25;i++){
        const name = faker.internet.userName()

        const user = new userModel({
            name:name,
            profile_img : faker.image.avatar(),
            email:name+'@gmail.com',
            dob:faker.date.anytime(),
            username:name,
            profile_type:'normal',
            password:faker.internet.password(),
        })
        await user.save();
        console.log('insert')
    }
    console.log('Done user.')
    return
}
generate_twit()