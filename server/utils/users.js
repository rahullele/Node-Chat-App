// class Person{
//
//   constructor(name,age){
//     this.name=name;
//     this.age=age;
//   }
//
//   getUserDescription(){
//     return `${this.name} is ${this.age} year(s) old.`;
//   }
// }
//
// var me=new Person('Andrew',25);
// var description=me.getUserDescription();
// console.log(description);

// var users=[];
// addUser=(id,name,room)=>{
// users.push({id,name,room});
// };
// module.exports={addUser};
//Above is the approach without classes

class Users{
  constructor(){
    this.users=[];
  }
  addUser(id,name,room){
    var user={id,name,room};
    this.users.push(user);
    return user;
  }

  getUser(id){
    return this.users.filter((user)=>user.id===id)[0];
  }

  removeUser(id){

     var user=this.getUser(id);

     if(user){
      this.users=this.users.filter((user)=>{
      return user.id!==id
    });
  }
     return user;
  }

  getUserList(room){
    var userList=this.users.filter((user)=>{
      return user.room===room;
    });
    var namedArray=userList.map((user)=>{
      return user.name;
    });
    return namedArray;
  }
}
module.exports={Users};
