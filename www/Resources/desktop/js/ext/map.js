currentManager = '';

$(function () {

    var Browser = {
        Version: function() {
            var version = 999; // we assume a sane browser
            if (navigator.appVersion.indexOf("MSIE") != -1)
                // bah, IE again, lets downgrade version number
                version = parseFloat(navigator.appVersion.split("MSIE")[1]);
            return version;
        }
    };

    var myOptions = {
        zoom: 5,
        minZoom: 5,
        maxZoom: 8,
        scrollwheel: false,
        center: new google.maps.LatLng(-26.667096, 134.033203),
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        disableDefaultUI: true,
        disableDoubleClickZoom: true
    };
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

    circleOptions = {
        //fillColor: "#5e7a00",
        fillColor: "#fba317",
        fillOpacity: 0.5
    };

    currentCircleOptions = {
        //fillColor: "#deb406",
        fillColor: "#00a5e2",
        fillOpacity: 0.5
    };

    infoboxbackground = "url('/Resources/desktop/img/map/infobox.png') no-repeat";
    if (Browser.Version() < 9) {
        infoboxbackground = "url('/Resources/desktop/img/map/ie_infobox.png') no-repeat";
    } 
    infowindow = new InfoBox({
        boxStyle: {
            background: infoboxbackground,
            opacity: 1,
            width: "504px",
            height: "287px"
        },
        closeBoxURL: "",
        maxWidth: "504px",
        alignBottom: true,
        pixelOffset: new google.maps.Size(-92, 18),
        infoBoxClearance: new google.maps.Size(50, 50),
        zIndex: 100
    });
    google.maps.event.addListener(map, 'click', function () {
        infowindow.close();
    });

    placetooltip = new InfoBox({
        boxStyle: {
            background: "url('/Resources/desktop/img/map/tooltip.png') no-repeat",
            opacity: 1,
            width: "186px",
            height: "69px"
        },
        disableAutoPan: true,
        enableEventPropagation: true,
        closeBoxURL: "",
        maxWidth: "100px",
        alignBottom: true,
        pixelOffset: new google.maps.Size(15, 10),
        zIndex: 99
    });

    // initialize all of the markers and circles
    $managerList = $('#manager-drawer > ul');

    $.each(managerData, function (i, manager) {
        $managerList.append('<li class="' + i + '" ><a href="#" onclick="setCurrentManager(\'' + i + '\'); return false;"><div class="image"><img src="' + manager.imageLarge + '"/></div><div class="managerInfo"><span class="name">' + manager.firstName + ' ' + manager.lastName + '</span><span class="location">' + manager.regionLong + '</span></div></a></li>');
    });

    // setup click handlers for zoom
    $('#zoom-controls .zoomout').click(function () {
        fitAllCurrent();
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        return false;
    });

    $('#zoom-controls .zoomin').click(function () {
        zoomToCurrent();
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        return false;
    });

    var manager = getQueryString()["m"];
    if (manager != undefined) {
        setCurrentManager(manager);
    }


});
    
    // set the current location to the given index for the current manager
    function setCurrentLocation(id) {
        currentLocation = id;

        var currentManagerObj = managerData[currentManager];
        var location = currentManagerObj.locations[id];
        map.panTo(location.point);
        map.setZoom(8);
        $('#zoom-controls .zoomout').removeClass('active');
        $('#zoom-controls .zoomin').addClass('active');


        var nextIndex = getNextLocationIndex();
        var prevIndex = getPreviousLocationIndex();
        var infowindownav = '<div id="infobox-content" class="clfx">'
                + '<div class="info">'
                + '<span class="imageWrap"><img src="' + currentManagerObj.imageSmall + '"/></span>'
                + '<a class="email" href="mailto:' + currentManagerObj.email + '">Email ' + currentManagerObj.firstName + '</a>'
                + '<div class="phone"><a href="callto://' + formatPhoneForSkype(currentManagerObj.phone) + '">' + currentManagerObj.phone + '</a></div>'
                + '</div>'
                + '<div class="infobox-content">'
                + '<div class="header">'
                + '<h2>' + location.suburb + '</h2>'
                + '<div class="controls">'
                + (prevIndex != null ? '<a href="#" class="prev" onclick="javascript:goToPrevious(); return false;">&lt;</a>' : '<a class="prev inactive">&nbsp;</a>')
                + (nextIndex != null ? '<a href="#" class="next" onclick="javascript:goToNext(); return false;">&gt;</a>' : '<a class="next inactive">&nbsp;</a>')
                + '<span class="closeBtn" onclick="infowindow.close(); return false;">Close</span></div>'
                + '</div>'
                + '<span class="message">"' + location.message + '"</span>'
                + '<span class="date">Posted ' + location.date + '</span>'
                + '</div>'
                + '</div>';
        infowindow.setContent(infowindownav);
        infowindow.open(map, location.marker);
        infowindow.locationid = id;

        // highlight the current circle
        /*var locations = managerData[currentManager].locations;
        for (j = 0; j < locations.length; j++) {
            if (j != currentLocation) {
                locations[j].circle.setOptions(circleOptions);
            } else {
                locations[j].circle.setOptions(currentCircleOptions);
            }
        }*/

        // update the next and previous controls
        /*$prevLocation = $('#previousLocationButton');
        $nextLocation = $('#nextLocationButton');
        $prevLocation.text(getNameOrEmpty(getPreviousLocationIndex()));
        $nextLocation.text(getNameOrEmpty(getNextLocationIndex()));*/

        $prevLocation = $('#previousLocationButton');
        $nextLocation = $('#nextLocationButton');

        if (getPreviousLocationIndex() == null) {
            $prevLocation.addClass('disabled');
        } else {
            $prevLocation.removeClass('disabled');
        }

        if (getNextLocationIndex() == null) {
            $nextLocation.addClass('disabled');
        } else {
            $nextLocation.removeClass('disabled');
        }
        
        //Refresh for next and previous buttons
        //Cufon.refresh('#infobox-content h2');
    }

    // set the current manager to the given id
    function setCurrentManager(id) {

        // close the drawer
        $managerClose = $('#managerClose').click();

        // clear the state for the old manager
        infowindow.close();
        if (currentManager != '') {

            // reset the states of all circles and hide markers that don't need to be shown
            var oldManager = managerData[currentManager];
            for (j = 0; j < oldManager.locations.length; j++) {
                var location = oldManager.locations[j];
                location.marker.setMap(null);
                location.circle.setMap(null);
                //location.circle.setOptions(circleOptions);
            }
        }

        // setup the new manager
        currentManager = id;        
        var manager = managerData[id];

        if (manager.locations != undefined) {
            moveToCurrentManager();
        } else {

        // first time viewing this manager, fetch the data
        $.get('/MapManager/TripMarker/LocationData?user=' + id, function (data) {
            manager.locations = eval(data);

            for (j = 0; j < manager.locations.length; j++) {
                var location = manager.locations[j];

                location.point = new google.maps.LatLng(location.latitude, location.longitude);
                location.marker = new google.maps.Marker({
                    position: location.point,
                    map: null,
                    //title: location.suburb,
                    locationid: j,
                    locationname: location.suburb,
                    icon: '/Resources/desktop/img/map/pin.png'
                    /*shadow: '/Resources/desktop/img/map/shadow.png'*/
                });
                location.circle = new google.maps.Circle({
                    strokeWeight: 0,
                    //fillColor: "#657820",
                    fillColor: "#fba317",
                    fillOpacity: 0.5,
                    map: null,
                    center: location.point,
                    radius: 30000
                });
                google.maps.event.addListener(location.marker, 'click', function () {
                    setCurrentLocation(this.locationid);
                });
                // add listeners for tooltips
                google.maps.event.addListener(location.marker, 'mouseover', function () {

                    if (this.locationid != infowindow.locationid) {
                        placetooltip.setContent('<div class="tooltip">' + this.locationname + '</div>');
                        placetooltip.open(map, this);
                    }
                });
                google.maps.event.addListener(location.marker, 'mouseout', function () {
                    placetooltip.close();
                });
            }

            // color the current point differently
            manager.locations[0].circle.setOptions(currentCircleOptions);
            manager.locations[0].marker.setIcon('/Resources/desktop/img/map/pin_current.png');

            moveToCurrentManager();
        });
        }
    }

    // move the camera to and draw the markers for the current manager
    function moveToCurrentManager() {
        var currentManagerObj = managerData[currentManager];

        /*$managerName = $('#managerName');
        $managerName.html(currentManagerObj.firstName);

        $managerLocation = $('#managerLocation');
        $managerLocation.html('<span class="map ' + currentManager + '">&nbsp;</span><span class="text">' + currentManagerObj.region + '</span>');*/

        $managerName = $('#managerName');
        $nextLocation = $('#nextLocation');

        $managerName.css({ opacity: 0 }); //.fadeOut(400);
        $nextLocation.fadeOut(400);
        
        // Relocate to newly selected manager
        //map.panTo(managerData.managers[id].locations[managerData.managers[id].locations.length - 1].point);
        //map.setZoom(8);
        currentLocation = 0;
        smoothZoom(map, 5, function () {
            setTimeout(function () {
                map.panTo(managerData[currentManager].locations[currentLocation].point);
                setTimeout(function () {
                    var manager = managerData[currentManager];
                    for (j = 0; j < manager.locations.length; j++) {
                        var location = manager.locations[j];
                        location.marker.setMap(map);
                        location.circle.setMap(map);
                    }

                    smoothZoom(map, 8, function () {
                        $managerName.attr('src', currentManagerObj.nameImagePath).attr('alt', currentManagerObj.firstName + ' ' + currentManagerObj.lastName);
                        $managerName.animate({ opacity: 1 }, { duration: 400 }); //.fadeIn(400);

                        setCurrentLocation(currentLocation);

                        buildMapNav();
                        setupFutureLocation();

                        // set the zoom mode to zoomed in
                        $('#zoom-controls .zoomout').removeClass('active');
                        $('#zoom-controls .zoomin').addClass('active');
                    });
                }, 500);
            }, 500);
        });
    }

    // zoom in and out one step at a time
    /*function smoothZoom(map, max, callback) {
        var cnt = map.getZoom();
        if (cnt == max) {
            if (callback != null) {
                callback();
            }
        } else {
            z = google.maps.event.addListener(map, 'zoom_changed', function (event) {
                google.maps.event.removeListener(z);
                map.setZoom(cnt + (max > cnt ? 1 : -1));
                self.smoothZoom(map, max, callback);
            });
            setTimeout(function () { map.setZoom(cnt) }, 150); // Change the last number to change the zoom speed
        }
    }*/

    // smooth zoom doesn't work on slower systems
    function smoothZoom(map, max, callback) {
        map.setZoom(max);
        if (callback != null) {
            callback();
        }
    }

    // return the name of the location at the given index for the current manager (or empty string if none)
    function getNameOrEmpty(index) {
        if (index != null) {
            return getLocationForCurrentManager(index).suburb;
        } else {
            return "";
        }
    }

    // get the index of the previous location for the current manager (or null if none)
    function getPreviousLocationIndex() {
        return currentLocation + 1 == managerData[currentManager].locations.length ? null : currentLocation + 1;
    }

    // get the index of the next location for the current manager (or null if none)
    function getNextLocationIndex() {
        return currentLocation - 1 < 0 ? null : currentLocation - 1;
    }

    // return the location at the given index for the current manager
    function getLocationForCurrentManager(index) {
        return managerData[currentManager].locations[index];
    }

    // set the current location to the previous location for current manager
    function goToPrevious() {
        var prevId = getPreviousLocationIndex();
        if (prevId != null) {
            setCurrentLocation(prevId);
        }
    }

    // set the current location to the next location for current manager
    function goToNext() {
        var nextId = getNextLocationIndex();
        if (nextId != null) {
            setCurrentLocation(nextId);
        }
    }

    // build the dropdown list of locations for the current manager
    function buildMapNav() {
        var $list = $('#mapNav');
        $list.find('li').remove();

        var manager = managerData[currentManager];
        for (j = Math.min(10, manager.locations.length) - 1; j >= 0; j--) {
            var location = manager.locations[j];
            $list.prepend('<li onclick="setCurrentLocation(' + j + ')">' + location.suburb + ', ' + location.state + '</li>');
        }
    }

    // setup the future location for the current manager
    function setupFutureLocation() {
        var currentManagerObj = managerData[currentManager];
        if (currentManagerObj.nextSuburb != "") {
            $('#nextLocation').text('My next visit will be ' + currentManagerObj.nextSuburb + ', ' + currentManagerObj.nextState).fadeIn(400);
        } else {
            $('#nextLocation').text('');
        }
    }

    // zoom out to fit all points on screenarriving
    function fitAllCurrent() {
        infowindow.close();
        var latlngbounds = new google.maps.LatLngBounds();
        $.each(managerData[currentManager].locations, function (i, data) {
            latlngbounds.extend(data.point);
        });
        map.fitBounds(latlngbounds);
        //map.setZoom(map.getZoom() + 1);
    }

    // zoom to the currently selected point
    function zoomToCurrent() {
        var loc = managerData[currentManager].locations[currentLocation];
        map.panTo(loc.point);
        map.setZoom(8);
        infowindow.open(map, loc.marker);
    }

    function getQueryString() {
        var result = {}, queryString = location.search.substring(1),
      re = /([^&=]+)=([^&]*)/g, m;

        while (m = re.exec(queryString)) {
            result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        }

        return result;
    }

    function formatPhoneForSkype(num) {
        return num.replace(/ /g, '').replace(/^0/, '+61'); 
    }