let zoom=0;
let lat=0;
let lng=0
let x=[]
let res;
    $.ajax({
        url:'https://restcountries.eu/rest/v2',
        type:'GET',
        success:function(result){
            console.log(result);
            
            for(let i=0;i<result.length;i++){
                x.push(result[i])
               $('#inputGroupSelect01').append(
                   `
                   <option id='${i}'>${result[i]["name"]}</option>
                   `
               )
            }
            
        }
    })
    function initMap() {
        let options = {
            zoom: zoom,
            center: {
                lat:lat,
                lng:lng
            }
        }
        let map = new google.maps.Map(document.getElementById('mapDiv'), options);
        let pin = new google.maps.Marker({
            position: {
                lat: lat,
                lng: lng
            },
            map: map
        })
    }
      
        $('#inputGroupSelect01').change(function(){
           console.log(x);
           let y=$('#inputGroupSelect01').val()
           var t;
            for(let i=0;i<x.length;i++){
                if(x[i]['name']===$('#inputGroupSelect01').val()){
                    t=i
                    lat = x[t].latlng[0];
                    lng = x[t].latlng[1];
                        zoom = 5;
                        initMap();
                        break;
                }
            }
            
        
            $('#code').html(`${x[t]["callingCodes"]}`)
            
            txt=`
            <div style='margin:5px'>${x[t]['name']}</div><br>
           <div class="yellow">capital:</div><div>${x[t]['capital']}</div><br>
           <div class="yellow">nativeName:</div><div>${x[t]['nativeName']}</div><br>
           <div class="yellow">region:</div><div>${x[t]['region']+ x[t]['subregion']}</div><br>
           <div class="yellow">population:</div><div>${x[t]['population']}</div><br>
           <div class="yellow">languages:</div><div>${x[t]['languages']['name']}</div>
            `
           let p=`<img style="width:100%; height:100%" src="${x[t]['flag']}"></img>`
            $('#total').html(txt)
            $('#miel').html(p)
            console.log('45');
            let cop=x[t]['capital'].replace(" ","+")
            // Initialize and add the map
 
            $.ajax({
                
                
                 url:`http://api.openweathermap.org/data/2.5/weather?q=${cop}&appid=f85caa72aa1c1a98b4e73db570a65afc`,
                 type:"GET",
        
                 success:function(result){
                    console.log('ajax');
                    
                         console.log(result);
                         
                          $('#wind').html(`<span style="color:red">wind speed:</span><div>${result.wind.speed}</div>`)
                          $('#temp').html(`<span style="color:red">temp:</span><div>${result.main.temp}</div>`)   
                          $('#pp').html(`<span style="color:red">humidity:</span><div>${result.main.humidity}</div>`) 
                          $('#tash').html(`<span style="color:red">weather:</span><div>${result.weather[0].main}</div>`)
                          $('#icon').html(`<i class="${result.weather[0].icon}"></i>`)          
                    
                             
                         
                     }
                 
            })
            
            
           
            
            
        })
        
     
    

    