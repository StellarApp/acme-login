const User = require('./Users');
const conn = require('./conn') 

const syncAndSeed = async () => {
    await conn.sync({force:true});

    const users = [
        {email: 'checkstella@gmail.com', password: '123456'},
        {email: 'keywi@gmail.com', password: '123456'},
        {email: 'Mandoo@gmail.com', password: '123456'}
    ]


    await Promise.all(users.map(user => User.create(user)))
}
// syncAndSeed();

module.exports ={
    syncAndSeed,
    models:{
        User
    }
}