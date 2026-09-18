require('dotenv').config();

const app = require('./src/app/index');
const connectedDb = require('./src/util/db');

const PORT = 3000;

connectedDb();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});