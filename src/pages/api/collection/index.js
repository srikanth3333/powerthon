import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(request, response) {
    
    const { database } = await connectToDatabase();
    const collection = database.collection("foc_complaint_data_apr_21_to_sep_22")
    let query = {}

    await collection.find(query).limit(10).toArray((err, result) => {
      if (err) throw err;
      response.status(200).json(result);
    })

}