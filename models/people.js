const assert = require('assert');

class People {

  constructor(people){
  }

  function create(people){
    this.firstname = assert.ok(people.firstname) ? people.firstname : "" ;
    this.lastname = assert.ok(people.lastname) ? people.firstname  : "";
    this.email = assert.ok(people.email) ? people.firstname  : "";
    this.job = assert.ok(people.job) ?  people.firstname  : "";
    this.organization = assert.ok(people.organization) ? people.firstname  : "";
  }
}

module.exports = new People();
