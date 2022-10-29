import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(req, response) {
    
    const { database } = await connectToDatabase();
    const collection = database.collection("bill_data")
    if(req.method === "POST") {
      let query = {}
      let page = req.query.page;
  
      if (req.body.startDate && req.body.startDate != null) {
        query = {...query, "bill_month": {$gt:new Date(req.body.startDate)}};
      }
  
      if(req.body.consumer_no) {
        query = {...query, "consumer_no": req.body.consumer_no};
      }

      if(req.body.consumer_no) {
        query = {...query, "consumer_no": req.body.consumer_no};
      }

      if(req.body.circle_name) {
        query = {...query, "Zone": req.body.circle_name};
      }
      
      if(req.body.division_name) {
        query = {...query, "divisionId": req.body.division_name};
      }

      if(req.body.region) {
        query = {...query, "Region": req.body.region};
      }

      if(req.body.divisionId) {
        query = {...query, "Div_Id": parseInt(req.body.divisionId)};
      }
  
      if (req.body.endDate && req.body.endDate != null) {
        query = {...query, "bill_month": {$lt:new Date(req.body.endDate)}};
      }
  
      if(req.body.startDate && req.body.endDate && req.body.startDate != null && req.body.endDate != null) {
        query = {...query, "bill_month": {$gt:new Date(req.body.startDate),$lt:new Date(req.body.endDate)}};
      }


      console.log(query)
      console.log(req.query.page)
      let data = await collection.aggregate(
        [
            {$match:query},
            {$skip:page*5000},
            {$limit:5000},
            {
              $project: {
                    _id: 0,
                },
            },
        ]).toArray();
      response.status(200).json({data:data});
    }

}