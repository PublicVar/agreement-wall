const assert = require('assert');

class People {

  constructor(){
    this.firstname = "";
    this.lastname = "";
    this.email = "";
    this.job = "";
    this.organization = "";
  }

  importData(people){
    //Validate data
    assert.ok(people.firstname) ;
    assert.ok(people.lastname);
    assert.ok(people.email);
    assert.ok(people.job);
    assert.ok(people.organization);

    this.firstname = people.firstname;
    this.lastname =  people.lastname;

    if(people.email.search(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/) > -1){
      this.email = people.email;
    }else{
      throw new assert.AssertionError({message:'Email not valid'});
    }
    this.job = people.job;
    this.organization = people.organization;

    return this;
  }
}


module.exports = People;
