const faker = require('faker')

const generateData = () => {
    const data = []
    for (let i = 0; i < 10; i++) {
        let account = faker.finance.accountName() 
        let amount = faker.finance.amount()
        let email = faker.internet.email()
        let id = faker.random.uuid()
        let date
        if (i < 5) date = '3/26/2019'
        else date = '3/31/2019'
        data.push({
            date,
            id: id.slice(0, 6),
            account,
            amount,
            email
        })
    }
    console.log('data: ', data)
    return data
}

export default generateData

