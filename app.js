import express from 'express';
import Mongoose from 'mongoose';
import userbug from './models/userbug.js'
import bodyParser from 'body-parser';
import moment from 'moment'

const port = 3000;
const app = express();
var mongourl = Mongoose.connect('mongodb://127.0.0.1:27017/edureka')
app.use(express.static(__dirname+'/public'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', './views');

// Get Data from datbase and display on index
app.get('/', (req,res)=>{
    userbug.find((err,result) => {
        if(err) throw err;
        res.render('index.ejs',{data:result, moment: moment})
    })
})

app.get('/addBug',(req,res) => {
    res.render('admin')
})
// Add bug data
app.post('/addData', (req,res) => {
    userbug.create(req.body, (err,result) => {
            if(err) throw err;
            console.log('data.inserted');
        })
    res.redirect('/');
})
// Find bug by name
app.post('/find_by_name',(req,res) => {
    let title = req.body.title;
    userbug
      .find({title:title}, (err,result) => {
          if(err) throw err;
          res.send(result)
      })
});
// Update bug
app.put('/update_bug',(req,res)=>{
    userbug
        .findOneAndUpdate({"title":req.body.title},{
            $set:{
                title:req.body.title,
                status:req.body.status
            }
        },{
            upsert:true
        },(err,result) => {
            if(err) return res.send(err);
            res.send(result)
        })
})
// Post data from ui
/*app.post('/addData', (req,res) => {
    db.collection(col_name)
        // In Req.body we will recive the data
        // from form.
        .insert(req.body, (err,result) => {
            if(err) throw err;
            console.log('data.inserted');
        })
    res.redirect('/');
})

// Delete Selected User
app.delete('/delete_user',(req,res) => {
    db.collection(col_name).findOneAndDelete({
        "name":req.body.name
    },(err,result) => {
        if (err) return res.send(500,err)
        res.send({message: 'success'})
    })
})

// Find user by name
app.post('/find_by_name',(req,res) => {
    let name = req.body.name;
    db.collection(col_name)
      .find({name:name})
      .toArray((err,result) => {
          if(err) throw err;
          res.send(result)
      })
});

// Update User
app.put('/update_user',(req,res)=>{
    db.collection(col_name)
        .findOneAndUpdate({"name":req.body.name},{
            $set:{
                name:req.body.name,
                email:req.body.email,
                phone:req.body.phone
            }
        },{
            upsert:true
        },(err,result) => {
            if(err) return res.send(err);
            res.send(result)
        })
})

// Opening Add User page
app.get('/addUser',(req,res) => {
    res.render('admin')
})*/

app.listen(port, ()=> {
    console.log(`Server running on port ${port}`)
})