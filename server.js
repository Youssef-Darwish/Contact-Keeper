const express = require('express');
const users = require('./routes/users');
const contacts = require('./routes/contacts');
const auth = require('./routes/auth');
const connectDB = require('./config/db');
const path = require('path');
const app = express();

//Connect Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));


//Define Routes
app.use('/api/users', users);
app.use('/api/contacts', contacts);
app.use('/api/auth', auth);


//Serve static assets in production 
if (process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`server running on post ${PORT}`)
});