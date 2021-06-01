/*
Copyright © Jan Kubát 2021 - present
api.mapy.cz
*/

let center;
let map;
let markerLayer;
let hills;
let hillsArray;
let markers;
let convex;
let polygon;
let selectedMarker;
let userWasHere;
let userId;
let userLogin;

let checkGeoState = false;
let checkWasHereState = false;

let accentMap = {
    "ě": "e",
    "š": "s",
    "č": "c",
    "ř": "r",
    "ž": "z",
    "ý": "y",
    "á": "a",
    "í": "i",
    "ď": "d",
    "ť": "t",
    "ň": "n",
    "é": "e",
    "ů": "u",
    "ú": "u"
};

let normalize = function(term) {
    let ret = "";
    for (let i = 0; i < term.length; i++) {
        ret += accentMap[term.charAt(i)] || term.charAt(i);
    }
    return ret;
};

//MAIN
center = SMap.Coords.fromWGS84(13.931666666666667, 50.555);
map = new SMap(JAK.gel("mapa"), center, 13);
map.addDefaultLayer(SMap.DEF_BASE).enable();
map.addControl(new SMap.Control.Mouse(SMap.MOUSE_PAN | SMap.MOUSE_WHEEL | SMap.MOUSE_ZOOM));

$.get("assets/php/getHills.php", function(data) {
    hills = JSON.parse(data);

    hillsArray = [];
    hills.forEach(element => {
        hillsArray.push(element.name);
    });
    hillsArray = hillsArray.sort();

}).then(function(){
    CreateMarkers();
    $("#sidebarContent").html(SetSidebarText(markers[0]));
    selectedMarker = markers[0];
    wasHere();

    if(getCookie("id") == "") {
        window.location.replace("../index.html");
    } 
    else {
        GetUserData(getCookie("id"));
    }

    $(".searchbar").attr("placeholder", `"${hills[Math.floor(Math.random() * hills.length)].name}"`);
});

map.getSignals().addListener(window, "marker-click", function(e) {
    selectedMarker = e.target;
    let id = selectedMarker.getId();
    wasHere();

    for (let i = 0; i < markers.length; i++) {
        if (markers[i]._id == id) {
            $("#sidebarContent").html(SetSidebarText(markers[i]));
            if($(".sidebar").width() == 50) 
                $(".sidebar").animate({width: '300px'}, 100, function () {
                    $("#sidebarContent").show();
                    $("#btnSidebar").html(`<i class="fas fa-angle-double-left fa-2x"></i>`);
                });
            break;
        }
    }
});

$(".searchbar").on("keyup", function(){
    $(".searchbar").autocomplete({
        source: function(request, response) {
            let matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
            response($.grep(hillsArray, function(value) {
                value = value.label || value.value || value;
                return matcher.test(value) || matcher.test(normalize( value ));
            }));
        }
    })
});

$("#btnSearch").on("click", function() {
    search();
});

$('.searchbar').keypress(function(event){
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        search();  
    }
});

$("#btnWasHere").on("click", function() {
    if (!selectedMarker._options.url.includes("blue")) {
        $.post("assets/php/insertWasHere.php", {id: userId, data: (selectedMarker._id)}).then(function() {
            GetUserData(getCookie("id"));
            SetRemoveWasHere();
        });
    }
})

$("#btnRemoveWasHere").on("click", function() {
    userWasHere = userWasHere.replaceAll(`${selectedMarker._id}`, "");

    $.post("assets/php/removeWasHere.php", {id: userId, data: userWasHere}).then(function() {
        GetUserData(getCookie("id"));
        SetWasHere();
    });   
})

$("#btnLogout").on("click", function() {
    document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.replace("../index.html");
})

$("#checkGeo").on("click", function() {
    if (!checkGeoState) {
        SetConvexHull();
        checkGeoState = true;
    }
    else {
        convex.removeGeometry(polygon);
        checkGeoState = false;
    }
})

$("#checkWasHere").on("click", function() {
    if (!checkWasHereState) {
        LoadWasHereOnly(userWasHere);
        checkWasHereState = true;
    }
    else {
        LoadMarkers(userWasHere);
        checkWasHereState = false;
    }
})

//FUNCTIONS
function GetUserData(idKey) {
    $.get("assets/php/getUserData.php", {key: idKey}, function(res) {
        if (res.includes("<br />")) {
            document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.replace("../index.html");
        }

        res = JSON.parse(res);
        userId = res.id;
        userLogin = res.login;
        userWasHere = res.wasHere;
        $("#accName").html(`${userLogin}`);

        if ($('input#checkGeo').is(':checked')) {
            convex.removeGeometry(polygon);
            SetConvexHull();
        }

        LoadMarkers(userWasHere);
    })
}

function search() {
    markers.forEach(element => {
        if (stripCzech(element._options.title.name.toLowerCase()) == stripCzech($(".searchbar").val().toLowerCase())) {
            selectedMarker = element;
            let id = selectedMarker.getId();
            wasHere();

            map.setCenterZoom(selectedMarker.getCoords(), 15, true);

            for (let i = 0; i < markers.length; i++) {
                if (markers[i]._id == id) {
                    $("#sidebarContent").html(SetSidebarText(markers[i]));
                    if($(".sidebar").width() == 50) 
                        $(".sidebar").animate({width: '300px'}, 100, function () {
                            $("#sidebarContent").show();
                            $("#btnSidebar").html(`<i class="fas fa-angle-double-left fa-2x"></i>`);
                        });
                    break;
                }
            }
        }
    });
}

function wasHere() {
    if (selectedMarker._options.url.includes("blue")) {
        SetRemoveWasHere();
    }
    else { 
        SetWasHere();
    }
}

function stripCzech(input) {
    input = input.replaceAll("ě", "e");
    input = input.replaceAll("š", "s");
    input = input.replaceAll("č", "c");
    input = input.replaceAll("ř", "r");
    input = input.replaceAll("ž", "z");
    input = input.replaceAll("ý", "y");
    input = input.replaceAll("á", "a");
    input = input.replaceAll("í", "i");
    input = input.replaceAll("ď", "d");
    input = input.replaceAll("ť", "t");
    input = input.replaceAll("ň", "n");
    input = input.replaceAll("é", "e");
    input = input.replaceAll("ů", "u");
    input = input.replaceAll("ú", "u");
    return input;
}

function LoadMarkers(data) {
    userWasHere = data;
    data = data.split(",");
    markerLayer.removeAll();

    markers = [];

    for (let i=0;i<hills.length;i++) {
        let x = hills[i].lon;
        let y = hills[i].lat;
        let coords = SMap.Coords.fromWGS84(x, y);
        let marker;

        for (let j = 0; j < data.length; j++) {
            if (parseInt(data[j]) == i) {
                marker = new SMap.Marker(coords, i, {title: hills[i], url: "https://api.mapy.cz/img/api/marker/drop-blue.png"});
                break; 
            }
            else {
                marker = new SMap.Marker(coords, i, {title: hills[i]});
            }
        }
        
        markers.push(marker);
    }

    markerLayer.addMarker(markers);
}

function LoadWasHereOnly(data) {
    userWasHere = data;
    data = data.split(",");
    markerLayer.removeAll();

    markers = [];

    for (let i=0;i<hills.length;i++) {
        let x = hills[i].lon;
        let y = hills[i].lat;
        let coords = SMap.Coords.fromWGS84(x, y);
        let marker;

        for (let j = 0; j < data.length; j++) {
            if (parseInt(data[j]) == i) {
                marker = new SMap.Marker(coords, i, {title: hills[i], url: "https://api.mapy.cz/img/api/marker/drop-blue.png"});
                markers.push(marker);
                break; 
            }
        }
    }

    markerLayer.addMarker(markers);
}

function CreateMarkers() {
    markerLayer = new SMap.Layer.Marker();
    markers = [];

    for (let i=0;i<hills.length;i++) {
        let x = hills[i].lon;
        let y = hills[i].lat;
        let coords = SMap.Coords.fromWGS84(x, y);
        let marker = new SMap.Marker(coords, i, {title: hills[i]});
        markers.push(marker);
    }

    markerLayer.addMarker(markers);
    map.addLayer(markerLayer).enable();
}

function SetWasHere() {
    $("#btnWasHere").show();
    $("#btnRemoveWasHere").hide();
}

function SetRemoveWasHere() {
    $("#btnWasHere").hide();
    $("#btnRemoveWasHere").show();
}

function SetSidebarText(markers) {
    return `
    <div class="bg-light">
        <h2 class="text-center">${markers._options.title.name}</h2>
        <div class="text-center">
            ${((markers._options.title.district != "") ? markers._options.title.location : "")}
            ${((markers._options.title.location != "") ? " → " + markers._options.title.district + "<br>" : "")}
        </div>
    </div>
    <div class="px-2 mt-3">
        Výška: ${markers._options.title.elevation}m<br>
        Lon: ${markers._options.title.lon}<br>
        Lat: ${markers._options.title.lat}<br>
        ${((markers._options.title.prominence != "" && markers._options.title.prominence != "0") ? "Prominence: " + markers._options.title.prominence + "<br>" : "")}
        ${((markers._options.title.isolation != "" && markers._options.title.isolation != "0") ? "Izolace: " + markers._options.title.isolation + "<br>" : "")}
        ${((markers._options.title.material != "" && markers._options.title.material != "0") ? "Hornina: " + markers._options.title.material + "<br>" : "")}
        ${((markers._options.title.basin != "" && markers._options.title.basin != "0") ? "Povodí: " + markers._options.title.basin : "")}
    </div>
    `;
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function SetConvexHull() {
    let pointsConvex = [];
    convex = new SMap.Layer.Geometry();
    map.addLayer(convex);

    let usersHills = userWasHere;
    usersHills = usersHills.split(",");
    for (let i = 0; i < usersHills.length; i++) {
        if (hills[parseInt(usersHills[i])] != undefined) {
            pointsConvex.push({
                x: hills[parseInt(usersHills[i])].lon,
                y: hills[parseInt(usersHills[i])].lat
            });
        }
    }

    pointsConvex = convexHull(pointsConvex);

    let pointsConvexCoords = [];

    for (let i = 0; i < pointsConvex.length; i++) {
        pointsConvexCoords.push(SMap.Coords.fromWGS84(pointsConvex[i].x, pointsConvex[i].y));
    }

    polygon = new SMap.Geometry(SMap.GEOMETRY_POLYGON, null, pointsConvexCoords, {
        color: "#FF0000"
    });

    convex.addGeometry(polygon);
    convex.enable();
}

let EPSILON_LOW = 0.00003; //0.003
let EPSILON = 0.00001;
let EPSILON_HIGH = 0.00000001;

function epsilonEqual(a, b, epsilon) {
    if (epsilon === undefined) {
        epsilon = EPSILON_HIGH;
    }
    return (Math.abs(a - b) < epsilon);
}

function arrayContainsObject(array, object) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === object) {
            return true;
        }
    }
    return false;
}

function convexHull(points) {
    if (points === undefined || points.length === 0) {
        return [];
    }

    let INFINITE_LOOP = 10000;
    let sorted = points.sort(function (a, b) {
        if (a.x - b.x < -EPSILON_HIGH) {
            return -1;
        }
        if (a.x - b.x > EPSILON_HIGH) {
            return 1;
        }
        if (a.y - b.y < -EPSILON_HIGH) {
            return -1;
        }
        if (a.y - b.y > EPSILON_HIGH) {
            return 1;
        }
        return 0;
    });
    let hull = [];
    hull.push(sorted[0]);
    let ang = 0;
    let infiniteLoop = 0;
    do {
        infiniteLoop++;
        let h = hull.length - 1;
        let angles = sorted
            .filter(function (el) {
                return !(epsilonEqual(el.x, hull[h].x, EPSILON_HIGH) && epsilonEqual(el.y, hull[h].y, EPSILON_HIGH))
            })
            .map(function (el) {
                let angle = Math.atan2(hull[h].y - el.y, hull[h].x - el.x);
                while (angle < ang) {
                    angle += Math.PI * 2;
                }
                return {
                    node: el,
                    angle: angle
                };
            })
            .sort(function (a, b) {
                return (a.angle < b.angle) ? -1 : (a.angle > b.angle) ? 1 : 0
            });
        if (angles.length === 0) {
            return [];
        }

        let rightTurn = angles[0];
        angles = angles.filter(function (el) {
                return epsilonEqual(rightTurn.angle, el.angle, EPSILON_LOW);
            })
            .map(function (el) {
                let distance = Math.sqrt(Math.pow(hull[h].x - el.node.x, 2) + Math.pow(hull[h].y - el.node.y, 2));
                el.distance = distance;
                return el;
            })
            .sort(function(a,b){return (a.distance < b.distance)?-1:(a.distance > b.distance)?1:0});
        if (arrayContainsObject(hull, angles[0].node)) {
            return hull;
        }
        
        hull.push(angles[0].node);
        ang = Math.atan2(hull[h].y - angles[0].node.y, hull[h].x - angles[0].node.x);
    } while (infiniteLoop < INFINITE_LOOP);
    return [];
}