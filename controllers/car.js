var car = require('../models/car');
//List of all Costumes
exports.car_list = async function(req, res) {
try{
thecar = await car.find();
res.send(thecar);
}
catch(err){
res.status(500);
res.send(`{"error": ${err}}`);
}
};

// for a specific Costume.
exports.car_detail = function(req, res) {
res.send('NOT IMPLEMENTED:car detail: ' + req.params.id);
};
// Handle Costume create on POST.
exports.car_create_post = async function(req, res) {
    console.log(req.body)
    let document = new car();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"costume_type":"goat", "cost":12, "size":"large"}
    document.car_name = req.body.car_name;
    document.Count = req.body.Count;
    document.Car_type = req.body.Car_type;
    try{
    let result = await document.save();
    res.send(result);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };
    
// Handle Costume delete form on DELETE.
exports.car_delete = function(req, res) {
res.send('NOT IMPLEMENTED: Car delete DELETE ' + req.params.id);
};
// Handle Costume update form on PUT.
exports.car_update_put = function(req, res) {
res.send('NOT IMPLEMENTED: Car update PUT' + req.params.id);
};

exports.car_view_all_Page = async function(req, res) {
    try{
    thecar = await car.find();
    res.render('car', { title: 'car Search Results', results: thecar });
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };
    
    