const faker = require('faker')

const generateData = () => {
    const data = []
    for (let i = 0; i < 10; i++) {
        
        let date
        if (i < 4) date = '3/26/2019'
        else date = '3/31/2019'
        
        data.push({
            date,
            id: faker.random.uuid().slice(0, 6),
            account: faker.finance.accountName(), 
            amount: faker.finance.amount(),
            email: faker.internet.email(),
            hidden: false
        })
    }
    console.log('data: ', data)
    return data
}

export default generateData

