import { connectToDatabase } from "../../../lib/mongodb";
import NextCors from 'nextjs-cors';


export default async function handler(req, response) {

    const { database } = await connectToDatabase();
    const collection = database.collection("FOC_ivrs_mobileno")
    if(req.method === "POST") {
      let query = {}
      let query2 = {}
      let page = req.query.page;
  
      if (req.body.startDate && req.body.startDate != null) {
        query = {...query, "complaint_reg_dt": {$gte:new Date(req.body.startDate)}};
      }
  
      if(req.body.category) {
        query = {...query, "feeder_type": req.body.category};
      }
  
      if(req.body.circle_name) {
        query = {...query, "circle_name": req.body.circle_name};
      }
  
      if(req.body.division_name) {
        query = {...query, "division_name": req.body.division_name};
      }
  
      if(req.body.subdivision_name) {
        query = {...query, "subdivision_name": req.body.subdivision_name};
      }
  
      if (req.body.endDate && req.body.endDate != null) {
        query = {...query, "complaint_reg_dt": {$lte:new Date(req.body.endDate)}};
      }
  
      if (req.body.endDate && req.body.endDate != null) {
        query = {...query, "complaint_reg_dt": {$lte:new Date(req.body.endDate)}};
      }
  
      if(req.body.startDate && req.body.endDate && req.body.startDate != null && req.body.endDate != null) {
        query = {...query, "complaint_reg_dt": {$gte:new Date(req.body.startDate),$lte:new Date(req.body.endDate)}};
      }
      if(req.body.minutes) {
        query2 = {...query2, "minutes": {$gte:req.body.minutes}}
      }

      console.log(query)
      let totalCount = await collection.find(query).count();
      let data = await collection.aggregate(
        [
            {$match:query},
            {$skip:page*20},
            {$limit:20},
            {
              $project: {
                    _id: 0,
                    "region_name": 1,
                    "circle_name": 1,
                    "division_name": 1,
                    "subdivision_name":1,
                    "dc_name": 1,
                    "ss_name": 1,
                    "feeder_name": 1,
                    "feeder_cat": 1,
                    "feeder_type": 1,
                    "block_name": 1,
                    "area_name": 1,
                    "colony_name": 1,
                    "full_complaint_id": 1,
                    "complaint_reg_dt": 1,
                    "closed_ts": 1,
                    "category": 1,
                    "type": 1,
                    "circle_name":1,
                    "ivrs":1,
                    "minutes": {
                        $trunc: {
                                $divide: [{ $abs : {$subtract: ["$complaint_reg_dt", '$closed_ts'] }}, 60000]
                         }
                    },
                    "hours": {
                      $trunc: {
                              $divide: [{ $abs : {$subtract: ["$complaint_reg_dt", '$closed_ts'] }}, 3600000]
                       }
                    },
                },
            },
            {$match:{$and:[query2,query]}},
            {$sort:{"minutes":1}}
        ]).toArray();
      response.status(200).json({totalCount: totalCount,data:data});
    }
   
}