import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import {Icon} from 'leaflet';
import Moment from 'react-moment';



const limeOptions = { color: 'red' }


function Map({maps,center}) {

  var result = maps && maps.reduce((acc,d,index) => {
    if(d._id !== null) {
      return {...acc, [index]: {lat:d.lat,lon:d.lon}};
    }
  }, []);

  var result2 = result && Object.values(result).map((key) => {
    
    if(key.lat !== undefined && key.lon !== undefined && key !== undefined) {
      if(key.lon == undefined && key.lon == undefined && key == null ) {
        return null
      }else {
        return Object.values(key)
      }
    }
  });

  var filtered = result2 && result2.filter(function (el) {
    return el != null;
  });
  

  return (
    
      result2.length > 0
      ?
          <MapContainer center={maps && maps[0] ? [maps[0].lat,maps[0].lon] : center } style={{width:"100%",height: '500px'}} zoom={8} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {maps && maps.map((location, i) => {
                    if(location.lat && location.lon != undefined) {
                       
                        return (
                          <>
                            <Marker position={[location.lat, location.lon]} 
                                icon={new Icon({iconUrl: "https://cdn-icons-png.flaticon.com/512/787/787535.png", 
                                iconAnchor: [0, 24],
                                labelAnchor: [-6, 0],
                                iconSize: [40, 41], 
                                iconAnchor: [12, 41]})}
                                key={i}>
                                <Popup>
                                  Reading Status: {location.readingStatus}
                                  <br />
                                  Updated Date: <Moment format="DD/MM/YYYY">{location.updatedAt}</Moment>
                                  <br />
                                  Time: <Moment format="hh:mm:ss A">{location.updatedAt}</Moment>
                                  <br />
                                  Mr Id: {location.mrid}
                                </Popup>
                                
                            </Marker>
                            
                          </>
                        )
                    }
                })}
                {
                  maps.length > 0 && maps[0].lat != null
                  ?
                    <Polyline pathOptions={limeOptions} positions={filtered} />
                  :
                    null
                }
                
              
              {/* <MapConsumer>
                  {(map) => {
                    console.log("map center:", map.getCenter());
                    map.on("click", function (e) {
                      const { lat, lng } = e.latlng;
                      L.marker([lat, lng], { icon }).addTo(map);
                    });
                    return null;
                  }}
              </MapConsumer> */}
            </MapContainer>
      :
      null
    
  );

}

export default Map;
