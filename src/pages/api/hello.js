import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, response) {
    
    const { database } = await connectToDatabase();
    const collection = database.collection("bill_data")
    if(req.method === "POST") {
      let query = {}
      let page = req.query.page;
  
      if (req.body.startDate && req.body.startDate != null) {
        query = {...query, "created_on": {$gte:new Date(req.body.startDate)}};
      }
  
      if(req.body.consumer_no) {
        query = {...query, "consumer_no": req.body.consumer_no};
      }
  
      if (req.body.endDate && req.body.endDate != null) {
        query = {...query, "created_on": {$lte:new Date(req.body.endDate)}};
      }
  
      if(req.body.startDate && req.body.endDate && req.body.startDate != null && req.body.endDate != null) {
        query = {...query, "created_on": {$gte:new Date(req.body.startDate),$lte:new Date(req.body.endDate)}};
      }

      let totalCount = await collection.find(query).count();
      let data = await collection.aggregate(
        [
            {$match:query},
            {$skip:page*20},
            {$limit:20},
            {
              $project: {
                    _id: 0,
                },
            },
        ]).toArray();
      return response.status(200).json({totalCount: totalCount,data:data});
    }

    return response.status(200).json({status: 'working....'});
}