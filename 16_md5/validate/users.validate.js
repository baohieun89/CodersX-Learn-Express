module.exports = {
  postCreate: (req, res, next) => {
    var errors = [];
    if(!req.body.name){

      errors.push('Name is required');
    }
    if(!req.body.age){
      errors.push('Age is required');
      console.log(req.body.name.length);
    }
    if(!req.body.email){
      errors.push('Email is required');
    }
    if(!req.body.password){
      errors.push('Password is required');
    }
    if(req.body.password.length < 6){
      errors.push('Password cannot be less than 6 characters');
    }
    if(req.body.name.length > 30){
      errors.push('Name is too long');
    }
    if(errors.length){
      res.render('users/create',{
        errors: errors,
        values: req.body
      });
      return
    }
    res.locals.user = true;
    next();
  }
}
