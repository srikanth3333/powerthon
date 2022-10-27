import { connectToDatabase } from "../../../lib/mongodb";
const { ObjectId } = require('mongodb');


export default async function handler(req, response) {
    
    const { database } = await connectToDatabase();
    const collection = database.collection("FOC_ivrs_mobileno")
    let query = {}
    
    // await collection.find({},{projection:{_id:1}}).skip(1800010).limit(200000).toArray(async (err, result) => {
    //   if (err) throw err;
    //   let count = 0;
    //   result.map(async (item) => {
    //     count += 1
    //     console.log(count)
    //     console.log(item._id)
    //     await collection.updateOne({_id:ObjectId(item._id)},[{
    //       $addFields: {
    //                 "delay": {
    //                     $trunc: {
    //                             $divide: [{ $abs : {$subtract: ["$complaint_reg_dt", '$closed_ts'] }}, 60000]
    //                     }
    //                 },
    //             }
    //     }])
    //   })
    //   response.status(200).json(result);
    // })
    

}