//Compass Scripts

    function onSuccess(heading) {
        CompassDiv.innerHTML = '<span style="font-size: 1.5em; text-align: center;">You Are Heading:</span><br /> ' + heading.magneticHeading.toFixed() + '&#176;';

        //Calculate Directional Heading
        var direction
        if ((heading.magneticHeading >= 0) && (heading.magneticHeading <= 20)) {
            direction = 'N';
        } else if ((heading.magneticHeading >= 21) && (heading.magneticHeading <= 69)) {
            direction = 'NE';
        } else if ((heading.magneticHeading >= 70) && (heading.magneticHeading <= 110)) {
            direction = 'E';
        } else if ((heading.magneticHeading >= 111) && (heading.magneticHeading <= 159)) {
            direction = 'SE';
        } else if ((heading.magneticHeading >= 160) && (heading.magneticHeading <= 200)) {
            direction = 'S';
        } else if ((heading.magneticHeading >= 201) && (heading.magneticHeading <= 250)) {
            direction = 'SW';
        } else if ((heading.magneticHeading >= 251) && (heading.magneticHeading <= 290)) {
            direction = 'W';
        } else if ((heading.magneticHeading >= 291) && (heading.magneticHeading <= 340)) {
            direction = 'NW';
        } else if ((heading.magneticHeading >= 341) && (heading.magneticHeading <= 360)) {
            direction = 'N';
        } else {
            direction = '';
        }

        //Show Directional Heading
        switch (direction) {
            case 'N': MagDiv.innerHTML = '<span style="padding-top: 1em; font-size: 5em; text-align: center; font-weight: bold;">N</span>';
                break;

            case 'NE': MagDiv.innerHTML = '<span style="padding-top: 1em; font-size: 5em; text-align: center; font-weight: bold;">NE</span>';
                break;

            case 'E': MagDiv.innerHTML = '<span style="padding-top: 1em; font-size: 5em; text-align: center; font-weight: bold;">E</span>';
                break;

            case 'SE': MagDiv.innerHTML = '<span style="padding-top: 1em; font-size: 5em; text-align: center; font-weight: bold;">SE</span>';
                break;

            case 'S': MagDiv.innerHTML = '<span style="padding-top: 1em; font-size: 5em; text-align: center; font-weight: bold;">S</span>';
                break;

            case 'SW': MagDiv.innerHTML = '<span style="padding-top: 1em; font-size: 5em; text-align: center; font-weight: bold;">SW</span>';
                break;

            case 'W': MagDiv.innerHTML = '<span style="padding-top: 1em; font-size: 5em; text-align: center; font-weight: bold;">W</span>';
                break;

            case 'NW': MagDiv.innerHTML = '<span style="padding-top: 1em; font-size: 5em; text-align: center; font-weight: bold;">NW</span>';
                break;

            default: MagDiv.innerHTML = '<span style="padding-top: 1em; font-size: 1em";>Calculating Heading...</span>'
        }
    };

    function onError(compassError) {
        CompassDiv.innerHTML = 'Compass error: ' + compassError.code;
    };

    var options = {
        frequency: 1000
    }; // Update every 1 second