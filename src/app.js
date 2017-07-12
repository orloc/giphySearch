import express from "express";
import bodyParser from 'body-parser';
import SearchCtrl from './controller/SearchCtrl';

const app = express();

const searchCtrl = new SearchCtrl();

/**
 * Config Variables to be stored externally to the application or injected via environment variables 
 * @type {string}
 */
const port = 8080;

app.use(bodyParser.json());
app.use((err, req, res, next) => {
    console.error(err.stack);  
    res.status(500).send({ message: 'Sorry! Bad things! We have dispatched the robots who are all over fixing it!'});
});


app.get('/search/:term', searchCtrl.doSearch.bind(searchCtrl));

app.all('*', (req, res) => res.status(404).send({ 'message': 'Not found' }));

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});
