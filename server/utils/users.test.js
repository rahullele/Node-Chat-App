const expect=require('expect');
const {Users}=require('./users');

describe('Users',()=>{

var users=new Users();

beforeEach(()=>{
  users.users=[{
    id:'1',
    name:'Mike',
    room:'Node Course'
  },
  {
    id:'2',
    name:'Jen',
    room:'React Course'
  },
  {
    id:'3',
    name:'Julie',
    room:'Node Course'
  }
];
});


it('should add new user',()=>{
  var users=new Users();

  var user={
    id:'123',
    name:'Andrew',
    room:'The Office Fans'
  };
  var reUser=users.addUser(user.id,user.name,user.room);
  expect(users.users).toEqual([user]);
});

it('should remove a user',()=>{

var userId='2';
var user=users.removeUser(userId);

expect(user.id).toEqual(userId);
expect(users.users.length).toBe(2);

});

it('should not remove a user',()=>{

  var userId='99';
  var user=users.removeUser(userId);

  expect(users.users.length).toBe(3);

});

it('should find a user',()=>{
  var userId='2';
  var user=users.getUser(userId);
  expect(user.id).toEqual(userId);
});

it('should not find a user',()=>{
  var userId='99'
  var user=users.getUser(userId);
  expect(user).toBeFalsy();
});


it('should return user list for React Course',()=>{

var userList=users.getUserList('React Course');
expect(userList).toEqual(['Jen']);

});

it('should return user list for Node Course',()=>{

var userList=users.getUserList('Node Course');
expect(userList).toEqual(['Mike','Julie']);

});
});

//Difference between toBe() and toEqual()
// There is a difference. toBe uses === to compare the values.
// This works great for things like numbers, string, and booleans.
// This does not work well for objects. === is only true for objects if they are the same object,
// not two objects with the same properties. You can prove that by running the following:
//
// var a = {};
//
// console.log(a === a); // Will print true
//
// console.log({} === {}); // Will print false
// toEqual uses a library called is-equal to compare objects.
// This iterates over all the properties and allow you to compare two different objects.
