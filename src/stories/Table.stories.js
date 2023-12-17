import Table from "../Table";
export default{
title:'Table',
component:Table




}
const Template=args=><Table{...args}/>
export const Default=Template.bind({});
Default.args={
columns:[
{Header:"Full Name",
accessor:"FullName"
},
{Header:"Phone Number",
accessor:"PhoneNumber"
},
{Header:"Roles",
accessor:"Roles"
}


],
data:[
   {FullName:"Tapasvi",PhoneNumber:123456789,Roles:"Member"},
   {FullName:"Tapasvi",PhoneNumber:223456789,Roles:"Member"},
   {FullName:"Tapasvi",PhoneNumber:323456789,Roles:"Member"},
   {FullName:"Tapasvi",PhoneNumber:423456789,Roles:"Member"},
   {FullName:"Tapasvi",PhoneNumber:523456789,Roles:"Member"},
   {FullName:"Tapasvi",PhoneNumber:623456789,Roles:"Member"},
   {FullName:"Tapasvi",PhoneNumber:723456789,Roles:"Member"},
   {FullName:"Tapasvi",PhoneNumber:823456789,Roles:"Member"},
   {FullName:"Tapasvi",PhoneNumber:923456789,Roles:"Member"},
   {FullName:"Tapasvi",PhoneNumber:1234567890,Roles:"Member"},
   {FullName:"Tapasvi",PhoneNumber:1234567891,Roles:"Member"},
   {FullName:"Tapasvi",PhoneNumber:1234567892,Roles:"Member"},
   {FullName:"Tapasvi",PhoneNumber:1234567893,Roles:"Member"},
   {FullName:"Tapasvi",PhoneNumber:1234567894,Roles:"Member"},
   {FullName:"Tapasvi",PhoneNumber:1234567895,Roles:"Member"},
   {FullName:"Tapasvi",PhoneNumber:1234567896,Roles:"Member"},
   {FullName:"Tapasvi",PhoneNumber:1234567897,Roles:"Member"},
   {FullName:"Tapasvi",PhoneNumber:1234567898,Roles:"Member"},
   {FullName:"Tapasvi",PhoneNumber:1234567899,Roles:"Member"},
   {FullName:"Tapasvi",PhoneNumber:2234567890,Roles:"Member"},
   {FullName:"Tapasvi",PhoneNumber:2234567891,Roles:"Member"},
   {FullName:"Tapasvi",PhoneNumber:2234567892,Roles:"Member"}
  ],




}

