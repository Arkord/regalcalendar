<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <title>Regal Calendar</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Regal Calendar" />
    <meta name="author" content="Florentino Mejía" />
    <link href="css/bootstrap.min.css" rel="stylesheet" />
    <link href="css/all.min.css" rel="stylesheet" />
    <link href="css/RegalCalendar.css" rel="stylesheet" />
    <link href="css/code.css" rel="stylesheet" />
    <script src="js/jquery-3.4.1.min.js"></script>
    <script src="js/RegalCalendar.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <style>
    section {
        margin-top: 40px;
        margin-bottom: 40px;
        ;
    }
    </style>
    <script type="text/javascript">
    $(function() {
        $('#rCalendar').RegalCalendar({
            theme: '#ff8a00',
            modal: false,
            minDate: new Date(2020, 12 - 1, 1),
            maxDate: new Date(2028, 12 - 1, 31),
            tooltip: 'bootstrap',
            mapLink: 'map'
        });
    });
    </script>
</head>

<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">RegalCalendar</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <a class="nav-link" href="index.php">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="start.php">Quick start</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="modal.php">Modal calendar</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="preview.php">Preview text</a>
                </li>
            </ul>
        </div>
    </nav>

    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="page-header">
                    <h1>Regal Calendar</h1>
                </div>
                <div class="col-md-12" <p><strong>Regal Calendar</strong> is a component that allows you make known your
                    events every day, let your visitors see when your event starts. Allow your visitors see the place,
                    via map where the event occurs. Set the time and automatically
                    will appear a <span class="text-info">coun down.</span>. Write the <span
                        class="text-info">description of your event</span> and a short text for <span
                        class="text-info">preview</span>.Let you render your events using <span
                        class="text-info">fontawesome icons</span>,
                    Metro style. Pick a <span class="text-info">color</span> you want and the calendar automatically
                    sets their components with the color.</p>
                    <p><span class="text-info">all in a simple manner!</span></p>
                    <hr />

                    <?php
                        $year = date("Y"); 
                    ?>

                    <div class="row">
                        <div class="col-md-6">
                            <div id="rCalendar" class="regalcalendar">
                                <span class="event" data-title="Event 1"
                                    data-location="Buenos Aires St, Guadalupe,Durango,Mexico"
                                    data-date="24/12/<?php echo $year - 1; ?>" data-time="16:00"
                                    data-icon="fas fa-holly-berry" data-types="address"
                                    data-preview="Christmas Eve">Excepteur sint occaecat
                                    cupidatat non proident, sunt in culpa qui Lorem ipsum dolor sit amet, nostrud
                                    exercitation
                                    ullamco laboris nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 2" data-location="France"
                                    data-date="13/12/<?php echo $year - 1; ?>" data-time="12:00"
                                    data-icon="fas fa-baseball-ball" data-types="country"
                                    data-preview="baseball-game">Excepteur sint occaecat cupidatat non proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 1"
                                    data-location="Buenos Aires St, Guadalupe,Durango,Mexico"
                                    data-date="24/01/<?php echo $year; ?>" data-time="16:00"
                                    data-icon="fas fa-holly-berry" data-types="address"
                                    data-preview="Festival">Excepteur sint occaecat
                                    cupidatat non proident, sunt in culpa qui Lorem ipsum dolor sit amet, nostrud
                                    exercitation
                                    ullamco laboris nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 2" data-location="France"
                                    data-date="09/01/<?php echo $year; ?>" data-time="12:00"
                                    data-icon="fas fa-baseball-ball" data-types="country"
                                    data-preview="baseball-game">Excepteur sint occaecat cupidatat non proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 3"
                                    data-location="Blvrd Francisco Villa Km. 1, Máximo Gámiz, 34230 Durango, Dgo"
                                    data-date="11/01/<?php echo $year; ?>" data-time="16:00" data-icon="fa fa-baby"
                                    data-types="address" data-preview="Baby shower">Excepteur sint occaecat
                                    cupidatat non proident, sunt in culpa qui Lorem ipsum dolor sit amet, nostrud
                                    exercitation
                                    ullamco laboris nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 4" data-location="Australia"
                                    data-date="26/01/<?php echo $year; ?>" data-time="12:00" data-icon="fas fa-user-md"
                                    data-types="country" data-preview="medical appointment">Excepteur sint occaecat
                                    cupidatat non proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 5"
                                    data-location="Blvrd Francisco Villa 1200, Jardines de Durango, 34200 Durango, Dgo"
                                    data-date="04/02/<?php echo $year; ?>" data-time="16:00" data-icon="fas fa-school"
                                    data-types="address" data-preview="Start classes">Excepteur sint occaecat
                                    cupidatat non proident, sunt in culpa qui Lorem ipsum dolor sit amet, nostrud
                                    exercitation
                                    ullamco laboris nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 6" data-location="China"
                                    data-date="18/02/<?php echo $year; ?>" data-time="12:00"
                                    data-icon="fas fa-birthday-cake" data-types="country"
                                    data-preview="Birthday">Excepteur sint occaecat cupidatat non proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 7" data-location="Guadalajara, Jalisco"
                                    data-date="04/03/<?php echo $year; ?>" data-time="18:00" data-icon="fas fa-ankh"
                                    data-types="place" data-preview="preview text">Excepteur sint occaecat cupidatat non
                                    proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 8" data-location="San Luis de Cordero, Durango"
                                    data-date="14/03/<?php echo $year; ?>" data-time="18:00" data-icon="fas fa-atom"
                                    data-types="place" data-preview="preview text">Excepteur sint occaecat cupidatat non
                                    proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 9" data-location="Monterrey, Nuevo Leon"
                                    data-date="30/03/<?php echo $year; ?>" data-time="10:00" data-icon="fas fa-bolt"
                                    data-types="place" data-preview="preview text">Excepteur sint occaecat cupidatat non
                                    proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 10" data-location="Tijuana, Baja California"
                                    data-date="19/03/<?php echo $year; ?>" data-time="11:00"
                                    data-icon="fas fa-basketball-ball" data-types="place"
                                    data-preview="preview text">Excepteur sint occaecat cupidatat non proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 11" data-location="San Diego, California"
                                    data-date="01/03/<?php echo $year; ?>" data-time="07:00" data-icon="fas fa-bahai"
                                    data-types="place" data-preview="preview text">Excepteur sint occaecat cupidatat non
                                    proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 12" data-location="Tecate, Baja California"
                                    data-date="04/04/<?php echo $year; ?>" data-time="18:00"
                                    data-icon="fas fa-book-medical" data-types="place"
                                    data-preview="preview text">Excepteur sint occaecat cupidatat non proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 13" data-location="Primo Tapia, Baja California"
                                    data-date="14/04/<?php echo $year; ?>" data-time="18:00" data-icon="fas fa-bong"
                                    data-types="place" data-preview="preview text">Excepteur sint occaecat cupidatat non
                                    proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 14" data-location="Rosarito, Baja California"
                                    data-date="30/04/<?php echo $year; ?>" data-time="10:00" data-icon="fas fa-bone"
                                    data-types="place" data-preview="preview text">Excepteur sint occaecat cupidatat non
                                    proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 15" data-location="Mexicali, Baja California"
                                    data-date="19/04/<?php echo $year; ?>" data-time="11:00" data-icon="fas fa-bus"
                                    data-types="place" data-preview="preview text">Excepteur sint occaecat cupidatat non
                                    proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 16" data-location="Ensenada, Baja California"
                                    data-date="01/04/<?php echo $year; ?>" data-time="07:00" data-icon="fas fa-chair"
                                    data-types="place" data-preview="preview text">Excepteur sint occaecat cupidatat non
                                    proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 17" data-location="Santiago Papasquiaro, Durango"
                                    data-date="04/05/<?php echo $year; ?>" data-time="18:00" data-icon="fas fa-cheese"
                                    data-types="place" data-preview="preview text">Excepteur sint occaecat cupidatat non
                                    proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 18" data-location="Vicente Guerrero, Durango"
                                    data-date="14/05/<?php echo $year; ?>" data-time="18:00" data-icon="fas fa-chess"
                                    data-types="place" data-preview="preview text">Excepteur sint occaecat cupidatat non
                                    proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 19" data-location="Nazas, Durango"
                                    data-date="30/05/<?php echo $year; ?>" data-time="10:00" data-icon="fas fa-coins"
                                    data-types="place" data-preview="preview text">Excepteur sint occaecat cupidatat non
                                    proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 20" data-location="El Oro, Durango"
                                    data-date="19/05/<?php echo $year; ?>" data-time="11:00"
                                    data-icon="fas fa-cloud-sun-rain" data-types="place"
                                    data-preview="preview text">Excepteur sint occaecat cupidatat non proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 21" data-location="Mapimi, Durango"
                                    data-date="01/05/<?php echo $year; ?>" data-time="07:00" data-icon="fas fa-coffee"
                                    data-types="place" data-preview="preview text">Excepteur sint occaecat cupidatat non
                                    proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 22" data-location="England"
                                    data-date="04/06/<?php echo $year; ?>" data-time="18:00" data-icon="fas fa-dice-d20"
                                    data-types="country" data-preview="preview text">Excepteur sint occaecat cupidatat
                                    non proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 23" data-location="Peru"
                                    data-date="14/06/<?php echo $year; ?>" data-time="18:00" data-icon="fas fa-cubes"
                                    data-types="country" data-preview="preview text">Excepteur sint occaecat cupidatat
                                    non proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 24" data-location="Mexico"
                                    data-date="30/06/<?php echo $year; ?>" data-time="10:00" data-icon="fas fa-crown"
                                    data-types="country" data-preview="preview text">Excepteur sint occaecat cupidatat
                                    non proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 25" data-location="Chile"
                                    data-date="19/06/<?php echo $year; ?>" data-time="11:00"
                                    data-icon="fas fa-cloud-sun-rain" data-types="country"
                                    data-preview="preview text">Excepteur sint occaecat cupidatat non proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 26" data-location="Brazil"
                                    data-date="01/06/<?php echo $year; ?>" data-time="07:00" data-icon="fas fa-democrat"
                                    data-types="country" data-preview="preview text">Excepteur sint occaecat cupidatat
                                    non proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 27" data-location="Bolivia"
                                    data-date="04/07/<?php echo $year; ?>" data-time="18:00"
                                    data-icon="fas fa-diagnoses" data-types="country"
                                    data-preview="preview text">Excepteur sint occaecat cupidatat non proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 28" data-location="Ecuador"
                                    data-date="14/07/<?php echo $year; ?>" data-time="18:00"
                                    data-icon="fas fa-dot-circle" data-types="country"
                                    data-preview="preview text">Excepteur sint occaecat cupidatat non proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 29" data-location="Venezuela"
                                    data-date="30/07/<?php echo $year; ?>" data-time="10:00" data-icon="fas fa-dove"
                                    data-types="country" data-preview="preview text">Excepteur sint occaecat cupidatat
                                    non proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 30" data-location="Colombia"
                                    data-date="19/07/<?php echo $year; ?>" data-time="11:00" data-icon="fas fa-drum"
                                    data-types="country" data-preview="preview text">Excepteur sint occaecat cupidatat
                                    non proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 31" data-location="Honduras"
                                    data-date="01/07/<?php echo $year; ?>" data-time="07:00" data-icon="fas fa-dumbbell"
                                    data-types="country" data-preview="preview text">Excepteur sint occaecat cupidatat
                                    non proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 32" data-location="Guatemala"
                                    data-date="04/08/<?php echo $year; ?>" data-time="18:00" data-icon="fas fa-egg"
                                    data-types="country" data-preview="preview text">Excepteur sint occaecat cupidatat
                                    non proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 33" data-location="Panama"
                                    data-date="14/08/<?php echo $year; ?>" data-time="18:00" data-icon="fas fa-eraser"
                                    data-types="country" data-preview="preview text">Excepteur sint occaecat cupidatat
                                    non proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 34" data-location="Costa Rica"
                                    data-date="30/08/<?php echo $year; ?>" data-time="10:00"
                                    data-icon="fas fa-eye-dropper" data-types="country"
                                    data-preview="preview text">Excepteur sint occaecat cupidatat non proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 35" data-location="Cuba"
                                    data-date="19/08/<?php echo $year; ?>" data-time="11:00" data-icon="fas fa-feather"
                                    data-types="country" data-preview="preview text">Excepteur sint occaecat cupidatat
                                    non proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 36" data-location="Canada"
                                    data-date="01/08/<?php echo $year; ?>" data-time="07:00" data-icon="fas fa-fire"
                                    data-types="country" data-preview="preview text">Excepteur sint occaecat cupidatat
                                    non proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 37" data-location="Guatemala"
                                    data-date="04/09/<?php echo $year; ?>" data-time="18:00" data-icon="fas fa-fish"
                                    data-types="country" data-preview="preview text">Excepteur sint occaecat cupidatat
                                    non proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 38" data-location="Germany"
                                    data-date="14/09/<?php echo $year; ?>" data-time="18:00"
                                    data-icon="fas fa-fist-raised" data-types="country"
                                    data-preview="preview text">Excepteur sint occaecat cupidatat non proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 39" data-location="France"
                                    data-date="30/09/<?php echo $year; ?>" data-time="10:00"
                                    data-icon="fas fa-fire-extinguisher" data-types="country"
                                    data-preview="preview text">Excepteur sint occaecat cupidatat non proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 40" data-location="Spain"
                                    data-date="19/09/<?php echo $year; ?>" data-time="11:00"
                                    data-icon="fas fa-football-ball" data-types="country"
                                    data-preview="preview text">Excepteur sint occaecat cupidatat non proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 41" data-location="Portugal"
                                    data-date="01/09/<?php echo $year; ?>" data-time="07:00"
                                    data-icon="fas fa-paper-plane" data-types="country"
                                    data-preview="preview text">Excepteur sint occaecat cupidatat non proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 42" data-location="Austria"
                                    data-date="04/10/<?php echo $year; ?>" data-time="18:00" data-icon="fas fa-moon"
                                    data-types="country" data-preview="preview text">Excepteur sint occaecat cupidatat
                                    non proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 43" data-location="Rusia"
                                    data-date="14/10/<?php echo $year; ?>" data-time="18:00" data-icon="fas fa-gifts"
                                    data-types="country" data-preview="preview text">Excepteur sint occaecat cupidatat
                                    non proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 44" data-location="Italia"
                                    data-date="30/10/<?php echo $year; ?>" data-time="10:00"
                                    data-icon="fas fa-graduation-cap" data-types="country"
                                    data-preview="preview text">Excepteur sint occaecat cupidatat non proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 45" data-location="Grecia"
                                    data-date="19/10/<?php echo $year; ?>" data-time="11:00" data-icon="fas fa-hammer"
                                    data-types="country" data-preview="preview text">Excepteur sint occaecat cupidatat
                                    non proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 46" data-location="Egypt"
                                    data-date="01/10/<?php echo $year; ?>" data-time="07:00"
                                    data-icon="fas fa-hamburger" data-types="country"
                                    data-preview="preview text">Excepteur sint occaecat cupidatat non proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 47" data-location="Argelia"
                                    data-date="04/11/<?php echo $year; ?>" data-time="18:00" data-icon="fas fa-hamsa"
                                    data-types="country" data-preview="preview text">Excepteur sint occaecat cupidatat
                                    non proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 48" data-location="Libia"
                                    data-date="14/11/<?php echo $year; ?>" data-time="18:00" data-icon="fas fa-hippo"
                                    data-types="country" data-preview="preview text">Excepteur sint occaecat cupidatat
                                    non proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 49" data-location="Marruecos"
                                    data-date="30/11/<?php echo $year; ?>" data-time="10:00"
                                    data-icon="fas fa-hourglass" data-types="country"
                                    data-preview="preview text">Excepteur sint occaecat cupidatat non proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 50" data-location="Tunez"
                                    data-date="19/11/<?php echo $year; ?>" data-time="11:00"
                                    data-icon="fas fa-house-damage" data-types="country"
                                    data-preview="preview text">Excepteur sint occaecat cupidatat non proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 51" data-location="Sudafrica"
                                    data-date="01/11/<?php echo $year; ?>" data-time="07:00" data-icon="fas fa-hiking"
                                    data-types="country" data-preview="preview text">Excepteur sint occaecat cupidatat
                                    non proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 52" data-location="South Corea"
                                    data-date="04/12/<?php echo $year; ?>" data-time="18:00" data-icon="fas fa-hotdog"
                                    data-types="country" data-preview="preview text">Excepteur sint occaecat cupidatat
                                    non proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 56" data-location="North Corea"
                                    data-date="14/12/<?php echo $year; ?>" data-time="18:00" data-icon="fas fa-key"
                                    data-types="country" data-preview="preview text">Excepteur sint occaecat cupidatat
                                    non proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 57" data-location="Mongolia"
                                    data-date="30/12/<?php echo $year; ?>" data-time="10:00"
                                    data-icon="fas fa-lightbulb" data-types="country"
                                    data-preview="preview text">Excepteur sint occaecat cupidatat non proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event58" data-location="Israel"
                                    data-date="19/12/<?php echo $year; ?>" data-time="11:00" data-icon="fas fa-meteor"
                                    data-types="country" data-preview="preview text">Excepteur sint occaecat cupidatat
                                    non proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                                <span class="event" data-title="Event 59" data-location="Iran"
                                    data-date="01/12/<?php echo $year; ?>" data-time="07:00" data-icon="fas fa-paw"
                                    data-types="country" data-preview="preview text">Excepteur sint occaecat cupidatat
                                    non proident,
                                    sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                    nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                            </div>
                        </div>
                        <div class="col-md-6 text-center " style="margin: 100px 0 ">
                            <div class="page-header ">
                                <h3>Browser compatibility</h2>
                            </div>
                            <img src="img/browsers.png " alt="browsers " />
                            <a href="https://www.iconfinder.com/PixelBuddha " target="_blank "
                                style="display: block; font-size: 8px; ">By PixelBuddha</a>
                        </div>
                    </div>

                    <div class="row ">
                        <div class="col-md-12 ">
                            <pre class="prettyprint linenums "><code>&lt;head&gt;
    &lt;!-- RegalCalendar main stylesheet --&gt;
    &lt;link href="css/RegalCalendar.css " rel="stylesheet " /&gt;
    &lt;!-- Fontawesome icons stylesheet --&gt;
    &lt;link href="css/all.min.css " rel="stylesheet " /&gt;
    &lt;script src="js/jquery-3.4.1.min.js "&gt;&lt;/script&gt;
    &lt;script src="js/RegalCalendar.js "&gt;&lt;/script&gt;
    &lt;script&gt;
        $(function() {
            $('#rCalendar').RegalCalendar();
        });
    &lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div id="rCalendar " class="regalcalendar "&gt;
        &lt;span 
            class="event " 
            data-title="Event 2 " 
            data-location="France " 
            data-date="11/01/<?php echo $year; ?> " 
            data-time="12:00 " 
            data-icon="fa fa-award " 
            data-types="country " 
            data-preview="Award "&gt;
            &lt;!-- Event description --&gt;
        &lt;/span&gt;
    &lt;/div&gt;
&lt;/body&gt;</code>
                            </pre>
                        </div>
                    </div>

                    <section id="features ">
                        <div class="page-header ">
                            <h1>Features</h1>
                        </div>
                        <ul>
                            <li>Easy integration</li>
                            <li>Responsive</li>
                            <li>Multiple events per day</li>
                            <li>Fontawesome icons integration </li>
                            <li>Any color you want</li>
                            <li>Event <code>count down</code></li>
                            <li>Location of your event via <code>map</code></li>
                            <li><code>5+ </code>tooltip styles</li>
                            <li>Modal option</li>
                            <li>Metro style</li>
                        </ul>
                    </section>

                    <section id="options ">
                        <div class="page-header ">
                            <h1>Options</h1>
                        </div>
                        <p><span class="label label-info ">Regal Calendar</span> has a set of options to customize its
                            appearance and functionality</p>
                        <table class="table table-bordered table-striped responsive-utilities ">
                            <thead>
                                <tr>
                                    <th>Option</th>
                                    <th>Description</th>
                                    <th>Default</th>
                                    <th>Values</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th><code>dayNames</code></th>
                                    <td class="is-visible ">The list of long day names</td>
                                    <td class="is-hidden ">[ "Sunday ", "Monday ", "Tuesday ", "Wednesday ", "Thursday
                                        ", "Friday ", "Saturday " ]</td>
                                    <td class="is-hidden "></td>
                                </tr>
                                <tr>
                                    <th><code>dayNamesMin</code></th>
                                    <td class="is-visible ">The list of minimised day names</td>
                                    <td class="is-hidden ">[ "Di ", "Lu ", "Ma ", "Me ", "Je ", "Ve ", "Sa " ]</td>
                                    <td class="is-hidden "></td>
                                </tr>
                                <tr>
                                    <th><code>dayNamesShort</code></th>
                                    <td class="is-visible ">The list of abbreviated day names</td>
                                    <td class="is-hidden ">[ "Sun ", "Mon ", "Tue ", "Wed ", "Thu ", "Fri ", "Sat " ]
                                    </td>
                                    <td class="is-hidden "></td>
                                </tr>
                                <tr>
                                    <th><code>dateFormat</code></th>
                                    <td class="is-visible ">Set the output date format</td>
                                    <td class="is-hidden ">dd/mm/yy</td>
                                    <td class="is-hidden ">dd/mm/yy = 26/11/1983, yy/mm/dd = 1983/11/26, ...</td>
                                </tr>
                                <tr>
                                    <th><code>theme</code></th>
                                    <td class="is-hidden ">Color combination</td>
                                    <td class="is-visible ">#00d4be
                                        <div
                                            style="width: 18px; height: 18px;background-color: #00d4be;display: inline-block;vertical-align: middle;border-radius: 50%; ">
                                        </div>
                                    </td>
                                    <td class="is-hidden ">Any color</td>
                                </tr>
                                <tr>
                                    <th><code>show</code></th>
                                    <td class="is-visible ">Tooltip show on</td>
                                    <td class="is-visible ">click</td>
                                    <td class="is-hidden ">click, mouseenter</td>
                                </tr>
                                <tr>
                                    <th><code>timeFormat</code></th>
                                    <td class="is-visible ">hour format</td>
                                    <td class="is-visible ">hrs</td>
                                    <td class="is-hidden ">'hrs' or 'ampm' (if you choose ampm you must still provide
                                        time in hrs format. If you provide 14:00, calendar will display 1:00pm)</td>
                                </tr>
                                <tr>
                                    <th><code>mapLink</code></th>
                                    <td class="is-visible ">Choose between map default icon or custom text</td>
                                    <td class="is-visible ">''</td>
                                    <td class="is-hidden ">custom text, like 'map'</td>
                                </tr>
                                <tr>
                                    <th><code>modal</code></th>
                                    <td class="is-hidden ">Choose whether the form appears in a modal window</td>
                                    <td class="is-hidden ">false</td>
                                    <td class="is-visible ">false, true</td>
                                </tr>
                                <tr>
                                    <th><code>tooltip</code></th>
                                    <td class="is-hidden ">Tooltip type</td>
                                    <td class="is-visible ">bootstrap</td>
                                    <td class="is-visible ">bootsrap, tipsy, light, dark, black, youtube, jtools</td>
                                </tr>
                                <tr>
                                    <th><code>tooltipPosition</code></th>
                                    <td class="is-hidden ">Position</td>
                                    <td class="is-visible ">bottom</td>
                                    <td class="is-visible ">bottom, top, left, right</td>
                                </tr>
                                <tr>
                                    <th><code>defaultDate</code></th>
                                    <td class="is-visible ">Default selected date</td>
                                    <td class="is-hidden "></td>
                                    <td class="is-visible ">A date</td>
                                </tr>
                                <tr>
                                    <th><code>mnDate</code></th>
                                    <td class="is-visible ">min date</td>
                                    <td class="is-hidden "></td>
                                    <td class="is-visible ">A date</td>
                                </tr>
                                <tr>
                                    <th><code>mxDate</code></th>
                                    <td class="is-visible ">max date</td>
                                    <td class="is-hidden "></td>
                                    <td class="is-visible ">A date</td>
                                </tr>
                            </tbody>
                        </table>
                        <div id="mail " class="mail "></div>
                    </section>
                </div>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js "></script>
</body>

</html>