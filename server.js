const express =  require('express');
const app = express();


// middleware
app.use(express.static('public'));
app.use(express.json())

const PORT = process.env.PORT || 5000;
app.get('/', (req, res)=>{
res.sendFile(__dirname + '/public/contactform.html')
})

app.post('/', (req, res) =>{
    console.log(req.body)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'harshitdadhich887@gmail.com',
            pass: 'Dadit@1210'
        }
    })
    const mailOptions = {
        from: req.body.email,
        to: 'harshitdadhich887@gmail.com',
        subject: req.body.subject,
        text: req.body.message
    }
    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log(error);
            res.send('error');
        }else{
            console.log('Email sent:' + info.response);
            res.send('success');
        }
    })
} )

app.listen(PORT, ()=>{
console.log( {PORT})
})