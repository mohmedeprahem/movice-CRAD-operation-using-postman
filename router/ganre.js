const express = new require('express');
const router =  express.Router();
const ganres = [
    {id : 1 ,name : 'action'},
    {id : 2 ,name : 'horror'},
    {id : 3 ,name : 'animation'}
];

router.get('/' ,(req ,res ) => {
    res.send(ganres)
});

router.get('/:id' ,(req ,res) => {
    const ganre = ganres.find(c => c.id === parseInt(req.params.id));
    if(!ganre) return res.status(404).send('ganre not found');
    res.send(ganre);
});

router.post('/' ,(req ,res) => {
    //validate input
    const schema = {
        name : Joi.string().min(3).required()
    }
    const result = Joi.validate(req.body ,schema);
    if(result.error){
        return res.status(400).send(result.error.details[0].message);
    }

    //create new element
    const ganre = {
        id : ganres.length + 1,
        name : req.body.name
    }
    ganres.push(ganre);
    res.send(ganre)
});

router.put('/:id', (req, res) => {
    //find ganre
    const ganre = ganres.find(c => c.id === parseInt(req.params.id));
    if(!ganre) return res.status(404).send('ganre not found');
    //validate input
    const schema = {
        name : Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body , schema);
    if(result.error){
        return res.status(400).send(result.error.details[0].message);
    };
    //update ganre
    ganre.name = req.body.name;
    res.send(ganre);
});
router.delete('/:id', (req, res) => {
    const ganre = ganres.find(c => c.id === parseInt(req.params.id));
    //if not found
    if(!ganre) return res.status(404).send('request not found')
    //delete
    const index = ganres.indexOf(ganre);
    ganres.splice(index, 1);
    //return update of course
    res.send(ganre);
});
module.exports =router;