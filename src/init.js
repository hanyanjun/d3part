import React from 'react';
import neo4jData from "neo4j-data"
import D3Force from "react-d3-force"


class Init extends React.Component{
   constructor(props){
     super(props)
     this.state = {
       graph : {},
       nodes : [],
       relationships : [],
       neo4j : {}
     }
   }
   initGraph(info){
     this.setState({
       graph : info
     },()=>{
      //  this.runMatch("match (n{name:'RChain'}) return n")
      //  this.runMatch("match (n{name:'Ethereum'}) return n")
       this.runMatch("match (n) where id(n) = 213907 return n ")
       this.runMatch("match (n) where id(n) = 139543 return n ")
       setTimeout(() => {
        //  获取两个节点之间的所有关系
        this.runMatch("match p=(n1)-[*0..3]-(n2) where id(n1) = 213907 and id(n2) = 139543 return p")
        // match p=(n1)-[*0..​2​]-(n2) where id(n1) = 213907 ​and id(n2) = 139543 ​return p
        //  this.runMatch("match p=(n1:Project)-[*0..2]-(n2:Project) where n1.name=~'^(?i)​rchain​.*$' and n2.name=~'^(?i)​ethereum​.*$' return p ")
        //  this.runMatch("match (n) where id(n) = 213907 return n ")
        // 扩展某个节点的命令
          setTimeout(() => {
            // 对某个节点进行扩展
            this.runMatch("MATCH path = (a)--(o)  WHERE id(a) = 139543  AND NOT (id(o) IN[])   RETURN path, size((a)--()) as c    ORDER BY id(o)    LIMIT 100")
          },4000);
        // this.runMatch("match (n{name:'NGC'}) return n")
        // this.runMatch("MATCH path = (a)--(o)   WHERE id(a) = 213907   AND NOT (id(o) IN[])  RETURN path, size((a)--()) as c  ORDER BY id(o)    LIMIT 100")
       },2000);
     })
   }
   runMatch(match){
     let {neo4j,graph} = this.state;
     neo4j.runMatch(match)
      .then(result=>{
          let info = neo4j.dataDetail(result.records);
          console.log(info);
          this.setState({
            neo4j : neo4j,
            nodes : info.nodes,
            relationships : info.relationships,
            isUpdate : true
          })
          neo4j.close();
  })

   }
   componentDidMount(){
      const neo4j = new neo4jData();
      neo4j.config({
          url : 'http://kg.xorder.ai:7474',
          username : 'neo4j',
          password : 'xorder'
      })
      this.setState({
        neo4j 
      })
   }
    render(){
      return(
        <D3Force  
        nodes={this.state.nodes}  
        relationships={this.state.relationships}
        onItemMouseOver={function(){
            // console.log('over')
        }}  
        getGraph = {
          // function(){}
          this.initGraph.bind(this)
        }
        onEventListener = {function(item){
            console.log(item);
        }}
        onItemSelect={function(){
            // console.log('select')
        }}></D3Force>
      )
    }

}


export default Init;
