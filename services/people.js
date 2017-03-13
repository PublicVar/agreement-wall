const assert = require('assert');

class People {

  constructor(){
  }

  create(people){
    this.firstname = assert.ok(people.firstname) ? people.firstname : "" ;
    this.lastname = assert.ok(people.lastname) ? people.firstname  : "";
    assert.ok(people.email);
    if(people.email.search(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/) > -1){
      this.email = people.firstname;
    }else{
      throw new assert.AssertionError({message:'Email not valid'});
    }
    this.job = assert.ok(people.job) ?  people.firstname  : "";
    this.organization = assert.ok(people.organization) ? people.firstname  : "";
  }
}

let people = new People();

module.exports = people;
