const express = require('express');

const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Dockerized Application Successfully Deployed on AWS EC2 🚀');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});