const express = require('express');
const router = express.Router();
const records = require('./records');




function asyncHandler(cb){ //ommits the need for multiple try catch blocks in routes
  return async (req, res, next)=>{
    try {
      await cb(req,res, next); // so calls the function cb here and then catches in catch, saves writing try catch every time as higlighted below
    } catch(err){
      next(err);
    }
  };
}

// Send a GET request to /quotes READ a list of quotes
// router.get('/quotes', async (req, res) =>{

//   try {
//     const quotes = await records.getQuotes();
//     res.json(quotes); 
//   } catch(err) {
//     res.json({message: err.message}); // NOW ERROR VIA ASYNC AND THEN ERROR HANDLER.
//   }
// });

router.get('/quotes', asyncHandler(async (req, res) => {
  const quotes = await records.getQuotes();
  res.json(quotes); 

}))



// Send a GET request to /quotes/:id READ(view) a quote
// router.get('/quotes/:id', async (req, res) =>{
  // try{
  //   const quote = await records.getQuote(req.params.id);
  //   if(quote){
  //     res.json(quote);
  //   } else {
  //     res.status(404).json({message: "Quote not found"});
  //   }
  
  // } catch(err){
  //   res.status(500).json({message: err.message}); // NOW ERROR VIA ASYNC AND THEN ERROR HANDLER.
  // }
// });


router.get('/quotes/:id', asyncHandler(async (req, res) => {
  const quote = await records.getQuote(req.params.id);
    if(quote){
      res.json(quote);
    } else {
      res.status(404).json({message: "Quote not found"});
    }
  
}))

// Send a GET request to /quotes/quote/random READ(view) a random quote
router.get('/quotes/quote/random', asyncHandler(async (req, res, next) =>{
  const quote = await records.getRandomQuote();
  res.json(quote);

}))


// Send a POST request to /quotes CREATE  a new quote
// router.post('/quotes', async (req, res) =>{

//   try{
//     if(req.body.author && req.body.quote) {
//       const quote = await records.createQuote({
//         quote:req.body.quote, 
//         author:req.body.author
//       });
//      res.status(201).json(quote); //methods chained, can be two res.status res,json
//     } else {
//       res.status(400).json({message: "Quote and author required."});
//     }
    
//   } catch(err){
//     res.status(500).json({message: err.message}); //methos chained, can be two res. res,
//   }
// });

// NEW VERSION USING ASYNC HANDLER
router.post("/quotes", asyncHandler(async (req,res)=>{
  if(req.body.author && req.body.quote) {
          const quote = await records.createQuote({
            quote:req.body.quote, 
            author:req.body.author
          });
         res.status(201).json(quote); //methods chained, can be two res.status res,json
        } else {
          res.status(400).json({message: "Quote and author required."});
        }
}));

// Send a PUT request to /quotes/:id UPDATE (edit) a quote

// router.put('/quotes/:id', async (req, res) =>{
//   try {
//     const quote = await records.getQuote(req.params.id);
//     if(quote) {
//       quote.quote = req.body.quote;
//       quote.author = req.body.author;
//       await records.updateQuote(quote);
//       res.status(204).end();
//     } else {
//       res.status(404).json({message: "Quote not found"});
//     }
    
//   } catch (err) {
//     res.status(500).json({message: err.message}); //methos chained, can be two res. res,
//   }
// });

router.put('/quotes/:id', asyncHandler( async (req, res) => {

  const quote = await records.getQuote(req.params.id);
    if(quote) {
      quote.quote = req.body.quote;
      quote.author = req.body.author;
      await records.updateQuote(quote);
      res.status(204).end();
    } else {
      res.status(404).json({message: "Quote not found"});
    }

}));



// Send a DELETE request /quotes/:id to DELETE a quote

// router.delete('/quotes/:id', async (req, res) =>{
//   try {
//     //throw new Error("Something terrible happened"); //this is the err.message
//     const quote = await records.getQuote(req.params.id);
//     if(quote) {
//       await records.deleteQuote(quote);
//       res.status(204).end();
//     } else {
//       res.status(404).json({message: "Quote not found"});
//     }
    
//   } catch (err) { //NOW VIA ASYNCHANDLER AND THEN ERROR HANDLER
//     //next(err); and delete below (this and above a means of testing handler)
//     res.status(500).json({message: err.message}); //methos chained, can be two res. res,
//   }
// });

router.get('/quotes/:id', asyncHandler(async (req, res) => {
  const quote = await records.getQuote(req.params.id);
  if(quote) {
    await records.deleteQuote(quote);
    res.status(204).end();
  } else {
    res.status(404).json({message: "Quote not found"});
  }
  
}))



module.exports = router;