import React from 'react';
import logo from './logo.svg';
import './App.css';



setTimeout(function(){
  console.log(1);   
},0);
new Promise(function(a,b){
  console.log(2); 
  setTimeout(() => {
    console.log(6)
    a();
    new Promise(function(c,d){
      c();
    }).then(_=>{
      console.log(8)
      new Promise(function(g){
        g();
      }).then(_=>{
        console.log(12);
      })
    }).catch(_=>{
      console.log(9);
    }) 
    console.log(7);
  }, 0);
  console.log(3)  
}).then(function(){
  console.log(4)
  new Promise(function(e){
    e()
  }).then(_=>{
    console.log(10);
    new Promise(function(f){
      f()
    }).then(_=>{
      console.log(11);
    })
  })
});
console.log(5);


// 2 3 5 1 6 7 4 8  10  11  

// console.log('start');


// setTimeout(() => {
//     console.log(1);
// }, 0);

// new Promise((resolve,reject)=>{
//     console.log(3);
//     setTimeout(() => {
//         console.log(4)
//     }, 0);  
// })

// setTimeout(() => {
//   console.log(10);
// }, 0);

// let info = function(){
//   return new Promise((resolve,reject)=>{
//     console.log(5);
//     setTimeout(() => {
//         console.log(6)
//         resolve(7)
//     }, 0);  
//     console.log(8);
//     setTimeout(() => {
//         console.log(8);
//         reject(9)
//     }, 0);
//   })
// } 
// info().then(c=>{
//   console.log(c);
//   setTimeout(() => {
//       console.log(11)
//   }, 0);
// }).catch(c=>{
//   console.log(12);
//   setTimeout(() => {
//       console.log(13);
//   }, 0);
// })


// setTimeout(() => {
//   console.log(2);
// }, 0);


// console.log('end');


const neo4j = require('neo4j-driver').v1;

const driver = neo4j.driver('http://kg.xorder.ai:7474', neo4j.auth.basic('neo4j', 'xorder'));
const session = driver.session();

// const personName = 'Alice';
const resultPromise = session.run(
  "MATCH path = (a)--(o)   WHERE id(a) = 458643   AND NOT (id(o) IN[])  RETURN path, size((a)--()) as c  ORDER BY id(o)    LIMIT 100",
  // {name: personName}
);

resultPromise.then(result => {
  session.close();
  console.log(result)
  const singleRecord = result.records[0];
  const node = singleRecord.get(0);

  // console.log(node.properties.name);

  // on application exit:
  driver.close();
});

function App() {
  return (
    <div className="App">

    </div>
  );
}

export default App;
