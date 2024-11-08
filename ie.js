const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('./'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'ie.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 