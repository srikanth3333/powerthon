import React from 'react'

function Download() {

    const downloadData = async () => {
        setDataLoading(true)
        let Arraydata = [];
        let finalData = Math.ceil(parseInt(focData.totalCount) / 5000);
        for(let i=0; i<finalData; i++) {
            setCount(i * 5000)
            let data = {
                startDate:startDate,
                endDate:endDate,
                category:category,
                circle_name:circleName,
                division_name:divisionName,
                subdivision_name:subdivision,
                minutes:minutes,
            }
            await axios.post(`/api/customerComplaints/dataDownload?page=${i}`,data)
            .then(res => {
                Arraydata.push(...res.data.data)
            })
            .catch(err => {
                console.log(JSON.stringify(err))
            })   
        }
        setDownloadDataArray(Arraydata)
        setDataLoading(false)
        setExcelReady(true)
        let button = document.getElementById('dn-btn')
        button.click();
        
    }
    
  return (
    <div>Download</div>
  )
}

export default Download