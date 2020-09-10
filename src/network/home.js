import {request} from "./request";
export function getHomeMultidata () {
   return request({
       url: '/home/multidata'
   })
}
export function getHomeGoods(type, page) {
    return request({
        url: '/home/data',
        params: {
            type,
            page
        }
    })
}
const  nums = [10 ,20 ,30 ,49,78,33,44,88,100,22]

// let newNums = []
// for(let n of nums) {
//     if( n <50 ) {
//         newNums.push(n)
//         console.log(newNums);
//     }
// }

//  let newNums = nums.filter( (n) =>{
//      return n < 50
//  })
// console.log(newNums);
//  let newNums2 = newNums.map ((n) =>{
//      return n*2
//  })
// console.log(newNums2);
//  let total = newNums2.reduce((preValue,n) => {
//      return preValue + n
// })

let total = nums.filter((n) =>
     n < 50
).map((n) =>
     n*2
).reduce((preValue,n) =>
     preValue + n
)
console.log(total);
// let total = nums.filter( n=> n <50 )
//     .map(n=> n*2)
//     .reduce((pre,n) => pre + n)
// console.log(total);
const  list = [{num:10,name:"Tom"},
    {num:11,name:"Tom"},
    {num:12,name:"Tom"},
    {num:13,name:"Tom"},
    {num:14,name:"Tom"}]
let filteredList = list
    .filter( obj => obj.num < 50)
    .map(obj => obj.num = obj.num * 3)
    .reduce((pre,obj ) =>pre + obj );
     console.log(filteredList);