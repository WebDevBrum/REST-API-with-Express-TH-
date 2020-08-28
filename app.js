const express = require('express');
const app = express();
const routes = require('./routes');





app.use(express.json());
app.use('/api', routes);







app.use((req,res,next) => { //catches none existant routes as req/res cycle ends up here if none of above take
  const err = new Error("Not Found");
  err.status = 404;
  next(err); //passes error to error handler
});

app.use((err,req,res,next) => { // needs the err parameter to pass into
  res.status(err.status || 500); //or 500 if status code is undefined
  res.json({ //gives an error as json as this is an api
      error: {
        message: err.message
      }
  })
});




app.listen(3000, () => console.log('Quote API listening on port 3000!'));


