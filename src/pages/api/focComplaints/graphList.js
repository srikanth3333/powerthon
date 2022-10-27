import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(req, response) {
    const { database } = await connectToDatabase();
    const collection = database.collection("FOC_ivrs_mobileno")
    if(req.method === "POST"){
      let query = {}

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
      
      console.log(query)
  
      let barGraphData = await collection.aggregate(
        [
          {$match:query},
          {$group: {_id:"$circle_name",count:{$sum:"$delay"}}},
          {$sort:{count:1}}
     ]).toArray();
      response.status(200).json(barGraphData);
    }
}

