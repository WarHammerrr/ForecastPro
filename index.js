function formatDate(time){
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const timestamp=time*1000;
    const dateobj=new Date(timestamp)
    const day=dateobj.getDate()
    const month=dateobj.getMonth()
    const year=dateobj.getFullYear()
 const formatdate=day+" "+monthNames[month]+" "+year;
 return formatdate;
}

function handleSearch(){
    const key="984f378e1bc6d2878e8216e6d968b795"
    let city=document.getElementById('search-bar').value;
    const url= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
    const response=fetch(url)
response.then(function(response){
if(response.ok){
    console.log("first pass")
    return response.json()
}
else{
    throw new Error("request failed")
}
})
.then(function(jsondata){
    console.log(jsondata)
    document.getElementById('ccity').innerHTML=jsondata.name
    document.getElementById('date').innerHTML=formatDate(jsondata.dt ||0)
    document.getElementById('lan').innerHTML = `latitude: ${jsondata.coord?.lat ?? ''}`;
    document.getElementById('lon').innerHTML = `longitude: ${jsondata.coord?.lon ?? '-'}`;
    document.getElementById('wea').innerHTML = jsondata.weather[0]?.main ?? '';
    document.getElementById('temp').innerHTML=Math.round(jsondata.main.temp-273.15,2)
    document.getElementById('tmin').innerHTML=Math.round(jsondata.main.temp_min-273.15,2)
    document.getElementById('tmax').innerHTML=Math.round(jsondata.main.temp_max-273.15,2)
    document.getElementById('press').innerHTML = `${jsondata.main?.pressure ?? '-'} hPa`;
    document.getElementById('hum').innerHTML = `${jsondata.main?.humidity ?? '-'} %`;
    document.getElementById('wspeed').innerHTML = `${jsondata.wind?.speed ?? '-'} m/s`;


})
.catch(function(error){
    console.log(error)
})
}
