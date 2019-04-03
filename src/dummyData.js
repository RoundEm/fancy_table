const faker = require('faker')

const generateData = () => {
    const data = []
    let date = ''
    for (let i = 0; i < 12; i++) {
        if (i < 3) {
            date = '3/26/2019'
        } else if (i < 5) {
            date = '3/31/2019'
        } else {
            date = '4/2/2019'
        } 
        let firstName = faker.name.firstName()
        let lastName = faker.name.lastName()
        data.push({
            date,
            id: faker.random.uuid().slice(0, 6),
            // account: faker.finance.accountName(), 
            accountName: `${lastName}, ${firstName}`,
            amount: faker.finance.amount(),
            email: `${lastName}.${firstName}@test.com`,
            hidden: false
        })    
    }
      
    // console.log('data: ', data)
    return data
}

export default generateData

