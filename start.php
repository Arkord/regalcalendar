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
    <script>
    $(function() {
        $('#rCalendar').RegalCalendar();
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
                <li class="nav-item">
                    <a class="nav-link" href="index.php">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item active">
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
                    <h1>Quick Start</h1>
                </div>

                <p>To show your calendar add a <code>&lt;div&gt;</code> tag with a <code>&lt;span&gt;</code> for each
                    event you want to show.</p>
                <p>Especify the information of your event with: <code>data-title</code> title of the event,
                    <code>data-location</code> location of the event, <code>data-date</code> date of the event,
                    <code>data-time</code> time of the event, <code>data-icon</code> icon of the event (see the main
                    page reference), <code>data-customText</code> custom text below day number.</p>
                <hr />

                <div class="row">
                    <div class="col-md-12">
                        <div id="rCalendar" class="regalcalendar">
                            <span class="event" data-title="Event 1"
                                data-location="Buenos Aires St, Guadalupe,Durango,Mexico" data-date="24/12/2019"
                                data-time="16:00" data-icon="fas fa-holly-berry" data-types="address"
                                data-preview="Christmas Eve">Excepteur sint occaecat
                                cupidatat non proident, sunt in culpa qui Lorem ipsum dolor sit amet, nostrud
                                exercitation
                                ullamco laboris nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                            <span class="event" data-title="Event 2" data-location="France" data-date="13/12/2019"
                                data-time="12:00" data-icon="fas fa-baseball-ball" data-types="country"
                                data-preview="baseball-game">Excepteur sint occaecat cupidatat non proident,
                                sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                            <span class="event" data-title="Event 3"
                                data-location="Blvrd Francisco Villa Km. 1, Máximo Gámiz, 34230 Durango, Dgo"
                                data-date="11/01/2020" data-time="16:00" data-icon="fa fa-baby" data-types="address"
                                data-preview="Baby shower">Excepteur sint occaecat
                                cupidatat non proident, sunt in culpa qui Lorem ipsum dolor sit amet, nostrud
                                exercitation
                                ullamco laboris nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                            <span class="event" data-title="Event 4" data-location="Australia" data-date="29/01/2020"
                                data-time="12:00" data-icon="fas fa-user-md" data-types="country"
                                data-preview="medical appointment">Excepteur sint occaecat cupidatat non proident,
                                sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                            <span class="event" data-title="Event 5"
                                data-location="Blvrd Francisco Villa 1200, Jardines de Durango, 34200 Durango, Dgo"
                                data-date="04/02/2020" data-time="16:00" data-icon="fas fa-school" data-types="address"
                                data-preview="Start classes">Excepteur sint occaecat
                                cupidatat non proident, sunt in culpa qui Lorem ipsum dolor sit amet, nostrud
                                exercitation
                                ullamco laboris nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                            <span class="event" data-title="Event 6" data-location="China" data-date="18/02/2020"
                                data-time="12:00" data-icon="fas fa-birthday-cake" data-types="country"
                                data-preview="Birthday">Excepteur sint occaecat cupidatat non proident,
                                sunt in culpa qui Lorem ipsum dolor sit amet, nostrud exercitation ullamco laboris
                                nisi ut aliqu se cillum dolore eu fugiat nulla pariatur</span>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <pre class="prettyprint linenums"><code>&lt;head&gt;
    &lt;!-- RegalCalendar main stylesheet --&gt;
    &lt;link href="css/RegalCalendar.css" rel="stylesheet" /&gt;
    &lt;!-- Fontawesome icons stylesheet --&gt;
    &lt;link href="css/all.min.css" rel="stylesheet" /&gt;
    &lt;!-- Mapbox stylesheet, required for display maps --&gt;
    &lt;!-- Mapbox javascript, required for display maps --&gt;
    &lt;script src="js/jquery-3.4.1.min.js"&gt;&lt;/script&gt;
    &lt;script src="js/RegalCalendar.js"&gt;&lt;/script&gt;
    &lt;script&gt;
        $(function() {
            $('#rCalendar').RegalCalendar();
        });
    &lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div id="rCalendar" class="regalcalendar"&gt;
        &lt;span 
            class="event" 
            data-title="Event 2" 
            data-location="France" 
            data-date="11/01/2020" 
            data-time="12:00" 
            data-icon="fa fa-award" 
            data-types="country" 
            data-preview="Award"&gt;
            &lt;!-- Event description --&gt;
        &lt;/span&gt;
    &lt;/div&gt;
&lt;/body&gt;</code>
                        </pre>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js"></script>
</body>

</html>