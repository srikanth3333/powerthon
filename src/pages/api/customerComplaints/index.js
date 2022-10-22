import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(req, response) {
    
    if(req.method == "POST") {
      let query = {}
      let query2 = {}
      let page = req.query.page;
      const { database } = await connectToDatabase();
      const collection = database.collection("bill_complaint_ivrs_mobileno")

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
        query2 = {...query, "minutes": {$gte:parseInt(req.body.minutes)}}
      }

      let data2 = await collection.aggregate(
        [
            {
              $addFields: {
                  "minutes": {
                      $trunc: {
                              $divide: [{ $abs : {$subtract: ["$complaint_reg_dt", '$closed_ts'] }}, 60000]
                      }
                  },
              }
            },
            {$match:{$and:[query,query2]}},
            {$group: {_id: null,count:{$sum:1}}},
        ]).toArray();
      console.log(data2)
      let data = await collection.aggregate(
        [
            {
              $addFields: {
                  "minutes": {
                      $trunc: {
                              $divide: [{ $abs : {$subtract: ["$complaint_reg_dt", '$closed_ts'] }}, 60000]
                      }
                  },
              }
            },
            {$project: {
                _id: 1,
                "region_name": 1,
                "circle_name": 1,
                "division_name": 1,
                "subdivision_name":1,
                "dc_name": 1,
                "full_complaint_id": 1,
                "complaint_reg_dt": 1,
                "closed_ts": 1,
                "category": 1,
                "type": 1,
                "circle_name":1,
                "ivrs":1,
                "minutes":1,
                "sub_category":1
              },
            },
            {$match:{$and:[query,query2]}},
            {$skip:page*20},
            {$limit:20},
            {$sort:{"minutes":1}}
        ]).toArray();
      response.status(200).json({totalCount: data2 && data2[0] && data2[0].count ? data2[0].count : 0,data: data});
    }
    
}