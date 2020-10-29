const hko = new XMLHttpRequest();
if (!hko) {
    alert("Cannot create XMLHttpRequest object!!");
}
ajaxRequest();
function ajaxRequest() {
    hko.onreadystatechange = ajaxResponse;
    hko.open('GET', "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en", true);
    hko.send();
}
function ajaxResponse() {

    if (hko.readyState == 4 && hko.status == 200) {
         let obj = JSON.parse(hko.responseText);
        console.log(obj.updateTime) ;
        window.onload = ()=>{

            let head = document.createElement("header");
            let title= document.createElement("h1");
            let t = document.createTextNode("Weather in Hong Kong");
            title.append(t);
            head.append(title);

            let icon = document.createElement("span")
            icon.setAttribute("id","icon")
            icon.innerHTML= '<img src="'+obj.icon[0]+'">'
            head.appendChild(icon)

            let x = document.createElement("img");
            x.setAttribute("src", "images/thermometer.png");
            let xe = document.createElement("span");
            xe.append(document.createTextNode(obj.temperature.data[1].value));
            head.appendChild(x);
            head.appendChild(xe);
            // head.appendChild(document.createElement("br"))


            let x2 = document.createElement("img");
            x2.setAttribute("src", "images/drop.png");
            let xe2 = document.createElement("span");
            xe2.append(document.createTextNode(obj.humidity.data[0].value));
            head.appendChild(x2);
            head.appendChild(xe2);

            let x3 = document.createElement("img");
            x3.setAttribute("src", "images/rain.png");
            let xe3 = document.createElement("span");
            xe3.append(document.createTextNode(obj.rainfall.data[13].max));
            head.appendChild(x3);
            head.appendChild(xe3);

            let x4 = document.createElement("img");
            x4.setAttribute("src", "images/UVindex.png");
            let xe4 = document.createElement("span");
            xe3.append(document.createTextNode(obj.uvindex.data[0].value));
            head.appendChild(x4);
            head.appendChild(xe4);
            head .appendChild(document.createElement("br"))
            head .appendChild(document.createElement("br"))


            let but = document.createElement('button');
            but.setAttribute('class', 'btn');
            but.textContent = 'Warning!';
            head.appendChild(but)

            let reload=document.createElement('button');
            reload.setAttribute('class', 'rel');
            reload.innerHTML = '<img src="images/reload.png"/>';
            head.appendChild(reload)

            let time=document.createElement('span');
            time.setAttribute('id', "time");
            time.innerHTML = "Last Update:  " + obj.updateTime.substring(14, 19);
            head.appendChild(time)

            document.body.appendChild(head);


        }
    }
}




