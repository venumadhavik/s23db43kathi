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

exports.car_detail = async function(req, res) {
console.log("detail" + req.params.id)
try {
result = await car.findById( req.params.id)
res.send(result)
} catch (error) {
res.status(500)
res.send(`{"error": document for id ${req.params.id} not found`);
}
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
    
//Handle Costume delete on DELETE.
exports.car_delete = async function(req, res) {
    console.log("delete " + req.params.id)
    try {
    result = await car.findByIdAndDelete( req.params.id)
    console.log("Removed " + result)
    res.send(result)
    } catch (err) {
    res.status(500)
    res.send(`{"error": Error deleting ${err}}`);
    }
    };
    
exports.car_update_put = async function(req, res) {
    console.log(`update on id ${req.params.id} with body
    ${JSON.stringify(req.body)}`)
    try {
    let toUpdate = await car.findById( req.params.id)
    // Do updates of properties
    if(req.body.car_name)
    toUpdate.car_name = req.body.car_name;
    if(req.body.Count) toUpdate.Count = req.body.Count;
    if(req.body.Car_type) toUpdate.Car_type = req.body.Car_type;
    else toUpdate.same = false;
    let result = await toUpdate.save();
    console.log("Sucess " + result)
    res.send(result)
    } catch (err) {
    res.status(500)
    res.send(`{"error": ${err}: Update for id ${req.params.id}
    failed`);
    }
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
    // Handle a show one view with id specified by query
exports.car_view_one_Page = async function(req, res) {
    console.log("single view for id " + req.query.id)
    try{
    result = await car.findById( req.query.id)
    res.render('cardetail',
    { title: 'car Detail', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
    };
    // Handle building the view for creating a costume.
// No body, no in path parameter, no query.
// Does not need to be async
exports.car_create_Page = function(req, res) {
    console.log("create view")
    try{
    res.render('carcreate', { title: 'car Create'});
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };

   // Handle building the view for updating a costume.
// query provides the id
exports.car_update_Page = async function(req, res) {
    console.log("update view for item "+req.query.id)
    try{
    let result = await car.findById(req.query.id)
    res.render('carupdate', { title: 'car Update', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };
    
exports.car_delete_Page = async function(req, res) {
console.log("Delete view for id " + req.query.id)
try{
result = await car.findById(req.query.id)
res.render('cardelete', { title: 'car Delete', toShow:
result });
}
catch(err){
res.status(500)
res.send(`{'error': '${err}'}`);
}
};


    