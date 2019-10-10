'use strict'

'use strict'

const initApp = require('./src/app')

const app = initApp()

app.listen(3001, () => console.log('Server running on port 3000'))

