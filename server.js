const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

const app = express();

app.use(cors());
app.use('/', express.static(
    resolve(__dirname, './build')
));

app.listen(process.env.PORT || 3000 , (e) => {
    if(e) {
        return console.log(e);
    }

    console.log('Server Started..!');
});
