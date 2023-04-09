import React from "react";

import './mess.css'


export default function Messenger(){

  const test = [
    {name:'Do Van Truong',
     ibY:[ {name:'Duy',mess:'hello111111111111111114333434111111111343433434111111343434343411111'},
           {name:'Do Van Truong',mess:'heldfsddvxcvxcvxcvxcvxcvxcvxcvcxvxcvcvccvxcvsdfsdfdlo2'},
           {name:'Duy',mess:'hevxxvxcvxcvxcvxcvxcvxcvxcvcxvxcvcxvcxvcxvcxvcxvllo3'},
           {name:'Do Van Truong',mess:'heldfsfsfssdfdsfdsfdslo4'} ,
           {name:'Duy',mess:'hedsfsdfsdfsfsdfllo5'},
           {name:'Do Van Truong',mess:'hefgdfgfgfdgdfdfgdgdgdffdgdgdfgdfgdggfdfdgdfgdgdfgdgdfgdllo6'},
           {name:'Do Van Truong',mess:'hellfdsfdsdffssfsfsdfsffdfsfsfsfsdfsdsdfsdfsfsdfsdfsdfsdfsfsdfsfo7'},
           {name:'Duy',mess:'heldgdggsdgdssdsdsdsvsdvsdvsdlo9'},
         
         
        ],
     id:'a'
    }];
 const a =   { name:['do khuong duy','do van truong'],
               messenger:[{sender:'do khuong duy',content:'gdfgdfgdgfgfgdfdfdfgdfg'},
                          {sender:'do khuong duy',content:'gdfgdfgdgfgfgdfdfdfgdfg'},
                          {sender:'do khuong duy',content:'gdfgdfgdgfgfgdfdfdfgdfg'},
                          {sender:'do khuong duy',content:'gdfgdfgdgfgfgdfdfdfgdfg'}
                           ] 
                }
  
 
 
 
 const Content = test.map(function(test,index){
        
    const Mess = test.ibY.map(function(ibY,index){
         if(ibY.name === test.name){
            return(
                <div key={index} className="receiveMess" >
                 <div className="i"><i className="fa-solid fa-user">:</i></div>
                 <div className="receiveMess-1" >{ibY.mess}</div>
                </div>
            )
         }else
        return(
            <div className="sendMess" key={index}>
            <div className="sendMess-1" >{ibY.mess}</div>
            </div>
        )
    });
    return(
        <div key={index} className="Messenger" id={test.id}>
            <div className="name">{test.name}</div>
            <div className="contentMess">{Mess}</div>
            <div className="clickSend"><input placeholder="send"></input><button><i className="fa-solid fa-arrow-right"></i></button></div>
            
        </div>
        
    )
  });
    return(<div>
        {Content}
        </div>
    )
}