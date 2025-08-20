/**
 * RegalCalendar.js v2.0.0
 *
 * Copyright (C) 2019  Florentino Mejía.
 * All rights reserved.
 *
 **/

(function ($) {
    $.fn.RegalCalendar = function (options) {
        var settings = $.extend({
            base: 'white',
            theme: '#00d4be',
            enter: 'fadeInUp',
            exit: 'fadeOutDown',
            animation: 'fadeInUp',
            show: 'click',
            modal: false,
            startWeek: 1,
            tooltipPosition: 'top',
            tooltip: 'bootstrap',
            defaultDate: null,
            mnDate: null,
            mxDate: null,
            timeFormat: 'hrs',
            mapLink: 'map',
            mapZoom: 14,
            dateFormat: "dd/mm/yy",
            dayNamesMin: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        }, options);

        var $this = $(this);
        var $events = $this.find('span.event');
        $this.addClass(settings.base);
        $this.css({ position: 'relative' });
        $this.on('mouseenter', 'a.ui-datepicker-next', function () {
            $this.data('dir', 'Next');
        });
        $this.on('mouseenter', 'a.ui-datepicker-prev', function () {
            $this.data('dir', 'Prev');
        });
        calendar = $this.datepicker({
            defaultDate: settings.defaultDate,
            minDate: settings.mnDate,
            maxDate: settings.mxDate,
            dateFormat: settings.dateFormat,
            dayNamesMin: settings.dayNamesMin,
            dayNames: settings.dayNames,
            dayNamesShort: settings.dayNamesShort,
            firstDay: settings.startWeek,
            hideIfNoPrevNext: true,
            showOtherMonths: true,
            onSelect: function (date, inst) {
                inst.inline = false;
                $(this).find(".ui-datepicker-calendar .ui-datepicker-current-day").removeClass("ui-datepicker-current-day").children().removeClass("ui-state-active");
                $(this).find(".ui-datepicker-calendar tbody a").each(function () {
                    if ($(this).text() == inst.selectedDay) {
                        $(this).addClass("ui-state-active");
                        $(this).parent().addClass("ui-datepicker-current-day");
                    }
                });
            },
            onChangeMonthYear: function (m, y, i) {
                setTimeout(function () {
                    setEvents($events, $this, settings.theme);
                    setTooltip($events, $this, settings.enter, settings.exit, settings.theme, settings.tooltip, settings.twitter, settings.tooltipPosition, settings.show, settings.timeFormat, settings.mapLink, settings.mapToken, settings.markerIcon, settings.mapZoom);
                    if (settings.animation) {
                        var direction = settings.animation.indexOf('rc') >= 0 ? $this.data('dir') : '';
                        $this.find('table.ui-datepicker-calendar, div.ui-datepicker-title').addClass(settings.animation + direction + ' animate');
                    }
                }, 0);
            }
        });

        $this.prepend('<span class="regal-prevyear_gray"></span><span class="regal-nextyear_gray"></span>');
        setEvents($events, $this, settings.theme);
        setTooltip($events, $this, settings.enter, settings.exit, settings.theme, settings.tooltip, settings.twitter, settings.tooltipPosition, settings.show, settings.timeFormat, settings.mapLink, settings.mapToken, settings.markerIcon, settings.mapZoom);

        $this.find('.regal-prevyear_gray').click(function () { $.datepicker._adjustDate($this, -1, 'Y'); });
        $this.find('.regal-nextyear_gray').click(function () { $.datepicker._adjustDate($this, +1, 'Y'); });

        if (settings.modal) {
            $this.addClass('modal-calendar');
            $('body').append('<div class="modal-bg"></div><div class="modal-wrapper"></div><div class="modal_switch"><i class="fa fa-calendar-alt"></i></div>');
            $this.appendTo('div.modal-wrapper');

            $(window).on('resize', function () {
                $('div.modal-wrapper').center();
            });

            $('body').on('click', 'div.modal_switch', function () {
                if (!$(this).data('on')) {
                    $('.modal-bg,div.modal-wrapper').fadeIn(1000);
                    $(this).data('on', true);
                    $('div.modal-wrapper').center();
                } else {
                    $('.modal-bg,div.modal-wrapper').fadeOut(1000);
                    $(this).data('on', false);
                }
            });
        }
        setTheme(settings.theme);
    }
})(jQuery);

(function ($) {
    $.fn.extend({
        center: function (options) {
            var options = $.extend({
                inside: window,
                transition: 0,
                minX: 0,
                minY: 0,
                withScrolling: false,
                vertical: true,
                horizontal: true
            }, options);
            return this.each(function () {
                var props = { position: 'fixed' };
                if (options.vertical) {
                    var top = ($(options.inside).height() - $(this).outerHeight()) / 2;
                    if (options.withScrolling) top += $(options.inside).scrollTop() || 0;
                    top = (top > options.minY ? top : options.minY);
                    $.extend(props, { top: top + 'px' });
                }
                if (options.horizontal) {
                    var left = ($(options.inside).width() - $(this).outerWidth()) / 2;
                    if (options.withScrolling) left += $(options.inside).scrollLeft() || 0;
                    left = (left > options.minX ? left : options.minX);
                    $.extend(props, { left: left + 'px' });
                }
                if (options.transition > 0) $(this).animate(props, options.transition);
                else $(this).css(props);
                return $(this);
            });
        }
    });
})(jQuery);

$.extend($.expr[':'], {
    containsNumber: function (a, i, m) {
        var text = $(a).text();
        return parseInt(text) == parseInt(m[3]);
    }
});

function setTheme(theme) {
    var rules = " ";
    rules += ".regalcalendar .ui-state-active, .qtip-bootstrap .qtip-titlebar { background-color: " + theme + "; } ";
    rules += ".regalcalendar .ui-datepicker td a:hover{ border: 2px solid " + theme + "; } ";
    rules += ".regalcalendar table.ui-datepicker-calendar tr th{ border-bottom: 1px solid " + theme + "; } ";
    rules += "div.mapLink:hover, .regalcalendar .ui-datepicker td a:hover, .regalcalendar .event i:hover, .qtip .event i:hover, .regalcalendar .eGroup i:hover, .regalcalendar a.ui-datepicker-next.ui-corner-all:hover, .regalcalendar a.ui-datepicker-prev.ui-corner-all:hover, .regal-prevyear_gray:hover, .regal-nextyear_gray:hover, div.pv:hover{ color: " + theme + "; } ";

    $("<style>" + rules + "</style>").appendTo("head");
}

function setEvents($events, $this, theme) {
    $events.each(function () {
        var customText = $(this).attr('data-customText') == undefined ? '' : '<span class="rg-custom">' + $(this).attr('data-customText') + '</span>';
        var date = $(this).attr('data-date').split('/');
        var time = $(this).attr('data-time');
        var icon = $(this).attr('data-icon') == undefined ? '' : '<div class="event" data-txt="' + $(this).text() + '" data-date="' + $(this).attr('data-date') + '" data-time="' + $(this).attr('data-time') + '" data-title="' + $(this).attr('data-title') + '" data-location="' + $(this).attr('data-location') + '"><i class="' + $(this).attr('data-icon') + '"></i></div>' + customText;
        var preview = $(this).attr('data-preview') == undefined ? '' : '<div class="pv">' + $(this).attr('data-preview') + '</div>';
        date[1] = (parseInt(date[1]) - 1).toString();
        var $found = $this.find("td[data-month='" + date[1] + "'][data-year='" + date[2] + "']:containsNumber(" + date[0] + ")");
        $found.append(preview + icon);

        var $event = $found.find('div.event');
        var multiple = $event.length;

        if (multiple > 1) {
            var sel = date
            $('span.event[data-date="' + $(this).attr('data-date') + '"]').addClass('multiple');
            $event.each(function () {
                $(this).addClass('multiple').append('<span>' + $(this).attr('data-title') + '</span>');
            });
        }

    });
    var $multiple = $('div.regalcalendar td').has('div.multiple').not(':has(.multiple-container)');
    $multiple.each(function () {
        $(this).append('<div class="eGroup"><i class="fas fa-th-large"></i></div><div class="multiple-container"></div>');
        var $container = $(this).find('div.multiple-container');
        var $mEvents = $(this).find('.multiple');
        $mEvents.appendTo($container);

    });
}

function setMap(el, mapToken, markerIcon, mapZoom, location, types) {
    var $map = $(el.currentTarget).find(".map_mylocation");
    console.log($map);

    if (location.length > 0) {
        const url = `https://www.google.com/maps?q=${encodeURIComponent(location)}&output=embed`;
        const $iframe = `<iframe src="${url}" width="172" height="220" style="border:0;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
        // $map.innerHTML = $iframe;

        $map.append($iframe);
    }

}

function setTooltip($events, $this, enter, exit, theme, tooltip, twitter, tooltipPosition, show, timeFormat, mapLink, mapToken, markerIcon, mapZoom) {
    $events.not('.multiple').each(function () {
        var title = $(this).attr('data-title');
        var location = $(this).attr('data-location');
        var types = $(this).attr('data-types') == undefined ? "place" : $(this).attr('data-types');
        var date = $(this).attr('data-date').split('/');
        var time = $(this).attr('data-time').split(':');
        var icon = $(this).attr('data-icon');
        var text = $(this).html();
        var oposite = '';
        var tFormat;
        var tHour;
        var mapClass = mapLink == '' ? '' : 'mapLink'
        if (timeFormat == 'hrs') {
            tFormat = 'hrs';
            tHour = $(this).attr('data-time');
        } else {
            var hours = time[0];
            var minutes = time[1];
            var tFormat = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            tHour = hours + ':' + minutes;
        }
        if (tooltipPosition == 'top')
            oposite = 'bottom';
        else if (tooltipPosition == 'bottom')
            oposite = 'top';
        else if (tooltipPosition == 'left')
            oposite = 'right';
        else
            oposite = 'left';
        date[1] = (parseInt(date[1]) - 1).toString();
        var $found = $this.find("td[data-month='" + date[1] + "'][data-year='" + date[2] + "'] a:containsNumber(" + date[0] + ")").data({ title: title, location: location });

        $found.qtip({
            content: {
                text: '<div class="tooltip-body">' + text + '</div>' +
                    '<div class="tooltip-hours">' + tHour + ' ' + tFormat + '</div>' +
                    '<div class="tooltip-location School ' + mapClass + '"><i class="fa fa-map-marker-alt" title="' + mapLink + '"></i></div>' +
                    '<div class="count"><div></div></div>',
                title: {
                    text: title,
                    button: 'Close'
                }
            },
            position: {
                my: oposite + ' center',
                at: tooltipPosition + ' center'
            },
            show: {
                event: show
            },
            hide: {
                fixed: true,
                delay: 3000
            },
            style: {
                classes: 'draggable-tooltip qtip-shadow qtip-' + tooltip
            },
            events: {
                show: function (el) {
                    $(el.currentTarget).hide().fadeIn(1000);
                    $(el.currentTarget).removeClass(exit).addClass(enter + ' animate');
                    var until = new Date(date[2], date[1], date[0], time[0], time[1]);
                    $('.count div').countdown({ until: until, layout: '{dn} {dl} {hnn}{sep}{mnn}{sep}{snn}' });
                    $(el.currentTarget).find('.tooltip-location').qtip({
                        content: {
                            text: '<div class="map_mylocation"></div>',
                            title: {
                                text: location,
                                button: 'Close'
                            }
                        },
                        position: {
                            my: 'bottom center',
                            at: 'up center'
                        },
                        hide: false,
                        show: {
                            event: show
                        },
                        style: {
                            classes: 'draggable-tooltip qtip-shadow qtip-' + tooltip
                        },
                        events: {
                            show: function (el) {
                                setMap(el, mapToken, markerIcon, mapZoom, location, types);
                            },
                            render: function (event, api) {
                                $(this).draggable({
                                    containment: 'window',
                                    handle: api.elements.titlebar
                                });
                            }
                        }
                    });
                },
                hide: function (el) {
                    $(el.currentTarget).show();
                    $(el.currentTarget).removeClass(enter).addClass(exit).fadeOut(1000);
                },
                render: function (event, api) {
                    $(this).draggable({
                        containment: 'window',
                        handle: api.elements.titlebar
                    });
                }
            }
        });
    });
    $this.find('.multiple-container').each(function () {
        var $this = $(this);
        var $found = $(this).parent('td');
        var $mEvent = $this.find('div.multiple').eq(0);

        var mDate = $mEvent.attr('data-date');

        $found.qtip({
            content: {
                text: '<div class="tooltip-body">' + $this.html() + '</div>',
                title: {
                    text: 'Events on ' + mDate,
                    button: 'Close'
                }
            },
            position: {
                my: 'bottom center',
                at: 'up center'
            },
            show: {
                event: show
            },
            hide: {
                fixed: true,
                delay: 3000
            },
            style: {
                classes: 'draggable-tooltip qtip-shadow qtip-' + tooltip
            },
            events: {
                show: function (el) {
                    $(el.currentTarget).hide().fadeIn(1000);
                    $(el.currentTarget).removeClass(exit).addClass(enter + ' animate');

                    var $eEvents = $(el.currentTarget).find('.multiple');
                    $eEvents.each(function () {
                        var title = $(this).attr('data-title');
                        var location = $(this).attr('data-location');
                        var types = $(this).attr('data-types') == undefined ? "place" : $(this).attr('data-types');
                        var date = $(this).attr('data-date').split('/');
                        var time = $(this).attr('data-time').split(':');
                        var icon = $(this).attr('data-icon');
                        var text = $(this).attr('data-txt');
                        var oposite = '';
                        var tFormat;
                        var tHour;
                        var mapClass = mapLink == '' ? '' : 'mapLink'
                        if (timeFormat == 'hrs') {
                            tFormat = 'hrs';
                            tHour = $(this).attr('data-time');
                        } else {
                            var hours = time[0];
                            var minutes = time[1];
                            var tFormat = hours >= 12 ? 'pm' : 'am';
                            hours = hours % 12;
                            hours = hours ? hours : 12;
                            minutes = minutes < 10 ? '0' + minutes : minutes;
                            tHour = hours + ':' + minutes;
                        }
                        if (tooltipPosition == 'top')
                            oposite = 'bottom';
                        else if (tooltipPosition == 'bottom')
                            oposite = 'top';
                        else if (tooltipPosition == 'left')
                            oposite = 'right';
                        else
                            oposite = 'left';
                        date[1] = (parseInt(date[1]) - 1).toString();
                        var $found = $this.find("td[data-month='" + date[1] + "'][data-year='" + date[2] + "'] a:containsNumber(" + date[0] + ")").data({ title: title, location: location });
                        $(this).qtip({
                            content: {
                                text: '<div class="tooltip-body">' + text + '</div>' +
                                    '<div class="tooltip-hours">' + tHour + ' ' + tFormat + '</div>' +
                                    '<div class="tooltip-location School ' + mapClass + '"><i class="fa fa-map-marker-alt" title="' + mapLink + '"></i></div>' +
                                    '<div class="count"><div></div></div>',
                                title: {
                                    text: title,
                                    button: 'Close'
                                }
                            },
                            position: {
                                my: oposite + ' center',
                                at: tooltipPosition + ' left'
                            },
                            show: {
                                event: show
                            },
                            hide: {
                                fixed: true,
                                delay: 3000
                            },
                            style: {
                                classes: 'draggable-tooltip qtip-shadow qtip-' + tooltip
                            },
                            events: {
                                show: function (el) {
                                    $(el.currentTarget).hide().fadeIn(1000);
                                    $(el.currentTarget).removeClass(exit).addClass(enter + ' animate');
                                    var until = new Date(date[2], date[1], date[0], time[0], time[1]);
                                    $('.count div').countdown({ until: until, layout: '{dn} {dl} {hnn}{sep}{mnn}{sep}{snn}' });
                                    $(el.currentTarget).find('.tooltip-location').qtip({
                                        content: {
                                            text: '<div class="map_mylocation"></div>',
                                            title: {
                                                text: location,
                                                button: 'Close'
                                            }
                                        },
                                        position: {
                                            my: 'bottom center',
                                            at: 'up center'
                                        },
                                        show: {
                                            event: show
                                        },
                                        hide: false,
                                        style: {
                                            classes: 'draggable-tooltip qtip-shadow qtip-' + tooltip
                                        },
                                        events: {
                                            show: function (el) {
                                                setMap(el, mapToken, markerIcon, mapZoom, location, types);
                                            },
                                            render: function (event, api) {
                                                $(this).draggable({
                                                    containment: 'window',
                                                    handle: api.elements.titlebar
                                                });
                                            }
                                        }
                                    });
                                },
                                hide: function (el) {
                                    $(el.currentTarget).show();
                                    $(el.currentTarget).removeClass(enter).addClass(exit).fadeOut(1000);
                                },
                                render: function (event, api) {
                                    $(this).draggable({
                                        containment: 'window',
                                        handle: api.elements.titlebar
                                    });
                                }
                            }
                        });
                    })
                },
                hide: function (el) {
                    $(el.currentTarget).show();
                    $(el.currentTarget).removeClass(enter).addClass(exit).fadeOut(1000);
                },
                render: function (event, api) {
                    $(this).draggable({
                        containment: 'window',
                        handle: api.elements.titlebar
                    });
                }
            }
        });
    });
}

/* http://keith-wood.name/countdown.html
   Countdown for jQuery v1.6.3.
   Written by Keith Wood (kbwood{at}iinet.com.au) January 2008.
   Available under the MIT (https://github.com/jquery/jquery/blob/master/MIT-LICENSE.txt) license. 
   Please attribute the author if you use it. */
(function ($) {
    function Countdown() {
        this.regional = [];
        this.regional[''] = { labels: ['Years', 'Months', 'Weeks', 'Days', 'Hours', 'Minutes', 'Seconds'], labels1: ['Year', 'Month', 'Week', 'Day', 'Hour', 'Minute', 'Second'], compactLabels: ['y', 'm', 'w', 'd'], whichLabels: null, digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], timeSeparator: ':', isRTL: false };
        this._defaults = { until: null, since: null, timezone: null, serverSync: null, format: 'dHMS', layout: '', compact: false, significant: 0, description: '', expiryUrl: '', expiryText: '', alwaysExpire: false, onExpiry: null, onTick: null, tickInterval: 1 };
        $.extend(this._defaults, this.regional['']);
        this._serverSyncs = [];
        var c = (typeof Date.now == 'function' ? Date.now : function () { return new Date().getTime() });
        var d = (window.performance && typeof window.performance.now == 'function');

        function timerCallBack(a) {
            var b = (a < 1e12 ? (d ? (performance.now() + performance.timing.navigationStart) : c()) : a || c());
            if (b - f >= 1000) {
                x._updateTargets();
                f = b
            }
            e(timerCallBack)
        }
        var e = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || null;
        var f = 0;
        if (!e || $.noRequestAnimationFrame) {
            $.noRequestAnimationFrame = null;
            setInterval(function () { x._updateTargets() }, 980)
        } else {
            f = window.animationStartTime || window.webkitAnimationStartTime || window.mozAnimationStartTime || window.oAnimationStartTime || window.msAnimationStartTime || c();
            e(timerCallBack)
        }
    }
    var Y = 0;
    var O = 1;
    var W = 2;
    var D = 3;
    var H = 4;
    var M = 5;
    var S = 6;
    $.extend(Countdown.prototype, {
        markerClassName: 'hasCountdown',
        propertyName: 'countdown',
        _rtlClass: 'countdown_rtl',
        _sectionClass: 'countdown_section',
        _amountClass: 'countdown_amount',
        _rowClass: 'countdown_row',
        _holdingClass: 'countdown_holding',
        _showClass: 'countdown_show',
        _descrClass: 'countdown_descr',
        _timerTargets: [],
        setDefaults: function (a) {
            this._resetExtraLabels(this._defaults, a);
            $.extend(this._defaults, a || {})
        },
        UTCDate: function (a, b, c, e, f, g, h, i) {
            if (typeof b == 'object' && b.constructor == Date) {
                i = b.getMilliseconds();
                h = b.getSeconds();
                g = b.getMinutes();
                f = b.getHours();
                e = b.getDate();
                c = b.getMonth();
                b = b.getFullYear()
            }
            var d = new Date();
            d.setUTCFullYear(b);
            d.setUTCDate(1);
            d.setUTCMonth(c || 0);
            d.setUTCDate(e || 1);
            d.setUTCHours(f || 0);
            d.setUTCMinutes((g || 0) - (Math.abs(a) < 30 ? a * 60 : a));
            d.setUTCSeconds(h || 0);
            d.setUTCMilliseconds(i || 0);
            return d
        },
        periodsToSeconds: function (a) { return a[0] * 31557600 + a[1] * 2629800 + a[2] * 604800 + a[3] * 86400 + a[4] * 3600 + a[5] * 60 + a[6] },
        _attachPlugin: function (a, b) {
            a = $(a);
            if (a.hasClass(this.markerClassName)) { return }
            var c = { options: $.extend({}, this._defaults), _periods: [0, 0, 0, 0, 0, 0, 0] };
            a.addClass(this.markerClassName).data(this.propertyName, c);
            this._optionPlugin(a, b)
        },
        _addTarget: function (a) { if (!this._hasTarget(a)) { this._timerTargets.push(a) } },
        _hasTarget: function (a) { return ($.inArray(a, this._timerTargets) > -1) },
        _removeTarget: function (b) { this._timerTargets = $.map(this._timerTargets, function (a) { return (a == b ? null : a) }) },
        _updateTargets: function () { for (var i = this._timerTargets.length - 1; i >= 0; i--) { this._updateCountdown(this._timerTargets[i]) } },
        _optionPlugin: function (a, b, c) {
            a = $(a);
            var d = a.data(this.propertyName);
            if (!b || (typeof b == 'string' && c == null)) {
                var e = b;
                b = (d || {}).options;
                return (b && e ? b[e] : b)
            }
            if (!a.hasClass(this.markerClassName)) { return }
            b = b || {};
            if (typeof b == 'string') {
                var e = b;
                b = {};
                b[e] = c
            }
            if (b.layout) { b.layout = b.layout.replace(/&lt;/g, '<').replace(/&gt;/g, '>') }
            this._resetExtraLabels(d.options, b);
            var f = (d.options.timezone != b.timezone);
            $.extend(d.options, b);
            this._adjustSettings(a, d, b.until != null || b.since != null || f);
            var g = new Date();
            if ((d._since && d._since < g) || (d._until && d._until > g)) { this._addTarget(a[0]) }
            this._updateCountdown(a, d)
        },
        _updateCountdown: function (a, b) {
            var c = $(a);
            b = b || c.data(this.propertyName);
            if (!b) { return }
            c.html(this._generateHTML(b)).toggleClass(this._rtlClass, b.options.isRTL);
            if ($.isFunction(b.options.onTick)) { var d = b._hold != 'lap' ? b._periods : this._calculatePeriods(b, b._show, b.options.significant, new Date()); if (b.options.tickInterval == 1 || this.periodsToSeconds(d) % b.options.tickInterval == 0) { b.options.onTick.apply(a, [d]) } }
            var e = b._hold != 'pause' && (b._since ? b._now.getTime() < b._since.getTime() : b._now.getTime() >= b._until.getTime());
            if (e && !b._expiring) {
                b._expiring = true;
                if (this._hasTarget(a) || b.options.alwaysExpire) {
                    this._removeTarget(a);
                    if ($.isFunction(b.options.onExpiry)) { b.options.onExpiry.apply(a, []) }
                    if (b.options.expiryText) {
                        var f = b.options.layout;
                        b.options.layout = b.options.expiryText;
                        this._updateCountdown(a, b);
                        b.options.layout = f
                    }
                    if (b.options.expiryUrl) { window.location = b.options.expiryUrl }
                }
                b._expiring = false
            } else if (b._hold == 'pause') { this._removeTarget(a) }
            c.data(this.propertyName, b)
        },
        _resetExtraLabels: function (a, b) { var c = false; for (var n in b) { if (n != 'whichLabels' && n.match(/[Ll]abels/)) { c = true; break } } if (c) { for (var n in a) { if (n.match(/[Ll]abels[02-9]|compactLabels1/)) { a[n] = null } } } },
        _adjustSettings: function (a, b, c) {
            var d;
            var e = 0;
            var f = null;
            for (var i = 0; i < this._serverSyncs.length; i++) { if (this._serverSyncs[i][0] == b.options.serverSync) { f = this._serverSyncs[i][1]; break } }
            if (f != null) {
                e = (b.options.serverSync ? f : 0);
                d = new Date()
            } else {
                var g = ($.isFunction(b.options.serverSync) ? b.options.serverSync.apply(a, []) : null);
                d = new Date();
                e = (g ? d.getTime() - g.getTime() : 0);
                this._serverSyncs.push([b.options.serverSync, e])
            }
            var h = b.options.timezone;
            h = (h == null ? -d.getTimezoneOffset() : h);
            if (c || (!c && b._until == null && b._since == null)) {
                b._since = b.options.since;
                if (b._since != null) { b._since = this.UTCDate(h, this._determineTime(b._since, null)); if (b._since && e) { b._since.setMilliseconds(b._since.getMilliseconds() + e) } }
                b._until = this.UTCDate(h, this._determineTime(b.options.until, d));
                if (e) { b._until.setMilliseconds(b._until.getMilliseconds() + e) }
            }
            b._show = this._determineShow(b)
        },
        _destroyPlugin: function (a) {
            a = $(a);
            if (!a.hasClass(this.markerClassName)) { return }
            this._removeTarget(a[0]);
            a.removeClass(this.markerClassName).empty().removeData(this.propertyName)
        },
        _pausePlugin: function (a) { this._hold(a, 'pause') },
        _lapPlugin: function (a) { this._hold(a, 'lap') },
        _resumePlugin: function (a) { this._hold(a, null) },
        _hold: function (a, b) {
            var c = $.data(a, this.propertyName);
            if (c) {
                if (c._hold == 'pause' && !b) {
                    c._periods = c._savePeriods;
                    var d = (c._since ? '-' : '+');
                    c[c._since ? '_since' : '_until'] = this._determineTime(d + c._periods[0] + 'y' + d + c._periods[1] + 'o' + d + c._periods[2] + 'w' + d + c._periods[3] + 'd' + d + c._periods[4] + 'h' + d + c._periods[5] + 'm' + d + c._periods[6] + 's');
                    this._addTarget(a)
                }
                c._hold = b;
                c._savePeriods = (b == 'pause' ? c._periods : null);
                $.data(a, this.propertyName, c);
                this._updateCountdown(a, c)
            }
        },
        _getTimesPlugin: function (a) { var b = $.data(a, this.propertyName); return (!b ? null : (b._hold == 'pause' ? b._savePeriods : (!b._hold ? b._periods : this._calculatePeriods(b, b._show, b.options.significant, new Date())))) },
        _determineTime: function (k, l) {
            var m = function (a) {
                var b = new Date();
                b.setTime(b.getTime() + a * 1000);
                return b
            };
            var n = function (a) {
                a = a.toLowerCase();
                var b = new Date();
                var c = b.getFullYear();
                var d = b.getMonth();
                var e = b.getDate();
                var f = b.getHours();
                var g = b.getMinutes();
                var h = b.getSeconds();
                var i = /([+-]?[0-9]+)\s*(s|m|h|d|w|o|y)?/g;
                var j = i.exec(a);
                while (j) {
                    switch (j[2] || 's') {
                        case 's':
                            h += parseInt(j[1], 10);
                            break;
                        case 'm':
                            g += parseInt(j[1], 10);
                            break;
                        case 'h':
                            f += parseInt(j[1], 10);
                            break;
                        case 'd':
                            e += parseInt(j[1], 10);
                            break;
                        case 'w':
                            e += parseInt(j[1], 10) * 7;
                            break;
                        case 'o':
                            d += parseInt(j[1], 10);
                            e = Math.min(e, x._getDaysInMonth(c, d));
                            break;
                        case 'y':
                            c += parseInt(j[1], 10);
                            e = Math.min(e, x._getDaysInMonth(c, d));
                            break
                    }
                    j = i.exec(a)
                }
                return new Date(c, d, e, f, g, h, 0)
            };
            var o = (k == null ? l : (typeof k == 'string' ? n(k) : (typeof k == 'number' ? m(k) : k)));
            if (o) o.setMilliseconds(0);
            return o
        },
        _getDaysInMonth: function (a, b) { return 32 - new Date(a, b, 32).getDate() },
        _normalLabels: function (a) { return a },
        _generateHTML: function (c) {
            var d = this;
            c._periods = (c._hold ? c._periods : this._calculatePeriods(c, c._show, c.options.significant, new Date()));
            var e = false;
            var f = 0;
            var g = c.options.significant;
            var h = $.extend({}, c._show);
            for (var i = Y; i <= S; i++) {
                e |= (c._show[i] == '?' && c._periods[i] > 0);
                h[i] = (c._show[i] == '?' && !e ? null : c._show[i]);
                f += (h[i] ? 1 : 0);
                g -= (c._periods[i] > 0 ? 1 : 0)
            }
            var j = [false, false, false, false, false, false, false];
            for (var i = S; i >= Y; i--) {
                if (c._show[i]) {
                    if (c._periods[i]) { j[i] = true } else {
                        j[i] = g > 0;
                        g--
                    }
                }
            }
            var k = (c.options.compact ? c.options.compactLabels : c.options.labels);
            var l = c.options.whichLabels || this._normalLabels;
            var m = function (a) { var b = c.options['compactLabels' + l(c._periods[a])]; return (h[a] ? d._translateDigits(c, c._periods[a]) + (b ? b[a] : k[a]) + ' ' : '') };
            var n = function (a) { var b = c.options['labels' + l(c._periods[a])]; return ((!c.options.significant && h[a]) || (c.options.significant && j[a]) ? '<span class="' + x._sectionClass + '">' + '<span class="' + x._amountClass + '">' + d._translateDigits(c, c._periods[a]) + '</span><br/>' + (b ? b[a] : k[a]) + '</span>' : '') };
            return (c.options.layout ? this._buildLayout(c, h, c.options.layout, c.options.compact, c.options.significant, j) : ((c.options.compact ? '<span class="' + this._rowClass + ' ' + this._amountClass + (c._hold ? ' ' + this._holdingClass : '') + '">' + m(Y) + m(O) + m(W) + m(D) + (h[H] ? this._minDigits(c, c._periods[H], 2) : '') + (h[M] ? (h[H] ? c.options.timeSeparator : '') + this._minDigits(c, c._periods[M], 2) : '') + (h[S] ? (h[H] || h[M] ? c.options.timeSeparator : '') + this._minDigits(c, c._periods[S], 2) : '') : '<span class="' + this._rowClass + ' ' + this._showClass + (c.options.significant || f) + (c._hold ? ' ' + this._holdingClass : '') + '">' + n(Y) + n(O) + n(W) + n(D) + n(H) + n(M) + n(S)) + '</span>' + (c.options.description ? '<span class="' + this._rowClass + ' ' + this._descrClass + '">' + c.options.description + '</span>' : '')))
        },
        _buildLayout: function (c, d, e, f, g, h) {
            var j = c.options[f ? 'compactLabels' : 'labels'];
            var k = c.options.whichLabels || this._normalLabels;
            var l = function (a) { return (c.options[(f ? 'compactLabels' : 'labels') + k(c._periods[a])] || j)[a] };
            var m = function (a, b) { return c.options.digits[Math.floor(a / b) % 10] };
            var o = { desc: c.options.description, sep: c.options.timeSeparator, yl: l(Y), yn: this._minDigits(c, c._periods[Y], 1), ynn: this._minDigits(c, c._periods[Y], 2), ynnn: this._minDigits(c, c._periods[Y], 3), y1: m(c._periods[Y], 1), y10: m(c._periods[Y], 10), y100: m(c._periods[Y], 100), y1000: m(c._periods[Y], 1000), ol: l(O), on: this._minDigits(c, c._periods[O], 1), onn: this._minDigits(c, c._periods[O], 2), onnn: this._minDigits(c, c._periods[O], 3), o1: m(c._periods[O], 1), o10: m(c._periods[O], 10), o100: m(c._periods[O], 100), o1000: m(c._periods[O], 1000), wl: l(W), wn: this._minDigits(c, c._periods[W], 1), wnn: this._minDigits(c, c._periods[W], 2), wnnn: this._minDigits(c, c._periods[W], 3), w1: m(c._periods[W], 1), w10: m(c._periods[W], 10), w100: m(c._periods[W], 100), w1000: m(c._periods[W], 1000), dl: l(D), dn: this._minDigits(c, c._periods[D], 1), dnn: this._minDigits(c, c._periods[D], 2), dnnn: this._minDigits(c, c._periods[D], 3), d1: m(c._periods[D], 1), d10: m(c._periods[D], 10), d100: m(c._periods[D], 100), d1000: m(c._periods[D], 1000), hl: l(H), hn: this._minDigits(c, c._periods[H], 1), hnn: this._minDigits(c, c._periods[H], 2), hnnn: this._minDigits(c, c._periods[H], 3), h1: m(c._periods[H], 1), h10: m(c._periods[H], 10), h100: m(c._periods[H], 100), h1000: m(c._periods[H], 1000), ml: l(M), mn: this._minDigits(c, c._periods[M], 1), mnn: this._minDigits(c, c._periods[M], 2), mnnn: this._minDigits(c, c._periods[M], 3), m1: m(c._periods[M], 1), m10: m(c._periods[M], 10), m100: m(c._periods[M], 100), m1000: m(c._periods[M], 1000), sl: l(S), sn: this._minDigits(c, c._periods[S], 1), snn: this._minDigits(c, c._periods[S], 2), snnn: this._minDigits(c, c._periods[S], 3), s1: m(c._periods[S], 1), s10: m(c._periods[S], 10), s100: m(c._periods[S], 100), s1000: m(c._periods[S], 1000) };
            var p = e;
            for (var i = Y; i <= S; i++) {
                var q = 'yowdhms'.charAt(i);
                var r = new RegExp('\\{' + q + '<\\}([\\s\\S]*)\\{' + q + '>\\}', 'g');
                p = p.replace(r, ((!g && d[i]) || (g && h[i]) ? '$1' : ''))
            }
            $.each(o, function (n, v) {
                var a = new RegExp('\\{' + n + '\\}', 'g');
                p = p.replace(a, v)
            });
            return p
        },
        _minDigits: function (a, b, c) {
            b = '' + b;
            if (b.length >= c) { return this._translateDigits(a, b) }
            b = '0000000000' + b;
            return this._translateDigits(a, b.substr(b.length - c))
        },
        _translateDigits: function (b, c) { return ('' + c).replace(/[0-9]/g, function (a) { return b.options.digits[a] }) },
        _determineShow: function (a) {
            var b = a.options.format;
            var c = [];
            c[Y] = (b.match('y') ? '?' : (b.match('Y') ? '!' : null));
            c[O] = (b.match('o') ? '?' : (b.match('O') ? '!' : null));
            c[W] = (b.match('w') ? '?' : (b.match('W') ? '!' : null));
            c[D] = (b.match('d') ? '?' : (b.match('D') ? '!' : null));
            c[H] = (b.match('h') ? '?' : (b.match('H') ? '!' : null));
            c[M] = (b.match('m') ? '?' : (b.match('M') ? '!' : null));
            c[S] = (b.match('s') ? '?' : (b.match('S') ? '!' : null));
            return c
        },
        _calculatePeriods: function (c, d, e, f) {
            c._now = f;
            c._now.setMilliseconds(0);
            var g = new Date(c._now.getTime());
            if (c._since) { if (f.getTime() < c._since.getTime()) { c._now = f = g } else { f = c._since } } else { g.setTime(c._until.getTime()); if (f.getTime() > c._until.getTime()) { c._now = f = g } }
            var h = [0, 0, 0, 0, 0, 0, 0];
            if (d[Y] || d[O]) {
                var i = x._getDaysInMonth(f.getFullYear(), f.getMonth());
                var j = x._getDaysInMonth(g.getFullYear(), g.getMonth());
                var k = (g.getDate() == f.getDate() || (g.getDate() >= Math.min(i, j) && f.getDate() >= Math.min(i, j)));
                var l = function (a) { return (a.getHours() * 60 + a.getMinutes()) * 60 + a.getSeconds() };
                var m = Math.max(0, (g.getFullYear() - f.getFullYear()) * 12 + g.getMonth() - f.getMonth() + ((g.getDate() < f.getDate() && !k) || (k && l(g) < l(f)) ? -1 : 0));
                h[Y] = (d[Y] ? Math.floor(m / 12) : 0);
                h[O] = (d[O] ? m - h[Y] * 12 : 0);
                f = new Date(f.getTime());
                var n = (f.getDate() == i);
                var o = x._getDaysInMonth(f.getFullYear() + h[Y], f.getMonth() + h[O]);
                if (f.getDate() > o) { f.setDate(o) }
                f.setFullYear(f.getFullYear() + h[Y]);
                f.setMonth(f.getMonth() + h[O]);
                if (n) { f.setDate(o) }
            }
            var p = Math.floor((g.getTime() - f.getTime()) / 1000);
            var q = function (a, b) {
                h[a] = (d[a] ? Math.floor(p / b) : 0);
                p -= h[a] * b
            };
            q(W, 604800);
            q(D, 86400);
            q(H, 3600);
            q(M, 60);
            q(S, 1);
            if (p > 0 && !c._since) {
                var r = [1, 12, 4.3482, 7, 24, 60, 60];
                var s = S;
                var t = 1;
                for (var u = S; u >= Y; u--) {
                    if (d[u]) {
                        if (h[s] >= t) {
                            h[s] = 0;
                            p = 1
                        }
                        if (p > 0) {
                            h[u]++;
                            p = 0;
                            s = u;
                            t = 1
                        }
                    }
                    t *= r[u]
                }
            }
            if (e) { for (var u = Y; u <= S; u++) { if (e && h[u]) { e-- } else if (!e) { h[u] = 0 } } }
            return h
        }
    });
    var w = ['getTimes'];

    function isNotChained(a, b) { if (a == 'option' && (b.length == 0 || (b.length == 1 && typeof b[0] == 'string'))) { return true } return $.inArray(a, w) > -1 }
    $.fn.countdown = function (a) {
        var b = Array.prototype.slice.call(arguments, 1);
        if (isNotChained(a, b)) { return x['_' + a + 'Plugin'].apply(x, [this[0]].concat(b)) }
        return this.each(function () {
            if (typeof a == 'string') {
                if (!x['_' + a + 'Plugin']) { throw 'Unknown command: ' + a; }
                x['_' + a + 'Plugin'].apply(x, [this].concat(b))
            } else { x._attachPlugin(this, a || {}) }
        })
    };
    var x = $.countdown = new Countdown()
})(jQuery);

/* qTip2 v2.0.1-83- tips modal viewport svg imagemap ie6 | qtip2.com | Licensed MIT, GPL | Thu Apr 18 2013 17:30:03 */
(function (t, e, o) {
    (function (t) { "use strict"; "function" == typeof define && define.amd ? define(["jquery"], t) : jQuery && !jQuery.fn.qtip && t(jQuery) })(function (s) {
        function n(t, e, i, o) { this.id = i, this.target = t, this.tooltip = E, this.elements = elements = { target: t }, this._id = X + "-" + i, this.timers = { img: {} }, this.options = e, this.plugins = {}, this.cache = cache = { event: {}, target: s(), disabled: S, attr: o, onTarget: S, lastClass: "" }, this.rendered = this.destroyed = this.disabled = this.waiting = this.hiddenDuringWait = this.positioning = this.triggering = S }

        function r(t) { return t === E || "object" !== s.type(t) }

        function a(t) { return !(s.isFunction(t) || t && t.attr || t.length || "object" === s.type(t) && (t.jquery || t.then)) }

        function l(t) { var e, i, o, n; return r(t) ? S : (r(t.metadata) && (t.metadata = { type: t.metadata }), "content" in t && (e = t.content, r(e) || e.jquery || e.done ? e = t.content = { text: i = a(e) ? S : e } : i = e.text, "ajax" in e && (o = e.ajax, n = o && o.once !== S, delete e.ajax, e.text = function (t, e) { var r = s.ajax(s.extend({}, o, { context: e })).then(o.success, E, o.error).then(function (t) { return t && n && e.set("content.text", t), t }, function (t, i, o) { e.destroyed || 0 === t.status || e.set("content.text", i + ": " + o) }); return n ? i || s(this).attr(e.options.content.attr) || "Loading..." : r }), "title" in e && (r(e.title) || (e.button = e.title.button, e.title = e.title.text), a(e.title || S) && (e.title = S))), "position" in t && r(t.position) && (t.position = { my: t.position, at: t.position }), "show" in t && r(t.show) && (t.show = t.show.jquery ? { target: t.show } : t.show === W ? { ready: W } : { event: t.show }), "hide" in t && r(t.hide) && (t.hide = t.hide.jquery ? { target: t.hide } : { event: t.hide }), "style" in t && r(t.style) && (t.style = { classes: t.style }), s.each(N, function () { this.sanitize && this.sanitize(t) }), t) }

        function h(t, e) { for (var i, o = 0, s = t, n = e.split("."); s = s[n[o++]];) n.length > o && (i = s); return [i || t, n.pop()] }

        function c(t, e) {
            var i, o, s;
            for (i in this.checks)
                for (o in this.checks[i]) (s = RegExp(o, "i").exec(t)) && (e.push(s), ("builtin" === i || this.plugins[i]) && this.checks[i][o].apply(this.plugins[i] || this, e))
        }

        function d(t) { return Y.concat("").join(t ? "-" + t + " " : " ") }

        function p(t) {
            if (this.tooltip.hasClass(K)) return S;
            clearTimeout(this.timers.show), clearTimeout(this.timers.hide);
            var e = s.proxy(function () { this.toggle(W, t) }, this);
            this.options.show.delay > 0 ? this.timers.show = setTimeout(e, this.options.show.delay) : e()
        }

        function u(t) {
            if (this.tooltip.hasClass(K)) return S;
            var e = s(t.relatedTarget),
                i = e.closest(G)[0] === this.tooltip[0],
                o = e[0] === this.options.show.target[0];
            if (clearTimeout(this.timers.show), clearTimeout(this.timers.hide), this !== e[0] && "mouse" === this.options.position.target && i || this.options.hide.fixed && /mouse(out|leave|move)/.test(t.type) && (i || o)) try { t.preventDefault(), t.stopImmediatePropagation() } catch (n) { } else {
                var r = s.proxy(function () { this.toggle(S, t) }, this);
                this.options.hide.delay > 0 ? this.timers.hide = setTimeout(r, this.options.hide.delay) : r()
            }
        }

        function f(t) { return this.tooltip.hasClass(K) ? S : (clearTimeout(this.timers.inactive), this.timers.inactive = setTimeout(s.proxy(function () { this.hide(t) }, this), this.options.hide.inactive), o) }

        function g(t) { this.rendered && this.tooltip[0].offsetWidth > 0 && this.reposition(t) }

        function m(t, i, o) {
            var r, a, h, c, d, p = s(e.body),
                u = t[0] === e ? p : t,
                f = t.metadata ? t.metadata(o.metadata) : E,
                g = "html5" === o.metadata.type && f ? f[o.metadata.name] : E,
                m = t.data(o.metadata.name || "qtipopts");
            try { m = "string" == typeof m ? s.parseJSON(m) : m } catch (v) { }
            if (c = s.extend(W, {}, C.defaults, o, "object" == typeof m ? l(m) : E, l(g || f)), a = c.position, c.id = i, "boolean" == typeof c.content.text) {
                if (h = t.attr(c.content.attr), c.content.attr === S || !h) return S;
                c.content.text = h
            }
            if (a.container.length || (a.container = p), a.target === S && (a.target = u), c.show.target === S && (c.show.target = u), c.show.solo === W && (c.show.solo = a.container.closest("body")), c.hide.target === S && (c.hide.target = u), c.position.viewport === W && (c.position.viewport = a.container), a.container = a.container.eq(0), a.at = new q(a.at, W), a.my = new q(a.my), t.data(X))
                if (c.overwrite) t.qtip("destroy");
                else if (c.overwrite === S) return S;
            return t.attr($, !0), c.suppress && (d = t.attr("title")) && t.removeAttr("title").attr(te, d).attr("title", ""), r = new n(t, c, i, !!h), t.data(X, r), t.one("remove.qtip-" + i + " removeqtip.qtip-" + i, function () {
                var t;
                (t = s(this).data(X)) && t.destroy()
            }), r
        }

        function v(t) { return t.charAt(0).toUpperCase() + t.slice(1) }

        function y(t, e) { return parseInt(ne(t, e), 10) }

        function b(t, e, i) {
            var o, s, n, r = e.precedance === R,
                a = t[r ? 0 : 1],
                l = t[r ? 1 : 0],
                h = e.string().indexOf(F) > -1,
                c = a * (h ? .5 : 1),
                d = Math.pow,
                p = Math.round,
                u = Math.sqrt(d(c, 2) + d(l, 2)),
                f = [i / c * u, i / l * u];
            return f[2] = Math.sqrt(d(f[0], 2) - d(i, 2)), f[3] = Math.sqrt(d(f[1], 2) - d(i, 2)), o = u + f[2] + f[3] + (h ? 0 : f[0]), s = o / u, n = [p(s * a), p(s * l)], r ? n : n.reverse()
        }

        function w(t, e, i) {
            var o = Math.ceil(e / 2),
                s = Math.ceil(i / 2),
                n = {
                    br: [
                        [0, 0],
                        [e, i],
                        [e, 0]
                    ],
                    bl: [
                        [0, 0],
                        [e, 0],
                        [0, i]
                    ],
                    tr: [
                        [0, i],
                        [e, 0],
                        [e, i]
                    ],
                    tl: [
                        [0, 0],
                        [0, i],
                        [e, i]
                    ],
                    tc: [
                        [0, i],
                        [o, 0],
                        [e, i]
                    ],
                    bc: [
                        [0, 0],
                        [e, 0],
                        [o, i]
                    ],
                    rc: [
                        [0, 0],
                        [e, s],
                        [0, i]
                    ],
                    lc: [
                        [e, 0],
                        [e, i],
                        [0, s]
                    ]
                };
            return n.lt = n.br, n.rt = n.bl, n.lb = n.tr, n.rb = n.tl, n[t.abbrev()]
        }

        function x(t) {
            function e() { g[0] = d.height, g[1] = d.width }

            function i() { g[0] = d.width, g[1] = d.height }

            function n() {
                var e = d.corner,
                    i = t.options.position,
                    o = i.at,
                    s = i.my.string ? i.my.string() : i.my;
                return e === S || s === S && o === S ? S : (e === W ? c.corner = new q(s) : e.string || (c.corner = new q(e), c.corner.fixed = W), f.corner = c.corner.clone(), "c" !== c.corner.abbrev())
            }

            function r(t, e, i) { var o = le + v(e ? e : t[t.precedance]) + "Width"; return (i ? y(i, o) : y(p.content, o) || y(t.y === B && p.titlebar || p.content, o) || y(u, o)) || 0 }

            function a(t) { var e = le + v(t.y) + v(t.x) + "Radius"; return 9 > BROWSER.ie ? 0 : y(t.y === B && p.titlebar || p.content, e) || y(p.tooltip, e) || 0 }

            function l(t, e) {
                function i(t, e, i) { var o = t.css(e); return !o || i && o === t.css(i) || fe.test(o) ? S : o }
                var o = t.tip.css("cssText", ""),
                    n = le + v(e[e.precedance]) + v(he),
                    r = t.titlebar,
                    a = r && (e.y === B || e.y === F && o.position().top + g[1] / 2 + d.offset < r.outerHeight(W)),
                    l = a ? r : t.content;
                m.fill = i(o, ce) || i(l, ce) || i(t.content, ce) || i(u, ce) || o.css(ce), m.border = i(o, n, he) || i(l, n, he) || i(t.content, n, he) || i(u, n, he) || u.css(n), s("*", o).add(o).css("cssText", ce + ":" + de + pe + ";" + le + ":0" + pe + ";")
            }

            function h(e, i, s) {
                if (p.tip) {
                    var n, a, l = c.corner.clone(),
                        h = s.adjusted,
                        u = t.options.position.adjust.method.split(" "),
                        g = u[0],
                        m = u[1] || u[0],
                        v = { left: S, top: S, x: 0, y: 0 },
                        y = {};
                    c.corner.fixed !== W && (g === D && l.precedance === O && h.left && l.y !== F ? l.precedance = l.precedance === O ? R : O : g !== D && h.left && (l.x = l.x === F ? h.left > 0 ? L : A : l.x === L ? A : L), m === D && l.precedance === R && h.top && l.x !== F ? l.precedance = l.precedance === R ? O : R : m !== D && h.top && (l.y = l.y === F ? h.top > 0 ? B : V : l.y === B ? V : B), l.string() === f.corner.string() || f.top === h.top && f.left === h.left || c.update(l, S)), n = c.position(l, h), n[l.x] += r(l, l.x), n[l.y] += r(l, l.y), n.right !== o && (n.left = -n.right), n.bottom !== o && (n.top = -n.bottom), n.user = Math.max(0, d.offset), (v.left = g === D && !!h.left) && (l.x === F ? y[ae + "-left"] = v.x = n[ae + "-left"] - h.left : (a = n.right !== o ? [h.left, -n.left] : [-h.left, n.left], (v.x = Math.max(a[0], a[1])) > a[0] && (s.left -= h.left, v.left = S), y[n.right !== o ? A : L] = v.x)), (v.top = m === D && !!h.top) && (l.y === F ? y[ae + "-top"] = v.y = n[ae + "-top"] - h.top : (a = n.bottom !== o ? [h.top, -n.top] : [-h.top, n.top], (v.y = Math.max(a[0], a[1])) > a[0] && (s.top -= h.top, v.top = S), y[n.bottom !== o ? V : B] = v.y)), p.tip.css(y).toggle(!(v.x && v.y || l.x === F && v.y || l.y === F && v.x)), s.left -= n.left.charAt ? n.user : g !== D || v.top || !v.left && !v.top ? n.left : 0, s.top -= n.top.charAt ? n.user : m !== D || v.left || !v.left && !v.top ? n.top : 0, f.left = h.left, f.top = h.top, f.corner = l.clone()
                }
            }
            var c = this,
                d = t.options.style.tip,
                p = t.elements,
                u = p.tooltip,
                f = { top: 0, left: 0 },
                g = [d.width, d.height],
                m = {},
                x = d.border || 0,
                _ = S;
            c.corner = E, c.mimic = E, c.border = x, c.offset = d.offset, c.size = g, s.extend(c, {
                init: function () { return _ = n() && (ue || BROWSER.ie), _ && (c.create(), c.update(), u.unbind(re).bind("tooltipmove" + re, h)), _ },
                create: function () {
                    if (_) {
                        var t, e = g[0],
                            i = g[1];
                        p.tip && p.tip.remove(), p.tip = s("<div />", { "class": "qtip-tip" }).css({ width: e, height: i }).prependTo(u), ue ? s("<canvas />").appendTo(p.tip)[0].getContext("2d").save() : (t = createVML("shape", 'coordorigin="0,0"', "position:absolute;"), p.tip.html(t + t), s("*", p.tip).bind("click" + re + " mousedown" + re, function (t) { t.stopPropagation() }))
                    }
                },
                update: function (t, o) {
                    if (_) {
                        var n, a, h, v, y, T = p.tip,
                            C = T.children(),
                            j = g[0],
                            M = g[1],
                            z = d.mimic,
                            E = Math.round;
                        t || (t = f.corner || c.corner), z === S ? z = t : (z = new q(z), z.precedance = t.precedance, "inherit" === z.x ? z.x = t.x : "inherit" === z.y ? z.y = t.y : z.x === z.y && (z[t.precedance] = t[t.precedance])), n = z.precedance, t.precedance === O ? e() : i(), p.tip.css({ width: j = g[0], height: M = g[1] }), l(p, t), m.border !== de ? (x = r(t), 0 === d.border && x > 0 && (m.fill = m.border), c.border = x = d.border !== W ? d.border : x) : c.border = x = 0, h = w(z, j, M), c.size = y = b(g, t, x), T.css({ width: y[0], height: y[1], lineHeight: y[1] + "px" }), v = t.precedance === R ? [E(z.x === L ? x : z.x === A ? y[0] - j - x : (y[0] - j) / 2), E(z.y === B ? y[1] - M : 0)] : [E(z.x === L ? y[0] - j : 0), E(z.y === B ? x : z.y === V ? y[1] - M - x : (y[1] - M) / 2)], ue ? (C.attr({ width: y[0], height: y[1] }), a = C[0].getContext("2d"), a.restore(), a.save(), a.clearRect(0, 0, 3e3, 3e3), a.fillStyle = m.fill, a.strokeStyle = m.border, a.lineWidth = 2 * x, a.lineJoin = "miter", a.miterLimit = 100, a.translate(v[0], v[1]), a.beginPath(), a.moveTo(h[0][0], h[0][1]), a.lineTo(h[1][0], h[1][1]), a.lineTo(h[2][0], h[2][1]), a.closePath(), x && ("border-box" === u.css("background-clip") && (a.strokeStyle = m.fill, a.stroke()), a.strokeStyle = m.border, a.stroke()), a.fill()) : (h = "m" + h[0][0] + "," + h[0][1] + " l" + h[1][0] + "," + h[1][1] + " " + h[2][0] + "," + h[2][1] + " xe", v[2] = x && /^(r|b)/i.test(t.string()) ? 8 === BROWSER.ie ? 2 : 1 : 0, C.css({ coordsize: j + x + " " + (M + x), antialias: "" + (z.string().indexOf(F) > -1), left: v[0], top: v[1], width: j + x, height: M + x }).each(function (t) {
                            var e = s(this);
                            e[e.prop ? "prop" : "attr"]({ coordsize: j + x + " " + (M + x), path: h, fillcolor: m.fill, filled: !!t, stroked: !t }).toggle(!(!x && !t)), !t && e.html(createVML("stroke", 'weight="' + 2 * x + 'px" color="' + m.border + '" miterlimit="1000" joinstyle="miter"'))
                        })), setTimeout(function () { p.tip.css({ display: "inline-block", visibility: "visible" }) }, 1), o !== S && c.position(t)
                    }
                },
                position: function (t) {
                    var e, i, o, n = p.tip,
                        l = {},
                        h = Math.max(0, d.offset),
                        f = u.hasClass("ui-widget");
                    return d.corner !== S && n ? (t = t || c.corner, e = t.precedance, i = b(g, t, x), o = [t.x, t.y], e === O && o.reverse(), s.each(o, function (o, s) {
                        var n, c, d;
                        s === F ? (n = e === R ? L : B, l[n] = "50%", l[ae + "-" + n] = -Math.round(i[e === R ? 0 : 1] / 2) + h) : (n = r(t, s, f ? u : E), c = r(t, s, f ? E : p.content), d = a(t), l[s] = Math.max(-x, o ? c : h + (d > n ? d : -n)))
                    }), l[t[e]] -= i[e === O ? 0 : 1], n.css({ top: "", bottom: "", left: "", right: "", margin: "" }).css(l), l) : S
                },
                destroy: function () { u.unbind(re), p.tip && p.tip.find("*").remove().end().remove(), c.corner = c.mimic = c.size = E }
            }), c.init()
        }

        function _(t) {
            var i, o = this,
                n = t.options.show.modal,
                r = t.elements,
                a = r.tooltip,
                l = we + t.id;
            s.extend(o, {
                init: function () {
                    return n.on ? (i = r.overlay = ye.elem, a.addClass(be).css("z-index", N.modal.zindex + s(we).length).bind("tooltipshow" + l + " tooltiphide" + l, function (t, e, n) {
                        var r = t.originalEvent;
                        if (t.target === a[0])
                            if (r && "tooltiphide" === t.type && /mouse(leave|enter)/.test(r.type) && s(r.relatedTarget).closest(i[0]).length) try { t.preventDefault() } catch (l) { } else (!r || r && !r.solo) && o.toggle(t, "tooltipshow" === t.type, n)
                    }).bind("tooltipfocus" + l, function (t, e) {
                        if (!t.isDefaultPrevented() && t.target === a[0]) {
                            var o = s(we),
                                n = N.modal.zindex + o.length,
                                r = parseInt(a[0].style.zIndex, 10);
                            i[0].style.zIndex = n - 1, o.each(function () { this.style.zIndex > r && (this.style.zIndex -= 1) }), o.filter("." + Q).qtip("blur", t.originalEvent), a.addClass(Q)[0].style.zIndex = n, ye.update(e);
                            try { t.preventDefault() } catch (l) { }
                        }
                    }).bind("tooltiphide" + l, function (t) { t.target === a[0] && s(we).filter(":visible").not(a).last().qtip("focus", t) }), o) : o
                },
                toggle: function (e, i, s) { return e && e.isDefaultPrevented() ? o : (ye.toggle(t, !!i, s), o) },
                destroy: function () { a.removeClass(be), a.add(e).unbind(l), ye.toggle(t, S), delete r.overlay }
            }), o.init()
        }

        function T(i) {
            var o, n = this,
                r = i.elements,
                a = i.options,
                l = r.tooltip,
                h = ".ie6-" + i.id,
                c = 1 > s("select, object").length,
                d = S;
            s.extend(n, {
                init: function () {
                    var i, a = s(t);
                    c && (r.bgiframe = s('<iframe class="qtip-bgiframe" frameborder="0" tabindex="-1" src="javascript:\'\';"  style="display:block; position:absolute; z-index:-1; filter:alpha(opacity=0); -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";"></iframe>'), r.bgiframe.appendTo(l), l.bind("tooltipmove" + h, n.adjustBGIFrame)), o = s("<div/>", { id: "qtip-rcontainer" }).appendTo(e.body), n.redraw(), r.overlay && !d && (i = function () { r.overlay[0].style.top = a.scrollTop() + "px" }, a.bind("scroll.qtip-ie6, resize.qtip-ie6", i), i(), r.overlay.addClass("qtipmodal-ie6fix"), d = W)
                },
                adjustBGIFrame: function () {
                    var t, e, o = { height: l.outerHeight(S), width: l.outerWidth(S) },
                        s = i.plugins.tip,
                        n = r.tip;
                    e = parseInt(l.css("border-left-width"), 10) || 0, e = { left: -e, top: -e }, s && n && (t = "x" === s.corner.precedance ? ["width", "left"] : ["height", "top"], e[t[1]] -= n[t[0]]()), r.bgiframe.css(e).css(o)
                },
                redraw: function () {
                    if (1 > i.rendered || i.drawing) return n;
                    var t, e, s, r, h = a.style,
                        c = a.position.container;
                    return i.drawing = 1, h.height && l.css(I, h.height), h.width ? l.css(k, h.width) : (l.css(k, "").appendTo(o), e = l.width(), 1 > e % 2 && (e += 1), s = l.css("max-width") || "", r = l.css("min-width") || "", t = (s + r).indexOf("%") > -1 ? c.width() / 100 : 0, s = (s.indexOf("%") > -1 ? t : 1) * parseInt(s, 10) || e, r = (r.indexOf("%") > -1 ? t : 1) * parseInt(r, 10) || 0, e = s + r ? Math.min(Math.max(e, r), s) : e, l.css(k, Math.round(e)).appendTo(c)), i.drawing = 0, n
                },
                destroy: function () { c && r.bgiframe.remove(), l.unbind(h) }
            }), n.init()
        }
        var C, j, q, M, z, W = !0,
            S = !1,
            E = null,
            O = "x",
            R = "y",
            k = "width",
            I = "height",
            B = "top",
            L = "left",
            V = "bottom",
            A = "right",
            F = "center",
            P = "flipinvert",
            D = "shift",
            N = {},
            X = "qtip",
            $ = "data-hasqtip",
            Y = ["ui-widget", "ui-tooltip"],
            H = {},
            G = "div." + X,
            U = X + "-default",
            Q = X + "-focus",
            J = X + "-hover",
            K = "qtip-disabled",
            Z = "_replacedByqTip",
            te = "oldtitle";
        BROWSER = {
            ie: function () {
                for (var t = 3, i = e.createElement("div");
                    (i.innerHTML = "<!--[if gt IE " + ++t + "]><i></i><![endif]-->") && i.getElementsByTagName("i")[0];);
                return t > 4 ? t : 0 / 0
            }(),
            iOS: parseFloat(("" + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ""])[1]).replace("undefined", "3_2").replace("_", ".").replace("_", "")) || S
        }, j = n.prototype, j.render = function (t) {
            if (this.rendered || this.destroyed) return this;
            var e = this,
                i = this.options,
                o = this.cache,
                n = this.elements,
                r = i.content.text,
                a = i.content.title,
                l = i.content.button,
                h = i.position,
                c = "." + this._id + " ",
                d = [];
            return s.attr(this.target[0], "aria-describedby", this._id), this.tooltip = n.tooltip = tooltip = s("<div/>", { id: this._id, "class": [X, U, i.style.classes, X + "-pos-" + i.position.my.abbrev()].join(" "), width: i.style.width || "", height: i.style.height || "", tracking: "mouse" === h.target && h.adjust.mouse, role: "alert", "aria-live": "polite", "aria-atomic": S, "aria-describedby": this._id + "-content", "aria-hidden": W }).toggleClass(K, this.disabled).data(X, this).appendTo(h.container).append(n.content = s("<div />", { "class": X + "-content", id: this._id + "-content", "aria-atomic": W })), this.rendered = -1, this.positioning = W, a && (this._createTitle(), s.isFunction(a) || d.push(this._updateTitle(a, S))), l && this._createButton(), s.isFunction(r) || d.push(this._updateContent(r, S)), this.rendered = W, this._setWidget(), s.each(i.events, function (t, e) { s.isFunction(e) && tooltip.bind(("toggle" === t ? ["tooltipshow", "tooltiphide"] : ["tooltip" + t]).join(c) + c, e) }), s.each(N, function (t) { var i; "render" === this.initialize && (i = this(e)) && ((e.plugins[t] = i).qtip = e) }), this._assignEvents(), s.when.apply(s, d).then(function () { e._trigger("render"), e.positioning = S, e.hiddenDuringWait || !i.show.ready && !t || e.toggle(W, o.event, S), e.hiddenDuringWait = S }), this
        }, j.destroy = function (t) {
            function e() {
                if (!this.destroyed) {
                    this.destroyed = W;
                    var t = this.target,
                        e = t.attr(te);
                    this.rendered && this.tooltip.stop(1, 0).find("*").remove().end().remove(), s.each(this.plugins, function () { this.destroy && this.destroy() }), clearTimeout(this.timers.show), clearTimeout(this.timers.hide), this._unassignEvents(), t.removeData(X).removeAttr($).removeAttr("aria-describedby"), this.options.suppress && e && t.attr("title", e).removeAttr(te), t.unbind("." + this._id), this.options = this.elements = this.cache = this.timers = this.plugins = this.mouse = H[this.id] = E
                }
            }
            return this.destroyed ? this.target : (t !== W && this.rendered ? (tooltip.one("tooltiphidden", s.proxy(e, this)), !this.triggering && this.hide()) : e.call(this), this.target)
        }, M = j.checks = {
            builtin: {
                "^id$": function (t, e, i, o) {
                    var n = i === W ? C.nextid : i,
                        r = X + "-" + n;
                    n !== S && n.length > 0 && !s("#" + r).length ? (this._id = r, this.rendered && (this.tooltip[0].id = this._id, this.elements.content[0].id = this._id + "-content", this.elements.title[0].id = this._id + "-title")) : t[e] = o
                },
                "^prerender": function (t, e, i) { i && !this.rendered && this.render(this.options.show.ready) },
                "^content.text$": function (t, e, i) { this._updateContent(i) },
                "^content.attr$": function (t, e, i, o) { this.options.content.text === this.target.attr(o) && this._updateContent(this.target.attr(i)) },
                "^content.title$": function (t, e, i) { return i ? (i && !this.elements.title && this._createTitle(), this._updateTitle(i), o) : this._removeTitle() },
                "^content.button$": function (t, e, i) { this._updateButton(i) },
                "^content.title.(text|button)$": function (t, e, i) { this.set("content." + e, i) },
                "^position.(my|at)$": function (t, e, i) { "string" == typeof i && (t[e] = new q(i, "at" === e)) },
                "^position.container$": function (t, e, i) { this.tooltip.appendTo(i) },
                "^show.ready$": function (t, e, i) { i && (!this.rendered && this.render(W) || this.toggle(W)) },
                "^style.classes$": function (t, e, i) { this.tooltip.attr("class", [X, U, i, X + "-pos-" + this.options.position.my.abbrev()].join(" ")) },
                "^style.width|height": function (t, e, i) { this.tooltip.css(e, i) },
                "^style.widget|content.title": function () { this._setWidget() },
                "^style.def": function (t, e, i) { this.tooltip.toggleClass(U, !!i) },
                "^events.(render|show|move|hide|focus|blur)$": function (t, e, i) { tooltip[(s.isFunction(i) ? "" : "un") + "bind"]("tooltip" + e, i) },
                "^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)": function () {
                    var t = this.options.position;
                    tooltip.attr("tracking", "mouse" === t.target && t.adjust.mouse), this._unassignEvents(), this._assignEvents()
                }
            }
        }, j.get = function (t) {
            if (this.destroyed) return this;
            var e = h(this.options, t.toLowerCase()),
                i = e[0][e[1]];
            return i.precedance ? i.string() : i
        };
        var ee = /^position\.(my|at|adjust|target|container|viewport)|style|content|show\.ready/i,
            ie = /^prerender|show\.ready/i;
        j.set = function (t, e) {
            if (this.destroyed) return this;
            var i, n = this.rendered,
                r = S,
                a = this.options;
            return this.checks, "string" == typeof t ? (i = t, t = {}, t[i] = e) : t = s.extend({}, t), s.each(t, function (e, i) {
                if (!n && !ie.test(e)) return delete t[e], o;
                var l, c = h(a, e.toLowerCase());
                l = c[0][c[1]], c[0][c[1]] = i && i.nodeType ? s(i) : i, r = ee.test(e) || r, t[e] = [c[0], c[1], i, l]
            }), l(a), this.positioning = W, s.each(t, s.proxy(c, this)), this.positioning = S, this.rendered && this.tooltip[0].offsetWidth > 0 && r && this.reposition("mouse" === a.position.target ? E : this.cache.event), this
        }, j._update = function (t, e, i) {
            var o = this,
                n = this.cache;
            return this.rendered && t ? (s.isFunction(t) && (t = t.call(this.elements.target, n.event, this) || ""), s.isFunction(t.then) ? (n.waiting = W, t.then(function (t) { return n.waiting = S, o._updateContent(t, i) }, E, function (t) { return o._updateContent(t, i) })) : t === S || !t && "" !== t ? S : (t.jquery && t.length > 0 ? e.empty().append(t.css({ display: "block" })) : e.html(t), n.waiting = W, e.imagesLoaded().done(function () { n.waiting = S, i !== S && o.rendered && o.tooltip[0].offsetWidth > 0 && o.reposition(n.event) }).promise())) : S
        }, j._updateContent = function (t, e) { this._update(t, this.elements.content, e) }, j._updateTitle = function (t, e) { this._update(t, this.elements.title, e) === S && this._removeTitle(S) }, j._createTitle = function () {
            var t = this.elements,
                e = this._id + "-title";
            t.titlebar && this._removeTitle(), t.titlebar = s("<div />", { "class": X + "-titlebar " + (this.options.style.widget ? d("header") : "") }).append(t.title = s("<div />", { id: e, "class": X + "-title", "aria-atomic": W })).insertBefore(t.content).delegate(".qtip-close", "mousedown keydown mouseup keyup mouseout", function (t) { s(this).toggleClass("ui-state-active ui-state-focus", "down" === t.type.substr(-4)) }).delegate(".qtip-close", "mouseover mouseout", function (t) { s(this).toggleClass("ui-state-hover", "mouseover" === t.type) }), this.options.content.button && this._createButton()
        }, j._removeTitle = function (t) {
            var e = this.elements;
            e.title && (e.titlebar.remove(), e.titlebar = e.title = e.button = E, t !== S && this.reposition())
        };
        var oe = (q = function (t, e) {
            t = ("" + t).replace(/([A-Z])/, " $1").replace(/middle/gi, F).toLowerCase(), this.x = (t.match(/left|right/i) || t.match(/center/) || ["inherit"])[0].toLowerCase(), this.y = (t.match(/top|bottom|center/i) || ["inherit"])[0].toLowerCase(), this.forceY = !!e;
            var i = t.charAt(0);
            this.precedance = "t" === i || "b" === i ? R : O
        }).prototype;
        oe.invert = function (t, e) { this[t] = this[t] === L ? A : this[t] === A ? L : e || this[t] }, oe.string = function () {
            var t = this.x,
                e = this.y;
            return t === e ? t : this.precedance === R || this.forceY && "center" !== e ? e + " " + t : t + " " + e
        }, oe.abbrev = function () { var t = this.string().split(" "); return t[0].charAt(0) + t[1].charAt(0) }, oe.clone = function () { return new q(this.string(), this.forceY) }, (j.reposition = function (i, o) {
            if (!this.rendered || this.positioning || this.destroyed) return this;
            this.positioning = W;
            var n, r, a = this.cache,
                l = this.tooltip,
                h = this.options.position,
                c = h.target,
                d = h.my,
                p = h.at,
                u = h.viewport,
                f = h.container,
                g = h.adjust,
                m = g.method.split(" "),
                v = l.outerWidth(S),
                y = l.outerHeight(S),
                b = 0,
                w = 0,
                x = l.css("position"),
                _ = { left: 0, top: 0 },
                T = l[0].offsetWidth > 0,
                C = i && "scroll" === i.type,
                j = s(t),
                q = this.mouse;
            if (s.isArray(c) && 2 === c.length) p = { x: L, y: B }, _ = { left: c[0], top: c[1] };
            else if ("mouse" === c && (i && i.pageX || a.event.pageX)) p = { x: L, y: B }, i = !q || !q.pageX || !g.mouse && i && i.pageX ? (!i || "resize" !== i.type && "scroll" !== i.type ? i && i.pageX && "mousemove" === i.type ? i : (!g.mouse || this.options.show.distance) && a.origin && a.origin.pageX ? a.origin : i : a.event) || i || a.event || q || {} : { pageX: q.pageX, pageY: q.pageY }, "static" !== x && (_ = f.offset()), _ = { left: i.pageX - _.left, top: i.pageY - _.top }, g.mouse && C && (_.left -= q.scrollX - j.scrollLeft(), _.top -= q.scrollY - j.scrollTop());
            else {
                if ("event" === c && i && i.target && "scroll" !== i.type && "resize" !== i.type ? a.target = s(i.target) : "event" !== c && (a.target = s(c.jquery ? c : elements.target)), c = a.target, c = s(c).eq(0), 0 === c.length) return this;
                c[0] === e || c[0] === t ? (b = BROWSER.iOS ? t.innerWidth : c.width(), w = BROWSER.iOS ? t.innerHeight : c.height(), c[0] === t && (_ = { top: (u || c).scrollTop(), left: (u || c).scrollLeft() })) : N.imagemap && c.is("area") ? n = N.imagemap(this, c, p, N.viewport ? m : S) : N.svg && c[0].ownerSVGElement ? n = N.svg(this, c, p, N.viewport ? m : S) : (b = c.outerWidth(S), w = c.outerHeight(S), _ = c.offset()), n && (b = n.width, w = n.height, r = n.offset, _ = n.position), _ = this.reposition.offset(c, _, f), (BROWSER.iOS > 3.1 && 4.1 > BROWSER.iOS || BROWSER.iOS >= 4.3 && 4.33 > BROWSER.iOS || !BROWSER.iOS && "fixed" === x) && (_.left -= j.scrollLeft(), _.top -= j.scrollTop()), (!n || n && n.adjustable !== S) && (_.left += p.x === A ? b : p.x === F ? b / 2 : 0, _.top += p.y === V ? w : p.y === F ? w / 2 : 0)
            }
            return _.left += g.x + (d.x === A ? -v : d.x === F ? -v / 2 : 0), _.top += g.y + (d.y === V ? -y : d.y === F ? -y / 2 : 0), N.viewport ? (_.adjusted = N.viewport(this, _, h, b, w, v, y), r && _.adjusted.left && (_.left += r.left), r && _.adjusted.top && (_.top += r.top)) : _.adjusted = { left: 0, top: 0 }, this._trigger("move", [_, u.elem || u], i) ? (delete _.adjusted, o === S || !T || isNaN(_.left) || isNaN(_.top) || "mouse" === c || !s.isFunction(h.effect) ? l.css(_) : s.isFunction(h.effect) && (h.effect.call(l, this, s.extend({}, _)), l.queue(function (t) { s(this).css({ opacity: "", height: "" }), BROWSER.ie && this.style.removeAttribute("filter"), t() })), this.positioning = S, this) : this
        }).offset = function (t, i, o) {
            function n(t, e) { i.left += e * t.scrollLeft(), i.top += e * t.scrollTop() }
            if (!o[0]) return i;
            var r, a, l, h, c = s(t[0].ownerDocument),
                d = !!BROWSER.ie && "CSS1Compat" !== e.compatMode,
                p = o[0];
            do "static" !== (a = s.css(p, "position")) && ("fixed" === a ? (l = p.getBoundingClientRect(), n(c, -1)) : (l = s(p).position(), l.left += parseFloat(s.css(p, "borderLeftWidth")) || 0, l.top += parseFloat(s.css(p, "borderTopWidth")) || 0), i.left -= l.left + (parseFloat(s.css(p, "marginLeft")) || 0), i.top -= l.top + (parseFloat(s.css(p, "marginTop")) || 0), r || "hidden" === (h = s.css(p, "overflow")) || "visible" === h || (r = p)); while (p = p.offsetParent);
            return (r && r !== c[0] || d) && n(r, 1), i
        }, j.toggle = function (t, i) {
            var o = this.cache,
                n = this.options,
                r = this.tooltip;
            if (i) {
                if (/over|enter/.test(i.type) && /out|leave/.test(o.event.type) && n.show.target.add(i.target).length === n.show.target.length && r.has(i.relatedTarget).length) return this;
                o.event = s.extend({}, i)
            }
            if (this.waiting && !t && (this.hiddenDuringWait = W), !this.rendered) return t ? this.render(1) : this;
            if (this.destroyed) return this;
            var a, l, h = t ? "show" : "hide",
                c = this.options[h],
                d = (this.options[t ? "hide" : "show"], this.options.position),
                p = this.options.content,
                u = this.tooltip.css("width"),
                f = this.tooltip[0].offsetWidth > 0,
                g = t || 1 === c.target.length,
                m = !i || 2 > c.target.length || o.target[0] === i.target;
            return (typeof t).search("boolean|number") && (t = !f), a = !r.is(":animated") && f === t && m, l = a ? E : !!this._trigger(h, [90]), l !== S && t && this.focus(i), !l || a ? this : (s.attr(r[0], "aria-hidden", !t), t ? (o.origin = s.extend({}, this.mouse), s.isFunction(p.text) && this._updateContent(p.text, S), s.isFunction(p.title) && this._updateTitle(p.title, S), !z && "mouse" === d.target && d.adjust.mouse && (s(e).bind("mousemove." + X, this._storeMouse), z = W), u || r.css("width", r.outerWidth(S)), this.reposition(i, arguments[2]), u || r.css("width", ""), c.solo && ("string" == typeof c.solo ? s(c.solo) : s(G, c.solo)).not(r).not(c.target).qtip("hide", s.Event("tooltipsolo"))) : (clearTimeout(this.timers.show), delete o.origin, z && !s(G + '[tracking="true"]:visible', c.solo).not(r).length && (s(e).unbind("mousemove." + X), z = S), this.blur(i)), after = s.proxy(function () { t ? (BROWSER.ie && r[0].style.removeAttribute("filter"), r.css("overflow", ""), "string" == typeof c.autofocus && s(this.options.show.autofocus, r).focus(), this.options.show.target.trigger("qtip-" + this.id + "-inactive")) : r.css({ display: "", visibility: "", opacity: "", left: "", top: "" }), this._trigger(t ? "visible" : "hidden") }, this), c.effect === S || g === S ? (r[h](), after()) : s.isFunction(c.effect) ? (r.stop(1, 1), c.effect.call(r, this), r.queue("fx", function (t) { after(), t() })) : r.fadeTo(90, t ? 1 : 0, after), t && c.target.trigger("qtip-" + this.id + "-inactive"), this)
        }, j.show = function (t) { return this.toggle(W, t) }, j.hide = function (t) { return this.toggle(S, t) }, j.focus = function (t) {
            if (!this.rendered || this.destroyed) return this;
            var e = s(G),
                i = this.tooltip,
                o = parseInt(i[0].style.zIndex, 10),
                n = C.zindex + e.length;
            return i.hasClass(Q) || this._trigger("focus", [n], t) && (o !== n && (e.each(function () { this.style.zIndex > o && (this.style.zIndex = this.style.zIndex - 1) }), e.filter("." + Q).qtip("blur", t)), i.addClass(Q)[0].style.zIndex = n), this
        }, j.blur = function (t) { return !this.rendered || this.destroyed ? this : (this.tooltip.removeClass(Q), this._trigger("blur", [this.tooltip.css("zIndex")], t), this) }, j.disable = function (t) { return this.destroyed ? this : ("boolean" != typeof t && (t = !(this.tooltip.hasClass(K) || this.disabled)), this.rendered && this.tooltip.toggleClass(K, t).attr("aria-disabled", t), this.disabled = !!t, this) }, j.enable = function () { return this.disable(S) }, j._createButton = function () {
            var t = this,
                e = this.elements,
                i = e.tooltip,
                o = this.options.content.button,
                n = "string" == typeof o,
                r = n ? o : "Close tooltip";
            e.button && e.button.remove(), e.button = o.jquery ? o : s("<a />", { "class": "qtip-close " + (this.options.style.widget ? "" : X + "-icon"), title: r, "aria-label": r }).prepend(s("<span />", { "class": "ui-icon ui-icon-close", html: "&times;" })), e.button.appendTo(e.titlebar || i).attr("role", "button").click(function (e) { return i.hasClass(K) || t.hide(e), S })
        }, j._updateButton = function (t) {
            if (!this.rendered) return S;
            var e = this.elements.button;
            t ? this._createButton() : e.remove()
        }, j._setWidget = function () {
            var t = this.options.style.widget,
                e = this.elements,
                i = e.tooltip,
                o = i.hasClass(K);
            i.removeClass(K), K = t ? "ui-state-disabled" : "qtip-disabled", i.toggleClass(K, o), i.toggleClass("ui-helper-reset " + d(), t).toggleClass(U, this.options.style.def && !t), e.content && e.content.toggleClass(d("content"), t), e.titlebar && e.titlebar.toggleClass(d("header"), t), e.button && e.button.toggleClass(X + "-icon", !t)
        }, j._storeMouse = function (i) { this.mouse = { pageX: i.pageX, pageY: i.pageY, type: "mousemove", scrollX: t.pageXOffset || e.body.scrollLeft || e.documentElement.scrollLeft, scrollY: t.pageYOffset || e.body.scrollTop || e.documentElement.scrollTop } }, j._bind = function (t, e, i, o) {
            var n = "." + this._id + (o || "");
            e.length && t.bind((e.split ? e : e.join(n + " ")) + n, s.proxy(i, this))
        }, j._trigger = function (t, e, i) { var o = s.Event("tooltip" + t); return o.originalEvent = i && s.extend({}, i) || this.cache.event || E, this.triggering = W, this.tooltip.trigger(o, [this].concat(e || [])), this.triggering = S, !o.isDefaultPrevented() }, j._assignEvents = function () {
            var i = this.options,
                n = i.position,
                r = this.tooltip,
                a = i.show.target,
                l = i.hide.target,
                h = n.container,
                c = n.viewport,
                d = s(e),
                m = (s(e.body), s(t)),
                v = i.show.event ? s.trim("" + i.show.event).split(" ") : [],
                y = i.hide.event ? s.trim("" + i.hide.event).split(" ") : [],
                b = [];
            this._bind(r, ["mouseenter", "mouseleave"], function (t) {
                var e = "mouseenter" === t.type;
                e && this.focus(t), r.toggleClass(J, e)
            }), /mouse(out|leave)/i.test(i.hide.event) && "window" === i.hide.leave && this._bind(d, ["mouseout", "blur"], function (t) { /select|option/.test(t.target.nodeName) || t.relatedTarget || this.hide(t) }), i.hide.fixed ? (l = l.add(r), this._bind(r, "mouseover", function () { !this.tooltip.hasClass(K) && clearTimeout(this.timers.hide) })) : /mouse(over|enter)/i.test(i.show.event) && this._bind(l, "mouseleave", function () { clearTimeout(this.timers.show) }), ("" + i.hide.event).indexOf("unfocus") > -1 && this._bind(h.closest("html"), ["mousedown", "touchstart"], function (t) {
                var e = s(t.target),
                    i = this.rendered && !this.tooltip.hasClass(K) && this.tooltip[0].offsetWidth > 0,
                    o = e.parents(G).filter(this.tooltip[0]).length > 0;
                e[0] === this.target[0] || e[0] === this.tooltip[0] || o || this.target.has(e[0]).length || !i || this.hide(t)
            }), "number" == typeof i.hide.inactive && (a.bind("qtip-" + this.id + "-inactive", s.proxy(f, this)), this._bind(l.add(r), C.inactiveEvents, f, "-inactive")), y = s.map(y, function (t) { var e = s.inArray(t, v); return e > -1 && l.add(a).length === l.length ? (b.push(v.splice(e, 1)[0]), o) : t }), this._bind(a, v, p), this._bind(l, y, u), this._bind(a, b, function (t) {
                (this.tooltip[0].offsetWidth > 0 ? u : p).call(this, t)
            }), "number" == typeof i.hide.distance && this._bind(a.add(r), "mousemove", function (t) {
                var e = this.cache.origin || {},
                    i = this.options.hide.distance,
                    o = Math.abs;
                (o(t.pageX - e.pageX) >= i || o(t.pageY - e.pageY) >= i) && this.hide(t)
            }), "mouse" === n.target && (this._bind(a.add(r), "mousemove", this._storeMouse), i.hide.event && this._bind(r, "mouseleave", function (t) { !s(t.relatedTarget || t.target).closest(a[0]).length && this.hide(t) }), n.adjust.mouse && (i.hide.event && this._bind(a, ["mouseenter", "mouseleave"], function (t) { this.cache.onTarget = "mouseenter" === t.type }), this._bind(d, "mousemove", function (t) { this.rendered && this.cache.onTarget && !this.tooltip.hasClass(K) && this.tooltip[0].offsetWidth > 0 && this.reposition(t || this.mouse) }))), (n.adjust.resize || c.length) && this._bind(s.event.special.resize ? c : m, "resize", g), n.adjust.scroll && this._bind(m.add(n.container), "scroll", g)
        }, j._unassignEvents = function () {
            var i = [this.options.show.target[0], this.options.hide.target[0], this.rendered && this.tooltip[0], this.options.position.container[0], this.options.position.viewport[0], this.options.position.container.closest("html")[0], t, e];
            this.rendered ? s([]).pushStack(s.grep(i, function (t) { return "object" == typeof t })).unbind("." + this._id) : s(i[0]).unbind("." + this._id + "-create")
        }, C = s.fn.qtip = function (t, e, i) {
            var n = ("" + t).toLowerCase(),
                r = E,
                a = s.makeArray(arguments).slice(1),
                h = a[a.length - 1],
                c = this[0] ? s.data(this[0], X) : E;
            return !arguments.length && c || "api" === n ? c : "string" == typeof t ? (this.each(function () {
                var t = s.data(this, X);
                if (!t) return W;
                if (h && h.timeStamp && (t.cache.event = h), "option" !== n && "options" !== n || !e) t[n] && t[n].apply(t, a);
                else {
                    if (!s.isPlainObject(e) && i === o) return r = t.get(e), S;
                    t.set(e, i)
                }
            }), r !== E ? r : this) : "object" != typeof t && arguments.length ? o : (c = l(s.extend(W, {}, t)), C.bind.call(this, c, h))
        }, C.bind = function (t, e) {
            return this.each(function (i) {
                function n(t) {
                    function e() { c.render("object" == typeof t || r.show.ready), a.show.add(a.hide).unbind(h) }
                    return c.disabled ? S : (c.cache.event = s.extend({}, t), c.cache.target = t ? s(t.target) : [o], r.show.delay > 0 ? (clearTimeout(c.timers.show), c.timers.show = setTimeout(e, r.show.delay), l.show !== l.hide && a.hide.bind(l.hide, function () { clearTimeout(c.timers.show) })) : e(), o)
                }
                var r, a, l, h, c, d;
                return d = s.isArray(t.id) ? t.id[i] : t.id, d = !d || d === S || 1 > d.length || H[d] ? C.nextid++ : H[d] = d, h = ".qtip-" + d + "-create", c = m(s(this), d, t), c === S ? W : (r = c.options, s.each(N, function () { "initialize" === this.initialize && this(c) }), a = { show: r.show.target, hide: r.hide.target }, l = { show: s.trim("" + r.show.event).replace(/ /g, h + " ") + h, hide: s.trim("" + r.hide.event).replace(/ /g, h + " ") + h }, /mouse(over|enter)/i.test(l.show) && !/mouse(out|leave)/i.test(l.hide) && (l.hide += " mouseleave" + h), a.show.bind("mousemove" + h, function (t) { c._storeMouse(t), c.cache.onTarget = W }), a.show.bind(l.show, n), (r.show.ready || r.prerender) && n(e), o)
            })
        }, s.each({
            attr: function (t, e) {
                if (this.length) {
                    var i = this[0],
                        o = "title",
                        n = s.data(i, "qtip");
                    if (t === o && n && "object" == typeof n && n.options.suppress) return 2 > arguments.length ? s.attr(i, te) : (n && n.options.content.attr === o && n.cache.attr && n.set("content.text", e), this.attr(te, e))
                }
                return s.fn["attr" + Z].apply(this, arguments)
            },
            clone: function (t) { var e = (s([]), s.fn["clone" + Z].apply(this, arguments)); return t || e.filter("[" + te + "]").attr("title", function () { return s.attr(this, te) }).removeAttr(te), e }
        }, function (t, e) {
            if (!e || s.fn[t + Z]) return W;
            var i = s.fn[t + Z] = s.fn[t];
            s.fn[t] = function () { return e.apply(this, arguments) || i.apply(this, arguments) }
        }), s.ui || (s["cleanData" + Z] = s.cleanData, s.cleanData = function (t) {
            for (var e, i = 0;
                (e = s(t[i])).length && e.attr($); i++) try { e.triggerHandler("removeqtip") } catch (o) { }
            s["cleanData" + Z](t)
        }), C.version = "2.0.1-83-", C.nextid = 0, C.inactiveEvents = "click dblclick mousedown mouseup mousemove mouseleave mouseenter".split(" "), C.zindex = 15e3, C.defaults = { prerender: S, id: S, overwrite: W, suppress: W, content: { text: W, attr: "title", title: S, button: S }, position: { my: "top left", at: "bottom right", target: S, container: S, viewport: S, adjust: { x: 0, y: 0, mouse: W, scroll: W, resize: W, method: "flipinvert flipinvert" }, effect: function (t, e) { s(this).animate(e, { duration: 200, queue: S }) } }, show: { target: S, event: "mouseenter", effect: W, delay: 90, solo: S, ready: S, autofocus: S }, hide: { target: S, event: "mouseleave", effect: W, delay: 0, fixed: S, inactive: S, leave: "window", distance: S }, style: { classes: "", widget: S, width: S, height: S, def: W }, events: { render: E, move: E, show: E, hide: E, toggle: E, visible: E, hidden: E, focus: E, blur: E } };
        var se, ne, re = ".qtip-tip",
            ae = "margin",
            le = "border",
            he = "color",
            ce = "background-color",
            de = "transparent",
            pe = " !important",
            ue = !!e.createElement("canvas").getContext,
            fe = /rgba?\(0, 0, 0(, 0)?\)|transparent|#123456/i;
        if (s.curCSS) {
            var ge = {},
                me = ["Webkit", "O", "Moz", "ms"];
            ne = function (t, e) {
                var i, s, n, r = e.charAt(0).toUpperCase() + e.slice(1),
                    a = (e + " " + me.join(r + " ") + r).split(" ");
                if (ge[e]) return t.css(ge[e]);
                for (n in a)
                    if (i = a[n], (s = t.css(i)) !== o) return ge[e] = i, s
            }
        } else ne = function (t, e) { return t.css(e) };
        ue || (createVML = function (t, e, i) { return "<qvml:" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="qtip-vml" ' + (e || "") + ' style="behavior: url(#default#VML); ' + (i || "") + '" />' }), se = N.tip = function (t) { return new x(t) }, se.initialize = "render", se.sanitize = function (t) {
            var e, i = t.style;
            i && "tip" in i && (e = t.style.tip, "object" != typeof e && (t.style.tip = { corner: e }), /string|boolean/i.test(typeof e.corner) || (e.corner = W), "number" != typeof e.width && delete e.width, "number" != typeof e.height && delete e.height, "number" != typeof e.border && e.border !== W && delete e.border, "number" != typeof e.offset && delete e.offset)
        }, M.tip = { "^position.my|style.tip.(corner|mimic|border)$": function () { !this.init() && this.destroy(), this.qtip.reposition() }, "^style.tip.(height|width)$": function (t) { this.size = size = [t.width, t.height], this.create(), this.update(), this.qtip.reposition() }, "^content.title|style.(classes|widget)$": function () { this.update() } }, s.extend(W, C.defaults, { style: { tip: { corner: W, mimic: S, width: 6, height: 6, border: W, offset: 0 } } });
        var ve, ye, be = "qtip-modal",
            we = "." + be;
        ye = function () {
            function i(t) {
                if (s.expr[":"].focusable) return s.expr[":"].focusable;
                var e, i, o, n = !isNaN(s.attr(t, "tabindex")),
                    r = t.nodeName && t.nodeName.toLowerCase();
                return "area" === r ? (e = t.parentNode, i = e.name, t.href && i && "map" === e.nodeName.toLowerCase() ? (o = s("img[usemap=#" + i + "]")[0], !!o && o.is(":visible")) : !1) : /input|select|textarea|button|object/.test(r) ? !t.disabled : "a" === r ? t.href || n : n
            }

            function o(t) { 1 > d.length && t.length ? t.not("body").blur() : d.first().focus() }

            function n(t) {
                if (h.is(":visible")) {
                    var e, i = s(t.target),
                        n = r.tooltip,
                        l = i.closest(G);
                    e = 1 > l.length ? S : parseInt(l[0].style.zIndex, 10) > parseInt(n[0].style.zIndex, 10), e || i.closest(G)[0] === n[0] || o(i), a = t.target === d[d.length - 1]
                }
            }
            var r, a, l, h, c = this,
                d = {};
            s.extend(c, {
                init: function () {
                    function i() {
                        var t = s(this);
                        h.css({ height: t.height(), width: t.width() })
                    }
                    return h = c.elem = s("<div />", { id: "qtip-overlay", html: "<div></div>", mousedown: function () { return S } }).hide(), s(t).bind("resize" + we, i), i(), s(e.body).bind("focusin" + we, n), s(e).bind("keydown" + we, function (t) { r && r.options.show.modal.escape && 27 === t.keyCode && r.hide(t) }), h.bind("click" + we, function (t) { r && r.options.show.modal.blur && r.hide(t) }), c
                },
                update: function (t) { r = t, d = t.options.show.modal.stealfocus !== S ? t.tooltip.find("*").filter(function () { return i(this) }) : [] },
                toggle: function (t, i, n) {
                    var a = (s(e.body), t.tooltip),
                        d = t.options.show.modal,
                        p = d.effect,
                        u = i ? "show" : "hide",
                        f = h.is(":visible"),
                        g = s(we).filter(":visible:not(:animated)").not(a);
                    return c.update(t), i && d.stealfocus !== S && o(s(":focus")), h.toggleClass("blurs", d.blur), i && h.css({ left: 0, top: 0 }).appendTo(e.body), h.is(":animated") && f === i && l !== S || !i && g.length ? c : (h.stop(W, S), s.isFunction(p) ? p.call(h, i) : p === S ? h[u]() : h.fadeTo(parseInt(n, 10) || 90, i ? 1 : 0, function () { i || h.hide() }), i || h.queue(function (t) { h.css({ left: "", top: "" }), s(we).length || h.detach(), t() }), l = i, r.destroyed && (r = E), c)
                }
            }), c.init()
        }, ye = new ye, ve = N.modal = function (t) { return new _(t) }, ve.sanitize = function (t) { t.show && ("object" != typeof t.show.modal ? t.show.modal = { on: !!t.show.modal } : t.show.modal.on === o && (t.show.modal.on = W)) }, ve.zindex = C.zindex - 200, ve.initialize = "render", M.modal = { "^show.modal.(on|blur)$": function () { this.destroy(), this.init(), this.qtip.elems.overlay.toggle(this.qtip.tooltip[0].offsetWidth > 0) } }, s.extend(W, C.defaults, { show: { modal: { on: S, effect: W, blur: W, stealfocus: W, escape: W } } }), N.viewport = function (i, o, s, n, r, a, l) {
            function h(t, e, i, s, n, r, a, l, h) {
                var c = o[n],
                    p = g[t],
                    u = m[t],
                    f = i === D,
                    v = -_.offset[n] + x.offset[n] + x["scroll" + n],
                    y = p === n ? h : p === r ? -h : -h / 2,
                    b = u === n ? l : u === r ? -l : -l / 2,
                    w = C && C.size ? C.size[a] || 0 : 0,
                    T = C && C.corner && C.corner.precedance === t && !f ? w : 0,
                    j = v - c + T,
                    q = c + h - x[a] - v + T,
                    M = y - (g.precedance === t || p === g[e] ? b : 0) - (u === F ? l / 2 : 0);
                return f ? (T = C && C.corner && C.corner.precedance === e ? w : 0, M = (p === n ? 1 : -1) * y - T, o[n] += j > 0 ? j : q > 0 ? -q : 0, o[n] = Math.max(-_.offset[n] + x.offset[n] + (T && C.corner[t] === F ? C.offset : 0), c - M, Math.min(Math.max(-_.offset[n] + x.offset[n] + x[a], c + M), o[n]))) : (s *= i === P ? 2 : 0, j > 0 && (p !== n || q > 0) ? (o[n] -= M + s, d.invert(t, n)) : q > 0 && (p !== r || j > 0) && (o[n] -= (p === F ? -M : M) + s, d.invert(t, r)), v > o[n] && -o[n] > q && (o[n] = c, d = g.clone())), o[n] - c
            }
            var c, d, p, u = s.target,
                f = i.elements.tooltip,
                g = s.my,
                m = s.at,
                v = s.adjust,
                y = v.method.split(" "),
                b = y[0],
                w = y[1] || y[0],
                x = s.viewport,
                _ = s.container,
                T = i.cache,
                C = i.plugins.tip,
                j = { left: 0, top: 0 };
            return x.jquery && u[0] !== t && u[0] !== e.body && "none" !== v.method ? (c = "fixed" === f.css("position"), x = { elem: x, width: x[0] === t ? x.width() : x.outerWidth(S), height: x[0] === t ? x.height() : x.outerHeight(S), scrollleft: c ? 0 : x.scrollLeft(), scrolltop: c ? 0 : x.scrollTop(), offset: x.offset() || { left: 0, top: 0 } }, _ = { elem: _, scrollLeft: _.scrollLeft(), scrollTop: _.scrollTop(), offset: _.offset() || { left: 0, top: 0 } }, ("shift" !== b || "shift" !== w) && (d = g.clone()), j = { left: "none" !== b ? h(O, R, b, v.x, L, A, k, n, a) : 0, top: "none" !== w ? h(R, O, w, v.y, B, V, I, r, l) : 0 }, d && T.lastClass !== (p = X + "-pos-" + d.abbrev()) && f.removeClass(i.cache.lastClass).addClass(i.cache.lastClass = p), j) : j
        }, N.polys = {
            polygon: function (t, e) {
                var i, o, s, n = { width: 0, height: 0, position: { top: 1e10, right: 0, bottom: 0, left: 1e10 }, adjustable: S },
                    r = 0,
                    a = [],
                    l = 1,
                    h = 1,
                    c = 0,
                    d = 0;
                for (r = t.length; r--;) i = [parseInt(t[--r], 10), parseInt(t[r + 1], 10)], i[0] > n.position.right && (n.position.right = i[0]), i[0] < n.position.left && (n.position.left = i[0]), i[1] > n.position.bottom && (n.position.bottom = i[1]), i[1] < n.position.top && (n.position.top = i[1]), a.push(i);
                if (o = n.width = Math.abs(n.position.right - n.position.left), s = n.height = Math.abs(n.position.bottom - n.position.top), "c" === e.abbrev()) n.position = { left: n.position.left + n.width / 2, top: n.position.top + n.height / 2 };
                else {
                    for (; o > 0 && s > 0 && l > 0 && h > 0;)
                        for (o = Math.floor(o / 2), s = Math.floor(s / 2), e.x === L ? l = o : e.x === A ? l = n.width - o : l += Math.floor(o / 2), e.y === B ? h = s : e.y === V ? h = n.height - s : h += Math.floor(s / 2), r = a.length; r-- && !(2 > a.length);) c = a[r][0] - n.position.left, d = a[r][1] - n.position.top, (e.x === L && c >= l || e.x === A && l >= c || e.x === F && (l > c || c > n.width - l) || e.y === B && d >= h || e.y === V && h >= d || e.y === F && (h > d || d > n.height - h)) && a.splice(r, 1);
                    n.position = { left: a[0][0], top: a[0][1] }
                }
                return n
            },
            rect: function (t, e, i, o) { return { width: Math.abs(i - t), height: Math.abs(o - e), position: { left: Math.min(t, i), top: Math.min(e, o) } } },
            _angles: { tc: 1.5, tr: 7 / 4, tl: 5 / 4, bc: .5, br: .25, bl: .75, rc: 2, lc: 1, c: 0 },
            ellipse: function (t, e, i, o, s) {
                var n = N.polys._angles[s.abbrev()],
                    r = i * Math.cos(n * Math.PI),
                    a = o * Math.sin(n * Math.PI);
                return { width: 2 * i - Math.abs(r), height: 2 * o - Math.abs(a), position: { left: t + r, top: e + a }, adjustable: S }
            },
            circle: function (t, e, i, o) { return N.polys.ellipse(t, e, i, i, o) }
        }, N.svg = function (t, o, n) {
            for (var r, a, l = s(e), h = o[0], c = S; !h.getBBox;) h = h.parentNode;
            if (!h.getBBox || !h.parentNode) return S;
            switch (h.nodeName) {
                case "rect":
                    r = N.svg.toPixel(h, h.x.baseVal.value, h.y.baseVal.value), a = N.svg.toPixel(h, h.x.baseVal.value + h.width.baseVal.value, h.y.baseVal.value + h.height.baseVal.value), c = N.polys.rect(r[0], r[1], a[0], a[1], n);
                    break;
                case "ellipse":
                case "circle":
                    r = N.svg.toPixel(h, h.cx.baseVal.value, h.cy.baseVal.value), c = N.polys.ellipse(r[0], r[1], (h.rx || h.r).baseVal.value, (h.ry || h.r).baseVal.value, n);
                    break;
                case "line":
                case "polygon":
                case "polyline":
                    for (points = h.points || [{ x: h.x1.baseVal.value, y: h.y1.baseVal.value }, { x: h.x2.baseVal.value, y: h.y2.baseVal.value }], c = [], i = -1, len = points.numberOfItems || points.length; len > ++i;) next = points.getItem ? points.getItem(i) : points[i], c.push.apply(c, N.svg.toPixel(h, next.x, next.y));
                    c = N.polys.polygon(c, n);
                    break;
                default:
                    return S
            }
            return c.position.left += l.scrollLeft(), c.position.top += l.scrollTop(), c
        }, N.svg.toPixel = function (t, e, i) {
            var o, s, n = t.getScreenCTM(),
                r = t.farthestViewportElement || t;
            return r.createSVGPoint ? (s = r.createSVGPoint(), s.x = e, s.y = i, o = s.matrixTransform(n), [o.x, o.y]) : S
        }, N.imagemap = function (t, e, i) {
            e.jquery || (e = s(e));
            var o, n, r, a = e.attr("shape").toLowerCase().replace("poly", "polygon"),
                l = s('img[usemap="#' + e.parent("map").attr("name") + '"]'),
                h = e.attr("coords"),
                c = h.split(",");
            if (!l.length) return S;
            if ("polygon" === a) result = N.polys.polygon(c, i);
            else {
                if (!N.polys[a]) return S;
                for (r = -1, len = c.length, n = []; len > ++r;) n.push(parseInt(c[r], 10));
                result = N.polys[a].apply(this, n.concat(i))
            }
            return o = l.offset(), o.left += Math.ceil((l.outerWidth(S) - l.width()) / 2), o.top += Math.ceil((l.outerHeight(S) - l.height()) / 2), result.position.left += o.left, result.position.top += o.top, result
        };
        var xe;
        xe = BROWSER.ie6 = function (t) { return 6 === BROWSER.ie ? new T(t) : S }, xe.initialize = "render", M.ie6 = { "^content|style$": function () { this.redraw() } }
    })
})(window, document);

(function (c, q) {
    var m = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    c.fn.imagesLoaded = function (f) {
        function n() {
            var b = c(j),
                a = c(h);
            d && (h.length ? d.reject(e, b, a) : d.resolve(e));
            c.isFunction(f) && f.call(g, e, b, a)
        }

        function p(b) { k(b.target, "error" === b.type) }

        function k(b, a) {
            b.src === m || -1 !== c.inArray(b, l) || (l.push(b), a ? h.push(b) : j.push(b), c.data(b, "imagesLoaded", { isBroken: a, src: b.src }), r && d.notifyWith(c(b), [a, e, c(j), c(h)]), e.length === l.length && (setTimeout(n), e.unbind(".imagesLoaded",
                p)))
        }
        var g = this,
            d = c.isFunction(c.Deferred) ? c.Deferred() : 0,
            r = c.isFunction(d.notify),
            e = g.find("img").add(g.filter("img")),
            l = [],
            j = [],
            h = [];
        c.isPlainObject(f) && c.each(f, function (b, a) {
            if ("callback" === b) f = a;
            else if (d) d[b](a)
        });
        e.length ? e.bind("load.imagesLoaded error.imagesLoaded", p).each(function (b, a) {
            var d = a.src,
                e = c.data(a, "imagesLoaded");
            if (e && e.src === d) k(a, e.isBroken);
            else if (a.complete && a.naturalWidth !== q) k(a, 0 === a.naturalWidth || 0 === a.naturalHeight);
            else if (a.readyState || a.complete) a.src = m, a.src = d
        }) :
            n();
        return d ? d.promise(g) : g
    }
})(jQuery);

/*! jQuery UI - v1.12.1
 * http://jqueryui.com
 * Includes: widget.js, data.js, keycode.js, scroll-parent.js, widgets/draggable.js, widgets/datepicker.js, widgets/mouse.js
 * Copyright jQuery Foundation and other contributors; Licensed MIT */
(function (t) { "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery) })(function (t) {
    function e(t) {
        for (var e, i; t.length && t[0] !== document;) {
            if (e = t.css("position"), ("absolute" === e || "relative" === e || "fixed" === e) && (i = parseInt(t.css("zIndex"), 10), !isNaN(i) && 0 !== i)) return i;
            t = t.parent()
        }
        return 0
    }

    function i() { this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = { closeText: "Done", prevText: "Prev", nextText: "Next", currentText: "Today", monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], weekHeader: "Wk", dateFormat: "mm/dd/yy", firstDay: 0, isRTL: !1, showMonthAfterYear: !1, yearSuffix: "" }, this._defaults = { showOn: "focus", showAnim: "fadeIn", showOptions: {}, defaultDate: null, appendText: "", buttonText: "...", buttonImage: "", buttonImageOnly: !1, hideIfNoPrevNext: !1, navigationAsDateFormat: !1, gotoCurrent: !1, changeMonth: !1, changeYear: !1, yearRange: "c-10:c+10", showOtherMonths: !1, selectOtherMonths: !1, showWeek: !1, calculateWeek: this.iso8601Week, shortYearCutoff: "+10", minDate: null, maxDate: null, duration: "fast", beforeShowDay: null, beforeShow: null, onSelect: null, onChangeMonthYear: null, onClose: null, numberOfMonths: 1, showCurrentAtPos: 0, stepMonths: 1, stepBigMonths: 12, altField: "", altFormat: "", constrainInput: !0, showButtonPanel: !1, autoSize: !1, disabled: !1 }, t.extend(this._defaults, this.regional[""]), this.regional.en = t.extend(!0, {}, this.regional[""]), this.regional["en-US"] = t.extend(!0, {}, this.regional.en), this.dpDiv = s(t("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) }

    function s(e) { var i = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a"; return e.on("mouseout", i, function () { t(this).removeClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && t(this).removeClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && t(this).removeClass("ui-datepicker-next-hover") }).on("mouseover", i, n) }

    function n() { t.datepicker._isDisabledDatepicker(l.inline ? l.dpDiv.parent()[0] : l.input[0]) || (t(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), t(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && t(this).addClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && t(this).addClass("ui-datepicker-next-hover")) }

    function a(e, i) { t.extend(e, i); for (var s in i) null == i[s] && (e[s] = i[s]); return e }
    t.ui = t.ui || {}, t.ui.version = "1.12.1";
    var o = 0,
        r = Array.prototype.slice;
    t.cleanData = function (e) {
        return function (i) {
            var s, n, a;
            for (a = 0; null != (n = i[a]); a++) try { s = t._data(n, "events"), s && s.remove && t(n).triggerHandler("remove") } catch (o) { }
            e(i)
        }
    }(t.cleanData), t.widget = function (e, i, s) {
        var n, a, o, r = {},
            h = e.split(".")[0];
        e = e.split(".")[1];
        var l = h + "-" + e;
        return s || (s = i, i = t.Widget), t.isArray(s) && (s = t.extend.apply(null, [{}].concat(s))), t.expr[":"][l.toLowerCase()] = function (e) { return !!t.data(e, l) }, t[h] = t[h] || {}, n = t[h][e], a = t[h][e] = function (t, e) { return this._createWidget ? (arguments.length && this._createWidget(t, e), void 0) : new a(t, e) }, t.extend(a, n, { version: s.version, _proto: t.extend({}, s), _childConstructors: [] }), o = new i, o.options = t.widget.extend({}, o.options), t.each(s, function (e, s) {
            return t.isFunction(s) ? (r[e] = function () {
                function t() { return i.prototype[e].apply(this, arguments) }

                function n(t) { return i.prototype[e].apply(this, t) }
                return function () {
                    var e, i = this._super,
                        a = this._superApply;
                    return this._super = t, this._superApply = n, e = s.apply(this, arguments), this._super = i, this._superApply = a, e
                }
            }(), void 0) : (r[e] = s, void 0)
        }), a.prototype = t.widget.extend(o, { widgetEventPrefix: n ? o.widgetEventPrefix || e : e }, r, { constructor: a, namespace: h, widgetName: e, widgetFullName: l }), n ? (t.each(n._childConstructors, function (e, i) {
            var s = i.prototype;
            t.widget(s.namespace + "." + s.widgetName, a, i._proto)
        }), delete n._childConstructors) : i._childConstructors.push(a), t.widget.bridge(e, a), a
    }, t.widget.extend = function (e) {
        for (var i, s, n = r.call(arguments, 1), a = 0, o = n.length; o > a; a++)
            for (i in n[a]) s = n[a][i], n[a].hasOwnProperty(i) && void 0 !== s && (e[i] = t.isPlainObject(s) ? t.isPlainObject(e[i]) ? t.widget.extend({}, e[i], s) : t.widget.extend({}, s) : s);
        return e
    }, t.widget.bridge = function (e, i) {
        var s = i.prototype.widgetFullName || e;
        t.fn[e] = function (n) {
            var a = "string" == typeof n,
                o = r.call(arguments, 1),
                h = this;
            return a ? this.length || "instance" !== n ? this.each(function () { var i, a = t.data(this, s); return "instance" === n ? (h = a, !1) : a ? t.isFunction(a[n]) && "_" !== n.charAt(0) ? (i = a[n].apply(a, o), i !== a && void 0 !== i ? (h = i && i.jquery ? h.pushStack(i.get()) : i, !1) : void 0) : t.error("no such method '" + n + "' for " + e + " widget instance") : t.error("cannot call methods on " + e + " prior to initialization; " + "attempted to call method '" + n + "'") }) : h = void 0 : (o.length && (n = t.widget.extend.apply(null, [n].concat(o))), this.each(function () {
                var e = t.data(this, s);
                e ? (e.option(n || {}), e._init && e._init()) : t.data(this, s, new i(n, this))
            })), h
        }
    }, t.Widget = function () { }, t.Widget._childConstructors = [], t.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: { classes: {}, disabled: !1, create: null },
        _createWidget: function (e, i) { i = t(i || this.defaultElement || this)[0], this.element = t(i), this.uuid = o++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = t(), this.hoverable = t(), this.focusable = t(), this.classesElementLookup = {}, i !== this && (t.data(i, this.widgetFullName, this), this._on(!0, this.element, { remove: function (t) { t.target === i && this.destroy() } }), this.document = t(i.style ? i.ownerDocument : i.document || i), this.window = t(this.document[0].defaultView || this.document[0].parentWindow)), this.options = t.widget.extend({}, this.options, this._getCreateOptions(), e), this._create(), this.options.disabled && this._setOptionDisabled(this.options.disabled), this._trigger("create", null, this._getCreateEventData()), this._init() },
        _getCreateOptions: function () { return {} },
        _getCreateEventData: t.noop,
        _create: t.noop,
        _init: t.noop,
        destroy: function () {
            var e = this;
            this._destroy(), t.each(this.classesElementLookup, function (t, i) { e._removeClass(i, t) }), this.element.off(this.eventNamespace).removeData(this.widgetFullName), this.widget().off(this.eventNamespace).removeAttr("aria-disabled"), this.bindings.off(this.eventNamespace)
        },
        _destroy: t.noop,
        widget: function () { return this.element },
        option: function (e, i) {
            var s, n, a, o = e;
            if (0 === arguments.length) return t.widget.extend({}, this.options);
            if ("string" == typeof e)
                if (o = {}, s = e.split("."), e = s.shift(), s.length) {
                    for (n = o[e] = t.widget.extend({}, this.options[e]), a = 0; s.length - 1 > a; a++) n[s[a]] = n[s[a]] || {}, n = n[s[a]];
                    if (e = s.pop(), 1 === arguments.length) return void 0 === n[e] ? null : n[e];
                    n[e] = i
                } else {
                    if (1 === arguments.length) return void 0 === this.options[e] ? null : this.options[e];
                    o[e] = i
                }
            return this._setOptions(o), this
        },
        _setOptions: function (t) { var e; for (e in t) this._setOption(e, t[e]); return this },
        _setOption: function (t, e) { return "classes" === t && this._setOptionClasses(e), this.options[t] = e, "disabled" === t && this._setOptionDisabled(e), this },
        _setOptionClasses: function (e) { var i, s, n; for (i in e) n = this.classesElementLookup[i], e[i] !== this.options.classes[i] && n && n.length && (s = t(n.get()), this._removeClass(n, i), s.addClass(this._classes({ element: s, keys: i, classes: e, add: !0 }))) },
        _setOptionDisabled: function (t) { this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !!t), t && (this._removeClass(this.hoverable, null, "ui-state-hover"), this._removeClass(this.focusable, null, "ui-state-focus")) },
        enable: function () { return this._setOptions({ disabled: !1 }) },
        disable: function () { return this._setOptions({ disabled: !0 }) },
        _classes: function (e) {
            function i(i, a) { var o, r; for (r = 0; i.length > r; r++) o = n.classesElementLookup[i[r]] || t(), o = e.add ? t(t.unique(o.get().concat(e.element.get()))) : t(o.not(e.element).get()), n.classesElementLookup[i[r]] = o, s.push(i[r]), a && e.classes[i[r]] && s.push(e.classes[i[r]]) }
            var s = [],
                n = this;
            return e = t.extend({ element: this.element, classes: this.options.classes || {} }, e), this._on(e.element, { remove: "_untrackClassesElement" }), e.keys && i(e.keys.match(/\S+/g) || [], !0), e.extra && i(e.extra.match(/\S+/g) || []), s.join(" ")
        },
        _untrackClassesElement: function (e) {
            var i = this;
            t.each(i.classesElementLookup, function (s, n) { -1 !== t.inArray(e.target, n) && (i.classesElementLookup[s] = t(n.not(e.target).get())) })
        },
        _removeClass: function (t, e, i) { return this._toggleClass(t, e, i, !1) },
        _addClass: function (t, e, i) { return this._toggleClass(t, e, i, !0) },
        _toggleClass: function (t, e, i, s) {
            s = "boolean" == typeof s ? s : i;
            var n = "string" == typeof t || null === t,
                a = { extra: n ? e : i, keys: n ? t : e, element: n ? this.element : t, add: s };
            return a.element.toggleClass(this._classes(a), s), this
        },
        _on: function (e, i, s) {
            var n, a = this;
            "boolean" != typeof e && (s = i, i = e, e = !1), s ? (i = n = t(i), this.bindings = this.bindings.add(i)) : (s = i, i = this.element, n = this.widget()), t.each(s, function (s, o) {
                function r() { return e || a.options.disabled !== !0 && !t(this).hasClass("ui-state-disabled") ? ("string" == typeof o ? a[o] : o).apply(a, arguments) : void 0 }
                "string" != typeof o && (r.guid = o.guid = o.guid || r.guid || t.guid++);
                var h = s.match(/^([\w:-]*)\s*(.*)$/),
                    l = h[1] + a.eventNamespace,
                    u = h[2];
                u ? n.on(l, u, r) : i.on(l, r)
            })
        },
        _off: function (e, i) { i = (i || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, e.off(i).off(i), this.bindings = t(this.bindings.not(e).get()), this.focusable = t(this.focusable.not(e).get()), this.hoverable = t(this.hoverable.not(e).get()) },
        _delay: function (t, e) {
            function i() { return ("string" == typeof t ? s[t] : t).apply(s, arguments) }
            var s = this;
            return setTimeout(i, e || 0)
        },
        _hoverable: function (e) { this.hoverable = this.hoverable.add(e), this._on(e, { mouseenter: function (e) { this._addClass(t(e.currentTarget), null, "ui-state-hover") }, mouseleave: function (e) { this._removeClass(t(e.currentTarget), null, "ui-state-hover") } }) },
        _focusable: function (e) { this.focusable = this.focusable.add(e), this._on(e, { focusin: function (e) { this._addClass(t(e.currentTarget), null, "ui-state-focus") }, focusout: function (e) { this._removeClass(t(e.currentTarget), null, "ui-state-focus") } }) },
        _trigger: function (e, i, s) {
            var n, a, o = this.options[e];
            if (s = s || {}, i = t.Event(i), i.type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(), i.target = this.element[0], a = i.originalEvent)
                for (n in a) n in i || (i[n] = a[n]);
            return this.element.trigger(i, s), !(t.isFunction(o) && o.apply(this.element[0], [i].concat(s)) === !1 || i.isDefaultPrevented())
        }
    }, t.each({ show: "fadeIn", hide: "fadeOut" }, function (e, i) {
        t.Widget.prototype["_" + e] = function (s, n, a) {
            "string" == typeof n && (n = { effect: n });
            var o, r = n ? n === !0 || "number" == typeof n ? i : n.effect || i : e;
            n = n || {}, "number" == typeof n && (n = { duration: n }), o = !t.isEmptyObject(n), n.complete = a, n.delay && s.delay(n.delay), o && t.effects && t.effects.effect[r] ? s[e](n) : r !== e && s[r] ? s[r](n.duration, n.easing, a) : s.queue(function (i) { t(this)[e](), a && a.call(s[0]), i() })
        }
    }), t.widget, t.extend(t.expr[":"], { data: t.expr.createPseudo ? t.expr.createPseudo(function (e) { return function (i) { return !!t.data(i, e) } }) : function (e, i, s) { return !!t.data(e, s[3]) } }), t.ui.keyCode = { BACKSPACE: 8, COMMA: 188, DELETE: 46, DOWN: 40, END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, LEFT: 37, PAGE_DOWN: 34, PAGE_UP: 33, PERIOD: 190, RIGHT: 39, SPACE: 32, TAB: 9, UP: 38 }, t.fn.scrollParent = function (e) {
        var i = this.css("position"),
            s = "absolute" === i,
            n = e ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
            a = this.parents().filter(function () { var e = t(this); return s && "static" === e.css("position") ? !1 : n.test(e.css("overflow") + e.css("overflow-y") + e.css("overflow-x")) }).eq(0);
        return "fixed" !== i && a.length ? a : t(this[0].ownerDocument || document)
    }, t.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
    var h = !1;
    t(document).on("mouseup", function () { h = !1 }), t.widget("ui.mouse", {
        version: "1.12.1",
        options: { cancel: "input, textarea, button, select, option", distance: 1, delay: 0 },
        _mouseInit: function () {
            var e = this;
            this.element.on("mousedown." + this.widgetName, function (t) { return e._mouseDown(t) }).on("click." + this.widgetName, function (i) { return !0 === t.data(i.target, e.widgetName + ".preventClickEvent") ? (t.removeData(i.target, e.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1) : void 0 }), this.started = !1
        },
        _mouseDestroy: function () { this.element.off("." + this.widgetName), this._mouseMoveDelegate && this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate) },
        _mouseDown: function (e) {
            if (!h) {
                this._mouseMoved = !1, this._mouseStarted && this._mouseUp(e), this._mouseDownEvent = e;
                var i = this,
                    s = 1 === e.which,
                    n = "string" == typeof this.options.cancel && e.target.nodeName ? t(e.target).closest(this.options.cancel).length : !1;
                return s && !n && this._mouseCapture(e) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () { i.mouseDelayMet = !0 }, this.options.delay)), this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(e) !== !1, !this._mouseStarted) ? (e.preventDefault(), !0) : (!0 === t.data(e.target, this.widgetName + ".preventClickEvent") && t.removeData(e.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function (t) { return i._mouseMove(t) }, this._mouseUpDelegate = function (t) { return i._mouseUp(t) }, this.document.on("mousemove." + this.widgetName, this._mouseMoveDelegate).on("mouseup." + this.widgetName, this._mouseUpDelegate), e.preventDefault(), h = !0, !0)) : !0
            }
        },
        _mouseMove: function (e) {
            if (this._mouseMoved) {
                if (t.ui.ie && (!document.documentMode || 9 > document.documentMode) && !e.button) return this._mouseUp(e);
                if (!e.which)
                    if (e.originalEvent.altKey || e.originalEvent.ctrlKey || e.originalEvent.metaKey || e.originalEvent.shiftKey) this.ignoreMissingWhich = !0;
                    else if (!this.ignoreMissingWhich) return this._mouseUp(e)
            }
            return (e.which || e.button) && (this._mouseMoved = !0), this._mouseStarted ? (this._mouseDrag(e), e.preventDefault()) : (this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, e) !== !1, this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)), !this._mouseStarted)
        },
        _mouseUp: function (e) { this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, e.target === this._mouseDownEvent.target && t.data(e.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(e)), this._mouseDelayTimer && (clearTimeout(this._mouseDelayTimer), delete this._mouseDelayTimer), this.ignoreMissingWhich = !1, h = !1, e.preventDefault() },
        _mouseDistanceMet: function (t) { return Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance },
        _mouseDelayMet: function () { return this.mouseDelayMet },
        _mouseStart: function () { },
        _mouseDrag: function () { },
        _mouseStop: function () { },
        _mouseCapture: function () { return !0 }
    }), t.ui.plugin = {
        add: function (e, i, s) { var n, a = t.ui[e].prototype; for (n in s) a.plugins[n] = a.plugins[n] || [], a.plugins[n].push([i, s[n]]) },
        call: function (t, e, i, s) {
            var n, a = t.plugins[e];
            if (a && (s || t.element[0].parentNode && 11 !== t.element[0].parentNode.nodeType))
                for (n = 0; a.length > n; n++) t.options[a[n][0]] && a[n][1].apply(t.element, i)
        }
    }, t.ui.safeActiveElement = function (t) { var e; try { e = t.activeElement } catch (i) { e = t.body } return e || (e = t.body), e.nodeName || (e = t.body), e }, t.ui.safeBlur = function (e) { e && "body" !== e.nodeName.toLowerCase() && t(e).trigger("blur") }, t.widget("ui.draggable", t.ui.mouse, {
        version: "1.12.1",
        widgetEventPrefix: "drag",
        options: { addClasses: !0, appendTo: "parent", axis: !1, connectToSortable: !1, containment: !1, cursor: "auto", cursorAt: !1, grid: !1, handle: !1, helper: "original", iframeFix: !1, opacity: !1, refreshPositions: !1, revert: !1, revertDuration: 500, scope: "default", scroll: !0, scrollSensitivity: 20, scrollSpeed: 20, snap: !1, snapMode: "both", snapTolerance: 20, stack: !1, zIndex: !1, drag: null, start: null, stop: null },
        _create: function () { "original" === this.options.helper && this._setPositionRelative(), this.options.addClasses && this._addClass("ui-draggable"), this._setHandleClassName(), this._mouseInit() },
        _setOption: function (t, e) { this._super(t, e), "handle" === t && (this._removeHandleClassName(), this._setHandleClassName()) },
        _destroy: function () { return (this.helper || this.element).is(".ui-draggable-dragging") ? (this.destroyOnClear = !0, void 0) : (this._removeHandleClassName(), this._mouseDestroy(), void 0) },
        _mouseCapture: function (e) { var i = this.options; return this.helper || i.disabled || t(e.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(e), this.handle ? (this._blurActiveElement(e), this._blockFrames(i.iframeFix === !0 ? "iframe" : i.iframeFix), !0) : !1) },
        _blockFrames: function (e) { this.iframeBlocks = this.document.find(e).map(function () { var e = t(this); return t("<div>").css("position", "absolute").appendTo(e.parent()).outerWidth(e.outerWidth()).outerHeight(e.outerHeight()).offset(e.offset())[0] }) },
        _unblockFrames: function () { this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks) },
        _blurActiveElement: function (e) {
            var i = t.ui.safeActiveElement(this.document[0]),
                s = t(e.target);
            s.closest(i).length || t.ui.safeBlur(i)
        },
        _mouseStart: function (e) { var i = this.options; return this.helper = this._createHelper(e), this._addClass(this.helper, "ui-draggable-dragging"), this._cacheHelperProportions(), t.ui.ddmanager && (t.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(!0), this.offsetParent = this.helper.offsetParent(), this.hasFixedAncestor = this.helper.parents().filter(function () { return "fixed" === t(this).css("position") }).length > 0, this.positionAbs = this.element.offset(), this._refreshOffsets(e), this.originalPosition = this.position = this._generatePosition(e, !1), this.originalPageX = e.pageX, this.originalPageY = e.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), this._setContainment(), this._trigger("start", e) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), t.ui.ddmanager && !i.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this._mouseDrag(e, !0), t.ui.ddmanager && t.ui.ddmanager.dragStart(this, e), !0) },
        _refreshOffsets: function (t) { this.offset = { top: this.positionAbs.top - this.margins.top, left: this.positionAbs.left - this.margins.left, scroll: !1, parent: this._getParentOffset(), relative: this._getRelativeOffset() }, this.offset.click = { left: t.pageX - this.offset.left, top: t.pageY - this.offset.top } },
        _mouseDrag: function (e, i) {
            if (this.hasFixedAncestor && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(e, !0), this.positionAbs = this._convertPositionTo("absolute"), !i) {
                var s = this._uiHash();
                if (this._trigger("drag", e, s) === !1) return this._mouseUp(new t.Event("mouseup", e)), !1;
                this.position = s.position
            }
            return this.helper[0].style.left = this.position.left + "px", this.helper[0].style.top = this.position.top + "px", t.ui.ddmanager && t.ui.ddmanager.drag(this, e), !1
        },
        _mouseStop: function (e) {
            var i = this,
                s = !1;
            return t.ui.ddmanager && !this.options.dropBehaviour && (s = t.ui.ddmanager.drop(this, e)), this.dropped && (s = this.dropped, this.dropped = !1), "invalid" === this.options.revert && !s || "valid" === this.options.revert && s || this.options.revert === !0 || t.isFunction(this.options.revert) && this.options.revert.call(this.element, s) ? t(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () { i._trigger("stop", e) !== !1 && i._clear() }) : this._trigger("stop", e) !== !1 && this._clear(), !1
        },
        _mouseUp: function (e) { return this._unblockFrames(), t.ui.ddmanager && t.ui.ddmanager.dragStop(this, e), this.handleElement.is(e.target) && this.element.trigger("focus"), t.ui.mouse.prototype._mouseUp.call(this, e) },
        cancel: function () { return this.helper.is(".ui-draggable-dragging") ? this._mouseUp(new t.Event("mouseup", { target: this.element[0] })) : this._clear(), this },
        _getHandle: function (e) { return this.options.handle ? !!t(e.target).closest(this.element.find(this.options.handle)).length : !0 },
        _setHandleClassName: function () { this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element, this._addClass(this.handleElement, "ui-draggable-handle") },
        _removeHandleClassName: function () { this._removeClass(this.handleElement, "ui-draggable-handle") },
        _createHelper: function (e) {
            var i = this.options,
                s = t.isFunction(i.helper),
                n = s ? t(i.helper.apply(this.element[0], [e])) : "clone" === i.helper ? this.element.clone().removeAttr("id") : this.element;
            return n.parents("body").length || n.appendTo("parent" === i.appendTo ? this.element[0].parentNode : i.appendTo), s && n[0] === this.element[0] && this._setPositionRelative(), n[0] === this.element[0] || /(fixed|absolute)/.test(n.css("position")) || n.css("position", "absolute"), n
        },
        _setPositionRelative: function () { /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative") },
        _adjustOffsetFromHelper: function (e) { "string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = { left: +e[0], top: +e[1] || 0 }), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top) },
        _isRootNode: function (t) { return /(html|body)/i.test(t.tagName) || t === this.document[0] },
        _getParentOffset: function () {
            var e = this.offsetParent.offset(),
                i = this.document[0];
            return "absolute" === this.cssPosition && this.scrollParent[0] !== i && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), this._isRootNode(this.offsetParent[0]) && (e = { top: 0, left: 0 }), { top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0), left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0) }
        },
        _getRelativeOffset: function () {
            if ("relative" !== this.cssPosition) return { top: 0, left: 0 };
            var t = this.element.position(),
                e = this._isRootNode(this.scrollParent[0]);
            return { top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + (e ? 0 : this.scrollParent.scrollTop()), left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + (e ? 0 : this.scrollParent.scrollLeft()) }
        },
        _cacheMargins: function () { this.margins = { left: parseInt(this.element.css("marginLeft"), 10) || 0, top: parseInt(this.element.css("marginTop"), 10) || 0, right: parseInt(this.element.css("marginRight"), 10) || 0, bottom: parseInt(this.element.css("marginBottom"), 10) || 0 } },
        _cacheHelperProportions: function () { this.helperProportions = { width: this.helper.outerWidth(), height: this.helper.outerHeight() } },
        _setContainment: function () {
            var e, i, s, n = this.options,
                a = this.document[0];
            return this.relativeContainer = null, n.containment ? "window" === n.containment ? (this.containment = [t(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, t(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, t(window).scrollLeft() + t(window).width() - this.helperProportions.width - this.margins.left, t(window).scrollTop() + (t(window).height() || a.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], void 0) : "document" === n.containment ? (this.containment = [0, 0, t(a).width() - this.helperProportions.width - this.margins.left, (t(a).height() || a.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], void 0) : n.containment.constructor === Array ? (this.containment = n.containment, void 0) : ("parent" === n.containment && (n.containment = this.helper[0].parentNode), i = t(n.containment), s = i[0], s && (e = /(scroll|auto)/.test(i.css("overflow")), this.containment = [(parseInt(i.css("borderLeftWidth"), 10) || 0) + (parseInt(i.css("paddingLeft"), 10) || 0), (parseInt(i.css("borderTopWidth"), 10) || 0) + (parseInt(i.css("paddingTop"), 10) || 0), (e ? Math.max(s.scrollWidth, s.offsetWidth) : s.offsetWidth) - (parseInt(i.css("borderRightWidth"), 10) || 0) - (parseInt(i.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (e ? Math.max(s.scrollHeight, s.offsetHeight) : s.offsetHeight) - (parseInt(i.css("borderBottomWidth"), 10) || 0) - (parseInt(i.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relativeContainer = i), void 0) : (this.containment = null, void 0)
        },
        _convertPositionTo: function (t, e) {
            e || (e = this.position);
            var i = "absolute" === t ? 1 : -1,
                s = this._isRootNode(this.scrollParent[0]);
            return { top: e.top + this.offset.relative.top * i + this.offset.parent.top * i - ("fixed" === this.cssPosition ? -this.offset.scroll.top : s ? 0 : this.offset.scroll.top) * i, left: e.left + this.offset.relative.left * i + this.offset.parent.left * i - ("fixed" === this.cssPosition ? -this.offset.scroll.left : s ? 0 : this.offset.scroll.left) * i }
        },
        _generatePosition: function (t, e) {
            var i, s, n, a, o = this.options,
                r = this._isRootNode(this.scrollParent[0]),
                h = t.pageX,
                l = t.pageY;
            return r && this.offset.scroll || (this.offset.scroll = { top: this.scrollParent.scrollTop(), left: this.scrollParent.scrollLeft() }), e && (this.containment && (this.relativeContainer ? (s = this.relativeContainer.offset(), i = [this.containment[0] + s.left, this.containment[1] + s.top, this.containment[2] + s.left, this.containment[3] + s.top]) : i = this.containment, t.pageX - this.offset.click.left < i[0] && (h = i[0] + this.offset.click.left), t.pageY - this.offset.click.top < i[1] && (l = i[1] + this.offset.click.top), t.pageX - this.offset.click.left > i[2] && (h = i[2] + this.offset.click.left), t.pageY - this.offset.click.top > i[3] && (l = i[3] + this.offset.click.top)), o.grid && (n = o.grid[1] ? this.originalPageY + Math.round((l - this.originalPageY) / o.grid[1]) * o.grid[1] : this.originalPageY, l = i ? n - this.offset.click.top >= i[1] || n - this.offset.click.top > i[3] ? n : n - this.offset.click.top >= i[1] ? n - o.grid[1] : n + o.grid[1] : n, a = o.grid[0] ? this.originalPageX + Math.round((h - this.originalPageX) / o.grid[0]) * o.grid[0] : this.originalPageX, h = i ? a - this.offset.click.left >= i[0] || a - this.offset.click.left > i[2] ? a : a - this.offset.click.left >= i[0] ? a - o.grid[0] : a + o.grid[0] : a), "y" === o.axis && (h = this.originalPageX), "x" === o.axis && (l = this.originalPageY)), { top: l - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.offset.scroll.top : r ? 0 : this.offset.scroll.top), left: h - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.offset.scroll.left : r ? 0 : this.offset.scroll.left) }
        },
        _clear: function () { this._removeClass(this.helper, "ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1, this.destroyOnClear && this.destroy() },
        _trigger: function (e, i, s) { return s = s || this._uiHash(), t.ui.plugin.call(this, e, [i, s, this], !0), /^(drag|start|stop)/.test(e) && (this.positionAbs = this._convertPositionTo("absolute"), s.offset = this.positionAbs), t.Widget.prototype._trigger.call(this, e, i, s) },
        plugins: {},
        _uiHash: function () { return { helper: this.helper, position: this.position, originalPosition: this.originalPosition, offset: this.positionAbs } }
    }), t.ui.plugin.add("draggable", "connectToSortable", {
        start: function (e, i, s) {
            var n = t.extend({}, i, { item: s.element });
            s.sortables = [], t(s.options.connectToSortable).each(function () {
                var i = t(this).sortable("instance");
                i && !i.options.disabled && (s.sortables.push(i), i.refreshPositions(), i._trigger("activate", e, n))
            })
        },
        stop: function (e, i, s) {
            var n = t.extend({}, i, { item: s.element });
            s.cancelHelperRemoval = !1, t.each(s.sortables, function () {
                var t = this;
                t.isOver ? (t.isOver = 0, s.cancelHelperRemoval = !0, t.cancelHelperRemoval = !1, t._storedCSS = { position: t.placeholder.css("position"), top: t.placeholder.css("top"), left: t.placeholder.css("left") }, t._mouseStop(e), t.options.helper = t.options._helper) : (t.cancelHelperRemoval = !0, t._trigger("deactivate", e, n))
            })
        },
        drag: function (e, i, s) {
            t.each(s.sortables, function () {
                var n = !1,
                    a = this;
                a.positionAbs = s.positionAbs, a.helperProportions = s.helperProportions, a.offset.click = s.offset.click, a._intersectsWith(a.containerCache) && (n = !0, t.each(s.sortables, function () { return this.positionAbs = s.positionAbs, this.helperProportions = s.helperProportions, this.offset.click = s.offset.click, this !== a && this._intersectsWith(this.containerCache) && t.contains(a.element[0], this.element[0]) && (n = !1), n })), n ? (a.isOver || (a.isOver = 1, s._parent = i.helper.parent(), a.currentItem = i.helper.appendTo(a.element).data("ui-sortable-item", !0), a.options._helper = a.options.helper, a.options.helper = function () { return i.helper[0] }, e.target = a.currentItem[0], a._mouseCapture(e, !0), a._mouseStart(e, !0, !0), a.offset.click.top = s.offset.click.top, a.offset.click.left = s.offset.click.left, a.offset.parent.left -= s.offset.parent.left - a.offset.parent.left, a.offset.parent.top -= s.offset.parent.top - a.offset.parent.top, s._trigger("toSortable", e), s.dropped = a.element, t.each(s.sortables, function () { this.refreshPositions() }), s.currentItem = s.element, a.fromOutside = s), a.currentItem && (a._mouseDrag(e), i.position = a.position)) : a.isOver && (a.isOver = 0, a.cancelHelperRemoval = !0, a.options._revert = a.options.revert, a.options.revert = !1, a._trigger("out", e, a._uiHash(a)), a._mouseStop(e, !0), a.options.revert = a.options._revert, a.options.helper = a.options._helper, a.placeholder && a.placeholder.remove(), i.helper.appendTo(s._parent), s._refreshOffsets(e), i.position = s._generatePosition(e, !0), s._trigger("fromSortable", e), s.dropped = !1, t.each(s.sortables, function () { this.refreshPositions() }))
            })
        }
    }), t.ui.plugin.add("draggable", "cursor", {
        start: function (e, i, s) {
            var n = t("body"),
                a = s.options;
            n.css("cursor") && (a._cursor = n.css("cursor")), n.css("cursor", a.cursor)
        },
        stop: function (e, i, s) {
            var n = s.options;
            n._cursor && t("body").css("cursor", n._cursor)
        }
    }), t.ui.plugin.add("draggable", "opacity", {
        start: function (e, i, s) {
            var n = t(i.helper),
                a = s.options;
            n.css("opacity") && (a._opacity = n.css("opacity")), n.css("opacity", a.opacity)
        },
        stop: function (e, i, s) {
            var n = s.options;
            n._opacity && t(i.helper).css("opacity", n._opacity)
        }
    }), t.ui.plugin.add("draggable", "scroll", {
        start: function (t, e, i) { i.scrollParentNotHidden || (i.scrollParentNotHidden = i.helper.scrollParent(!1)), i.scrollParentNotHidden[0] !== i.document[0] && "HTML" !== i.scrollParentNotHidden[0].tagName && (i.overflowOffset = i.scrollParentNotHidden.offset()) },
        drag: function (e, i, s) {
            var n = s.options,
                a = !1,
                o = s.scrollParentNotHidden[0],
                r = s.document[0];
            o !== r && "HTML" !== o.tagName ? (n.axis && "x" === n.axis || (s.overflowOffset.top + o.offsetHeight - e.pageY < n.scrollSensitivity ? o.scrollTop = a = o.scrollTop + n.scrollSpeed : e.pageY - s.overflowOffset.top < n.scrollSensitivity && (o.scrollTop = a = o.scrollTop - n.scrollSpeed)), n.axis && "y" === n.axis || (s.overflowOffset.left + o.offsetWidth - e.pageX < n.scrollSensitivity ? o.scrollLeft = a = o.scrollLeft + n.scrollSpeed : e.pageX - s.overflowOffset.left < n.scrollSensitivity && (o.scrollLeft = a = o.scrollLeft - n.scrollSpeed))) : (n.axis && "x" === n.axis || (e.pageY - t(r).scrollTop() < n.scrollSensitivity ? a = t(r).scrollTop(t(r).scrollTop() - n.scrollSpeed) : t(window).height() - (e.pageY - t(r).scrollTop()) < n.scrollSensitivity && (a = t(r).scrollTop(t(r).scrollTop() + n.scrollSpeed))), n.axis && "y" === n.axis || (e.pageX - t(r).scrollLeft() < n.scrollSensitivity ? a = t(r).scrollLeft(t(r).scrollLeft() - n.scrollSpeed) : t(window).width() - (e.pageX - t(r).scrollLeft()) < n.scrollSensitivity && (a = t(r).scrollLeft(t(r).scrollLeft() + n.scrollSpeed)))), a !== !1 && t.ui.ddmanager && !n.dropBehaviour && t.ui.ddmanager.prepareOffsets(s, e)
        }
    }), t.ui.plugin.add("draggable", "snap", {
        start: function (e, i, s) {
            var n = s.options;
            s.snapElements = [], t(n.snap.constructor !== String ? n.snap.items || ":data(ui-draggable)" : n.snap).each(function () {
                var e = t(this),
                    i = e.offset();
                this !== s.element[0] && s.snapElements.push({ item: this, width: e.outerWidth(), height: e.outerHeight(), top: i.top, left: i.left })
            })
        },
        drag: function (e, i, s) {
            var n, a, o, r, h, l, u, c, d, p, f = s.options,
                m = f.snapTolerance,
                g = i.offset.left,
                v = g + s.helperProportions.width,
                _ = i.offset.top,
                b = _ + s.helperProportions.height;
            for (d = s.snapElements.length - 1; d >= 0; d--) h = s.snapElements[d].left - s.margins.left, l = h + s.snapElements[d].width, u = s.snapElements[d].top - s.margins.top, c = u + s.snapElements[d].height, h - m > v || g > l + m || u - m > b || _ > c + m || !t.contains(s.snapElements[d].item.ownerDocument, s.snapElements[d].item) ? (s.snapElements[d].snapping && s.options.snap.release && s.options.snap.release.call(s.element, e, t.extend(s._uiHash(), { snapItem: s.snapElements[d].item })), s.snapElements[d].snapping = !1) : ("inner" !== f.snapMode && (n = m >= Math.abs(u - b), a = m >= Math.abs(c - _), o = m >= Math.abs(h - v), r = m >= Math.abs(l - g), n && (i.position.top = s._convertPositionTo("relative", { top: u - s.helperProportions.height, left: 0 }).top), a && (i.position.top = s._convertPositionTo("relative", { top: c, left: 0 }).top), o && (i.position.left = s._convertPositionTo("relative", { top: 0, left: h - s.helperProportions.width }).left), r && (i.position.left = s._convertPositionTo("relative", { top: 0, left: l }).left)), p = n || a || o || r, "outer" !== f.snapMode && (n = m >= Math.abs(u - _), a = m >= Math.abs(c - b), o = m >= Math.abs(h - g), r = m >= Math.abs(l - v), n && (i.position.top = s._convertPositionTo("relative", { top: u, left: 0 }).top), a && (i.position.top = s._convertPositionTo("relative", { top: c - s.helperProportions.height, left: 0 }).top), o && (i.position.left = s._convertPositionTo("relative", { top: 0, left: h }).left), r && (i.position.left = s._convertPositionTo("relative", { top: 0, left: l - s.helperProportions.width }).left)), !s.snapElements[d].snapping && (n || a || o || r || p) && s.options.snap.snap && s.options.snap.snap.call(s.element, e, t.extend(s._uiHash(), { snapItem: s.snapElements[d].item })), s.snapElements[d].snapping = n || a || o || r || p)
        }
    }), t.ui.plugin.add("draggable", "stack", {
        start: function (e, i, s) {
            var n, a = s.options,
                o = t.makeArray(t(a.stack)).sort(function (e, i) { return (parseInt(t(e).css("zIndex"), 10) || 0) - (parseInt(t(i).css("zIndex"), 10) || 0) });
            o.length && (n = parseInt(t(o[0]).css("zIndex"), 10) || 0, t(o).each(function (e) { t(this).css("zIndex", n + e) }), this.css("zIndex", n + o.length))
        }
    }), t.ui.plugin.add("draggable", "zIndex", {
        start: function (e, i, s) {
            var n = t(i.helper),
                a = s.options;
            n.css("zIndex") && (a._zIndex = n.css("zIndex")), n.css("zIndex", a.zIndex)
        },
        stop: function (e, i, s) {
            var n = s.options;
            n._zIndex && t(i.helper).css("zIndex", n._zIndex)
        }
    }), t.ui.draggable, t.extend(t.ui, { datepicker: { version: "1.12.1" } });
    var l;
    t.extend(i.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        _widgetDatepicker: function () { return this.dpDiv },
        setDefaults: function (t) { return a(this._defaults, t || {}), this },
        _attachDatepicker: function (e, i) {
            var s, n, a;
            s = e.nodeName.toLowerCase(), n = "div" === s || "span" === s, e.id || (this.uuid += 1, e.id = "dp" + this.uuid), a = this._newInst(t(e), n), a.settings = t.extend({}, i || {}), "input" === s ? this._connectDatepicker(e, a) : n && this._inlineDatepicker(e, a)
        },
        _newInst: function (e, i) { var n = e[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1"); return { id: n, input: e, selectedDay: 0, selectedMonth: 0, selectedYear: 0, drawMonth: 0, drawYear: 0, inline: i, dpDiv: i ? s(t("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv } },
        _connectDatepicker: function (e, i) {
            var s = t(e);
            i.append = t([]), i.trigger = t([]), s.hasClass(this.markerClassName) || (this._attachments(s, i), s.addClass(this.markerClassName).on("keydown", this._doKeyDown).on("keypress", this._doKeyPress).on("keyup", this._doKeyUp), this._autoSize(i), t.data(e, "datepicker", i), i.settings.disabled && this._disableDatepicker(e))
        },
        _attachments: function (e, i) {
            var s, n, a, o = this._get(i, "appendText"),
                r = this._get(i, "isRTL");
            i.append && i.append.remove(), o && (i.append = t("<span class='" + this._appendClass + "'>" + o + "</span>"), e[r ? "before" : "after"](i.append)), e.off("focus", this._showDatepicker), i.trigger && i.trigger.remove(), s = this._get(i, "showOn"), ("focus" === s || "both" === s) && e.on("focus", this._showDatepicker), ("button" === s || "both" === s) && (n = this._get(i, "buttonText"), a = this._get(i, "buttonImage"), i.trigger = t(this._get(i, "buttonImageOnly") ? t("<img/>").addClass(this._triggerClass).attr({ src: a, alt: n, title: n }) : t("<button type='button'></button>").addClass(this._triggerClass).html(a ? t("<img/>").attr({ src: a, alt: n, title: n }) : n)), e[r ? "before" : "after"](i.trigger), i.trigger.on("click", function () { return t.datepicker._datepickerShowing && t.datepicker._lastInput === e[0] ? t.datepicker._hideDatepicker() : t.datepicker._datepickerShowing && t.datepicker._lastInput !== e[0] ? (t.datepicker._hideDatepicker(), t.datepicker._showDatepicker(e[0])) : t.datepicker._showDatepicker(e[0]), !1 }))
        },
        _autoSize: function (t) {
            if (this._get(t, "autoSize") && !t.inline) {
                var e, i, s, n, a = new Date(2009, 11, 20),
                    o = this._get(t, "dateFormat");
                o.match(/[DM]/) && (e = function (t) { for (i = 0, s = 0, n = 0; t.length > n; n++) t[n].length > i && (i = t[n].length, s = n); return s }, a.setMonth(e(this._get(t, o.match(/MM/) ? "monthNames" : "monthNamesShort"))), a.setDate(e(this._get(t, o.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - a.getDay())), t.input.attr("size", this._formatDate(t, a).length)
            }
        },
        _inlineDatepicker: function (e, i) {
            var s = t(e);
            s.hasClass(this.markerClassName) || (s.addClass(this.markerClassName).append(i.dpDiv), t.data(e, "datepicker", i), this._setDate(i, this._getDefaultDate(i), !0), this._updateDatepicker(i), this._updateAlternate(i), i.settings.disabled && this._disableDatepicker(e), i.dpDiv.css("display", "block"))
        },
        _dialogDatepicker: function (e, i, s, n, o) { var r, h, l, u, c, d = this._dialogInst; return d || (this.uuid += 1, r = "dp" + this.uuid, this._dialogInput = t("<input type='text' id='" + r + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.on("keydown", this._doKeyDown), t("body").append(this._dialogInput), d = this._dialogInst = this._newInst(this._dialogInput, !1), d.settings = {}, t.data(this._dialogInput[0], "datepicker", d)), a(d.settings, n || {}), i = i && i.constructor === Date ? this._formatDate(d, i) : i, this._dialogInput.val(i), this._pos = o ? o.length ? o : [o.pageX, o.pageY] : null, this._pos || (h = document.documentElement.clientWidth, l = document.documentElement.clientHeight, u = document.documentElement.scrollLeft || document.body.scrollLeft, c = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [h / 2 - 100 + u, l / 2 - 150 + c]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), d.settings.onSelect = s, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), t.blockUI && t.blockUI(this.dpDiv), t.data(this._dialogInput[0], "datepicker", d), this },
        _destroyDatepicker: function (e) {
            var i, s = t(e),
                n = t.data(e, "datepicker");
            s.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), t.removeData(e, "datepicker"), "input" === i ? (n.append.remove(), n.trigger.remove(), s.removeClass(this.markerClassName).off("focus", this._showDatepicker).off("keydown", this._doKeyDown).off("keypress", this._doKeyPress).off("keyup", this._doKeyUp)) : ("div" === i || "span" === i) && s.removeClass(this.markerClassName).empty(), l === n && (l = null))
        },
        _enableDatepicker: function (e) {
            var i, s, n = t(e),
                a = t.data(e, "datepicker");
            n.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), "input" === i ? (e.disabled = !1, a.trigger.filter("button").each(function () { this.disabled = !1 }).end().filter("img").css({ opacity: "1.0", cursor: "" })) : ("div" === i || "span" === i) && (s = n.children("." + this._inlineClass), s.children().removeClass("ui-state-disabled"), s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = t.map(this._disabledInputs, function (t) { return t === e ? null : t }))
        },
        _disableDatepicker: function (e) {
            var i, s, n = t(e),
                a = t.data(e, "datepicker");
            n.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), "input" === i ? (e.disabled = !0, a.trigger.filter("button").each(function () { this.disabled = !0 }).end().filter("img").css({ opacity: "0.5", cursor: "default" })) : ("div" === i || "span" === i) && (s = n.children("." + this._inlineClass), s.children().addClass("ui-state-disabled"), s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = t.map(this._disabledInputs, function (t) { return t === e ? null : t }), this._disabledInputs[this._disabledInputs.length] = e)
        },
        _isDisabledDatepicker: function (t) {
            if (!t) return !1;
            for (var e = 0; this._disabledInputs.length > e; e++)
                if (this._disabledInputs[e] === t) return !0;
            return !1
        },
        _getInst: function (e) { try { return t.data(e, "datepicker") } catch (i) { throw "Missing instance data for this datepicker" } },
        _optionDatepicker: function (e, i, s) { var n, o, r, h, l = this._getInst(e); return 2 === arguments.length && "string" == typeof i ? "defaults" === i ? t.extend({}, t.datepicker._defaults) : l ? "all" === i ? t.extend({}, l.settings) : this._get(l, i) : null : (n = i || {}, "string" == typeof i && (n = {}, n[i] = s), l && (this._curInst === l && this._hideDatepicker(), o = this._getDateDatepicker(e, !0), r = this._getMinMaxDate(l, "min"), h = this._getMinMaxDate(l, "max"), a(l.settings, n), null !== r && void 0 !== n.dateFormat && void 0 === n.minDate && (l.settings.minDate = this._formatDate(l, r)), null !== h && void 0 !== n.dateFormat && void 0 === n.maxDate && (l.settings.maxDate = this._formatDate(l, h)), "disabled" in n && (n.disabled ? this._disableDatepicker(e) : this._enableDatepicker(e)), this._attachments(t(e), l), this._autoSize(l), this._setDate(l, o), this._updateAlternate(l), this._updateDatepicker(l)), void 0) },
        _changeDatepicker: function (t, e, i) { this._optionDatepicker(t, e, i) },
        _refreshDatepicker: function (t) {
            var e = this._getInst(t);
            e && this._updateDatepicker(e)
        },
        _setDateDatepicker: function (t, e) {
            var i = this._getInst(t);
            i && (this._setDate(i, e), this._updateDatepicker(i), this._updateAlternate(i))
        },
        _getDateDatepicker: function (t, e) { var i = this._getInst(t); return i && !i.inline && this._setDateFromField(i, e), i ? this._getDate(i) : null },
        _doKeyDown: function (e) {
            var i, s, n, a = t.datepicker._getInst(e.target),
                o = !0,
                r = a.dpDiv.is(".ui-datepicker-rtl");
            if (a._keyEvent = !0, t.datepicker._datepickerShowing) switch (e.keyCode) {
                case 9:
                    t.datepicker._hideDatepicker(), o = !1;
                    break;
                case 13:
                    return n = t("td." + t.datepicker._dayOverClass + ":not(." + t.datepicker._currentClass + ")", a.dpDiv), n[0] && t.datepicker._selectDay(e.target, a.selectedMonth, a.selectedYear, n[0]), i = t.datepicker._get(a, "onSelect"), i ? (s = t.datepicker._formatDate(a), i.apply(a.input ? a.input[0] : null, [s, a])) : t.datepicker._hideDatepicker(), !1;
                case 27:
                    t.datepicker._hideDatepicker();
                    break;
                case 33:
                    t.datepicker._adjustDate(e.target, e.ctrlKey ? -t.datepicker._get(a, "stepBigMonths") : -t.datepicker._get(a, "stepMonths"), "M");
                    break;
                case 34:
                    t.datepicker._adjustDate(e.target, e.ctrlKey ? +t.datepicker._get(a, "stepBigMonths") : +t.datepicker._get(a, "stepMonths"), "M");
                    break;
                case 35:
                    (e.ctrlKey || e.metaKey) && t.datepicker._clearDate(e.target), o = e.ctrlKey || e.metaKey;
                    break;
                case 36:
                    (e.ctrlKey || e.metaKey) && t.datepicker._gotoToday(e.target), o = e.ctrlKey || e.metaKey;
                    break;
                case 37:
                    (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, r ? 1 : -1, "D"), o = e.ctrlKey || e.metaKey, e.originalEvent.altKey && t.datepicker._adjustDate(e.target, e.ctrlKey ? -t.datepicker._get(a, "stepBigMonths") : -t.datepicker._get(a, "stepMonths"), "M");
                    break;
                case 38:
                    (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, -7, "D"), o = e.ctrlKey || e.metaKey;
                    break;
                case 39:
                    (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, r ? -1 : 1, "D"), o = e.ctrlKey || e.metaKey, e.originalEvent.altKey && t.datepicker._adjustDate(e.target, e.ctrlKey ? +t.datepicker._get(a, "stepBigMonths") : +t.datepicker._get(a, "stepMonths"), "M");
                    break;
                case 40:
                    (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, 7, "D"), o = e.ctrlKey || e.metaKey;
                    break;
                default:
                    o = !1
            } else 36 === e.keyCode && e.ctrlKey ? t.datepicker._showDatepicker(this) : o = !1;
            o && (e.preventDefault(), e.stopPropagation())
        },
        _doKeyPress: function (e) { var i, s, n = t.datepicker._getInst(e.target); return t.datepicker._get(n, "constrainInput") ? (i = t.datepicker._possibleChars(t.datepicker._get(n, "dateFormat")), s = String.fromCharCode(null == e.charCode ? e.keyCode : e.charCode), e.ctrlKey || e.metaKey || " " > s || !i || i.indexOf(s) > -1) : void 0 },
        _doKeyUp: function (e) {
            var i, s = t.datepicker._getInst(e.target);
            if (s.input.val() !== s.lastVal) try { i = t.datepicker.parseDate(t.datepicker._get(s, "dateFormat"), s.input ? s.input.val() : null, t.datepicker._getFormatConfig(s)), i && (t.datepicker._setDateFromField(s), t.datepicker._updateAlternate(s), t.datepicker._updateDatepicker(s)) } catch (n) { }
            return !0
        },
        _showDatepicker: function (i) {
            if (i = i.target || i, "input" !== i.nodeName.toLowerCase() && (i = t("input", i.parentNode)[0]), !t.datepicker._isDisabledDatepicker(i) && t.datepicker._lastInput !== i) {
                var s, n, o, r, h, l, u;
                s = t.datepicker._getInst(i), t.datepicker._curInst && t.datepicker._curInst !== s && (t.datepicker._curInst.dpDiv.stop(!0, !0), s && t.datepicker._datepickerShowing && t.datepicker._hideDatepicker(t.datepicker._curInst.input[0])), n = t.datepicker._get(s, "beforeShow"), o = n ? n.apply(i, [i, s]) : {}, o !== !1 && (a(s.settings, o), s.lastVal = null, t.datepicker._lastInput = i, t.datepicker._setDateFromField(s), t.datepicker._inDialog && (i.value = ""), t.datepicker._pos || (t.datepicker._pos = t.datepicker._findPos(i), t.datepicker._pos[1] += i.offsetHeight), r = !1, t(i).parents().each(function () { return r |= "fixed" === t(this).css("position"), !r }), h = { left: t.datepicker._pos[0], top: t.datepicker._pos[1] }, t.datepicker._pos = null, s.dpDiv.empty(), s.dpDiv.css({ position: "absolute", display: "block", top: "-1000px" }), t.datepicker._updateDatepicker(s), h = t.datepicker._checkOffset(s, h, r), s.dpDiv.css({ position: t.datepicker._inDialog && t.blockUI ? "static" : r ? "fixed" : "absolute", display: "none", left: h.left + "px", top: h.top + "px" }), s.inline || (l = t.datepicker._get(s, "showAnim"), u = t.datepicker._get(s, "duration"), s.dpDiv.css("z-index", e(t(i)) + 1), t.datepicker._datepickerShowing = !0, t.effects && t.effects.effect[l] ? s.dpDiv.show(l, t.datepicker._get(s, "showOptions"), u) : s.dpDiv[l || "show"](l ? u : null), t.datepicker._shouldFocusInput(s) && s.input.trigger("focus"), t.datepicker._curInst = s))
            }
        },
        _updateDatepicker: function (e) {
            this.maxRows = 4, l = e, e.dpDiv.empty().append(this._generateHTML(e)), this._attachHandlers(e);
            var i, s = this._getNumberOfMonths(e),
                a = s[1],
                o = 17,
                r = e.dpDiv.find("." + this._dayOverClass + " a");
            r.length > 0 && n.apply(r.get(0)), e.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), a > 1 && e.dpDiv.addClass("ui-datepicker-multi-" + a).css("width", o * a + "em"), e.dpDiv[(1 !== s[0] || 1 !== s[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), e.dpDiv[(this._get(e, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), e === t.datepicker._curInst && t.datepicker._datepickerShowing && t.datepicker._shouldFocusInput(e) && e.input.trigger("focus"), e.yearshtml && (i = e.yearshtml, setTimeout(function () { i === e.yearshtml && e.yearshtml && e.dpDiv.find("select.ui-datepicker-year:first").replaceWith(e.yearshtml), i = e.yearshtml = null }, 0))
        },
        _shouldFocusInput: function (t) { return t.input && t.input.is(":visible") && !t.input.is(":disabled") && !t.input.is(":focus") },
        _checkOffset: function (e, i, s) {
            var n = e.dpDiv.outerWidth(),
                a = e.dpDiv.outerHeight(),
                o = e.input ? e.input.outerWidth() : 0,
                r = e.input ? e.input.outerHeight() : 0,
                h = document.documentElement.clientWidth + (s ? 0 : t(document).scrollLeft()),
                l = document.documentElement.clientHeight + (s ? 0 : t(document).scrollTop());
            return i.left -= this._get(e, "isRTL") ? n - o : 0, i.left -= s && i.left === e.input.offset().left ? t(document).scrollLeft() : 0, i.top -= s && i.top === e.input.offset().top + r ? t(document).scrollTop() : 0, i.left -= Math.min(i.left, i.left + n > h && h > n ? Math.abs(i.left + n - h) : 0), i.top -= Math.min(i.top, i.top + a > l && l > a ? Math.abs(a + r) : 0), i
        },
        _findPos: function (e) { for (var i, s = this._getInst(e), n = this._get(s, "isRTL"); e && ("hidden" === e.type || 1 !== e.nodeType || t.expr.filters.hidden(e));) e = e[n ? "previousSibling" : "nextSibling"]; return i = t(e).offset(), [i.left, i.top] },
        _hideDatepicker: function (e) { var i, s, n, a, o = this._curInst; !o || e && o !== t.data(e, "datepicker") || this._datepickerShowing && (i = this._get(o, "showAnim"), s = this._get(o, "duration"), n = function () { t.datepicker._tidyDialog(o) }, t.effects && (t.effects.effect[i] || t.effects[i]) ? o.dpDiv.hide(i, t.datepicker._get(o, "showOptions"), s, n) : o.dpDiv["slideDown" === i ? "slideUp" : "fadeIn" === i ? "fadeOut" : "hide"](i ? s : null, n), i || n(), this._datepickerShowing = !1, a = this._get(o, "onClose"), a && a.apply(o.input ? o.input[0] : null, [o.input ? o.input.val() : "", o]), this._lastInput = null, this._inDialog && (this._dialogInput.css({ position: "absolute", left: "0", top: "-100px" }), t.blockUI && (t.unblockUI(), t("body").append(this.dpDiv))), this._inDialog = !1) },
        _tidyDialog: function (t) { t.dpDiv.removeClass(this._dialogClass).off(".ui-datepicker-calendar") },
        _checkExternalClick: function (e) {
            if (t.datepicker._curInst) {
                var i = t(e.target),
                    s = t.datepicker._getInst(i[0]);
                (i[0].id !== t.datepicker._mainDivId && 0 === i.parents("#" + t.datepicker._mainDivId).length && !i.hasClass(t.datepicker.markerClassName) && !i.closest("." + t.datepicker._triggerClass).length && t.datepicker._datepickerShowing && (!t.datepicker._inDialog || !t.blockUI) || i.hasClass(t.datepicker.markerClassName) && t.datepicker._curInst !== s) && t.datepicker._hideDatepicker()
            }
        },
        _adjustDate: function (e, i, s) {
            var n = t(e),
                a = this._getInst(n[0]);
            this._isDisabledDatepicker(n[0]) || (this._adjustInstDate(a, i + ("M" === s ? this._get(a, "showCurrentAtPos") : 0), s), this._updateDatepicker(a))
        },
        _gotoToday: function (e) {
            var i, s = t(e),
                n = this._getInst(s[0]);
            this._get(n, "gotoCurrent") && n.currentDay ? (n.selectedDay = n.currentDay, n.drawMonth = n.selectedMonth = n.currentMonth, n.drawYear = n.selectedYear = n.currentYear) : (i = new Date, n.selectedDay = i.getDate(), n.drawMonth = n.selectedMonth = i.getMonth(), n.drawYear = n.selectedYear = i.getFullYear()), this._notifyChange(n), this._adjustDate(s)
        },
        _selectMonthYear: function (e, i, s) {
            var n = t(e),
                a = this._getInst(n[0]);
            a["selected" + ("M" === s ? "Month" : "Year")] = a["draw" + ("M" === s ? "Month" : "Year")] = parseInt(i.options[i.selectedIndex].value, 10), this._notifyChange(a), this._adjustDate(n)
        },
        _selectDay: function (e, i, s, n) {
            var a, o = t(e);
            t(n).hasClass(this._unselectableClass) || this._isDisabledDatepicker(o[0]) || (a = this._getInst(o[0]), a.selectedDay = a.currentDay = t("a", n).html(), a.selectedMonth = a.currentMonth = i, a.selectedYear = a.currentYear = s, this._selectDate(e, this._formatDate(a, a.currentDay, a.currentMonth, a.currentYear)))
        },
        _clearDate: function (e) {
            var i = t(e);
            this._selectDate(i, "")
        },
        _selectDate: function (e, i) {
            var s, n = t(e),
                a = this._getInst(n[0]);
            i = null != i ? i : this._formatDate(a), a.input && a.input.val(i), this._updateAlternate(a), s = this._get(a, "onSelect"), s ? s.apply(a.input ? a.input[0] : null, [i, a]) : a.input && a.input.trigger("change"), a.inline ? this._updateDatepicker(a) : (this._hideDatepicker(), this._lastInput = a.input[0], "object" != typeof a.input[0] && a.input.trigger("focus"), this._lastInput = null)
        },
        _updateAlternate: function (e) {
            var i, s, n, a = this._get(e, "altField");
            a && (i = this._get(e, "altFormat") || this._get(e, "dateFormat"), s = this._getDate(e), n = this.formatDate(i, s, this._getFormatConfig(e)), t(a).val(n))
        },
        noWeekends: function (t) { var e = t.getDay(); return [e > 0 && 6 > e, ""] },
        iso8601Week: function (t) { var e, i = new Date(t.getTime()); return i.setDate(i.getDate() + 4 - (i.getDay() || 7)), e = i.getTime(), i.setMonth(0), i.setDate(1), Math.floor(Math.round((e - i) / 864e5) / 7) + 1 },
        parseDate: function (e, i, s) {
            if (null == e || null == i) throw "Invalid arguments";
            if (i = "object" == typeof i ? "" + i : i + "", "" === i) return null;
            var n, a, o, r, h = 0,
                l = (s ? s.shortYearCutoff : null) || this._defaults.shortYearCutoff,
                u = "string" != typeof l ? l : (new Date).getFullYear() % 100 + parseInt(l, 10),
                c = (s ? s.dayNamesShort : null) || this._defaults.dayNamesShort,
                d = (s ? s.dayNames : null) || this._defaults.dayNames,
                p = (s ? s.monthNamesShort : null) || this._defaults.monthNamesShort,
                f = (s ? s.monthNames : null) || this._defaults.monthNames,
                m = -1,
                g = -1,
                v = -1,
                _ = -1,
                b = !1,
                y = function (t) { var i = e.length > n + 1 && e.charAt(n + 1) === t; return i && n++, i },
                k = function (t) {
                    var e = y(t),
                        s = "@" === t ? 14 : "!" === t ? 20 : "y" === t && e ? 4 : "o" === t ? 3 : 2,
                        n = "y" === t ? s : 1,
                        a = RegExp("^\\d{" + n + "," + s + "}"),
                        o = i.substring(h).match(a);
                    if (!o) throw "Missing number at position " + h;
                    return h += o[0].length, parseInt(o[0], 10)
                },
                w = function (e, s, n) {
                    var a = -1,
                        o = t.map(y(e) ? n : s, function (t, e) {
                            return [
                                [e, t]
                            ]
                        }).sort(function (t, e) { return -(t[1].length - e[1].length) });
                    if (t.each(o, function (t, e) { var s = e[1]; return i.substr(h, s.length).toLowerCase() === s.toLowerCase() ? (a = e[0], h += s.length, !1) : void 0 }), -1 !== a) return a + 1;
                    throw "Unknown name at position " + h
                },
                x = function () {
                    if (i.charAt(h) !== e.charAt(n)) throw "Unexpected literal at position " + h;
                    h++
                };
            for (n = 0; e.length > n; n++)
                if (b) "'" !== e.charAt(n) || y("'") ? x() : b = !1;
                else switch (e.charAt(n)) {
                    case "d":
                        v = k("d");
                        break;
                    case "D":
                        w("D", c, d);
                        break;
                    case "o":
                        _ = k("o");
                        break;
                    case "m":
                        g = k("m");
                        break;
                    case "M":
                        g = w("M", p, f);
                        break;
                    case "y":
                        m = k("y");
                        break;
                    case "@":
                        r = new Date(k("@")), m = r.getFullYear(), g = r.getMonth() + 1, v = r.getDate();
                        break;
                    case "!":
                        r = new Date((k("!") - this._ticksTo1970) / 1e4), m = r.getFullYear(), g = r.getMonth() + 1, v = r.getDate();
                        break;
                    case "'":
                        y("'") ? x() : b = !0;
                        break;
                    default:
                        x()
                }
            if (i.length > h && (o = i.substr(h), !/^\s+/.test(o))) throw "Extra/unparsed characters found in date: " + o;
            if (-1 === m ? m = (new Date).getFullYear() : 100 > m && (m += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (u >= m ? 0 : -100)), _ > -1)
                for (g = 1, v = _; ;) {
                    if (a = this._getDaysInMonth(m, g - 1), a >= v) break;
                    g++, v -= a
                }
            if (r = this._daylightSavingAdjust(new Date(m, g - 1, v)), r.getFullYear() !== m || r.getMonth() + 1 !== g || r.getDate() !== v) throw "Invalid date";
            return r
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: 1e7 * 60 * 60 * 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)),
        formatDate: function (t, e, i) {
            if (!e) return "";
            var s, n = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort,
                a = (i ? i.dayNames : null) || this._defaults.dayNames,
                o = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort,
                r = (i ? i.monthNames : null) || this._defaults.monthNames,
                h = function (e) { var i = t.length > s + 1 && t.charAt(s + 1) === e; return i && s++, i },
                l = function (t, e, i) {
                    var s = "" + e;
                    if (h(t))
                        for (; i > s.length;) s = "0" + s;
                    return s
                },
                u = function (t, e, i, s) { return h(t) ? s[e] : i[e] },
                c = "",
                d = !1;
            if (e)
                for (s = 0; t.length > s; s++)
                    if (d) "'" !== t.charAt(s) || h("'") ? c += t.charAt(s) : d = !1;
                    else switch (t.charAt(s)) {
                        case "d":
                            c += l("d", e.getDate(), 2);
                            break;
                        case "D":
                            c += u("D", e.getDay(), n, a);
                            break;
                        case "o":
                            c += l("o", Math.round((new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime() - new Date(e.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                            break;
                        case "m":
                            c += l("m", e.getMonth() + 1, 2);
                            break;
                        case "M":
                            c += u("M", e.getMonth(), o, r);
                            break;
                        case "y":
                            c += h("y") ? e.getFullYear() : (10 > e.getFullYear() % 100 ? "0" : "") + e.getFullYear() % 100;
                            break;
                        case "@":
                            c += e.getTime();
                            break;
                        case "!":
                            c += 1e4 * e.getTime() + this._ticksTo1970;
                            break;
                        case "'":
                            h("'") ? c += "'" : d = !0;
                            break;
                        default:
                            c += t.charAt(s)
                    }
            return c
        },
        _possibleChars: function (t) {
            var e, i = "",
                s = !1,
                n = function (i) { var s = t.length > e + 1 && t.charAt(e + 1) === i; return s && e++, s };
            for (e = 0; t.length > e; e++)
                if (s) "'" !== t.charAt(e) || n("'") ? i += t.charAt(e) : s = !1;
                else switch (t.charAt(e)) {
                    case "d":
                    case "m":
                    case "y":
                    case "@":
                        i += "0123456789";
                        break;
                    case "D":
                    case "M":
                        return null;
                    case "'":
                        n("'") ? i += "'" : s = !0;
                        break;
                    default:
                        i += t.charAt(e)
                }
            return i
        },
        _get: function (t, e) { return void 0 !== t.settings[e] ? t.settings[e] : this._defaults[e] },
        _setDateFromField: function (t, e) {
            if (t.input.val() !== t.lastVal) {
                var i = this._get(t, "dateFormat"),
                    s = t.lastVal = t.input ? t.input.val() : null,
                    n = this._getDefaultDate(t),
                    a = n,
                    o = this._getFormatConfig(t);
                try { a = this.parseDate(i, s, o) || n } catch (r) { s = e ? "" : s }
                t.selectedDay = a.getDate(), t.drawMonth = t.selectedMonth = a.getMonth(), t.drawYear = t.selectedYear = a.getFullYear(), t.currentDay = s ? a.getDate() : 0, t.currentMonth = s ? a.getMonth() : 0, t.currentYear = s ? a.getFullYear() : 0, this._adjustInstDate(t)
            }
        },
        _getDefaultDate: function (t) { return this._restrictMinMax(t, this._determineDate(t, this._get(t, "defaultDate"), new Date)) },
        _determineDate: function (e, i, s) {
            var n = function (t) { var e = new Date; return e.setDate(e.getDate() + t), e },
                a = function (i) {
                    try { return t.datepicker.parseDate(t.datepicker._get(e, "dateFormat"), i, t.datepicker._getFormatConfig(e)) } catch (s) { }
                    for (var n = (i.toLowerCase().match(/^c/) ? t.datepicker._getDate(e) : null) || new Date, a = n.getFullYear(), o = n.getMonth(), r = n.getDate(), h = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, l = h.exec(i); l;) {
                        switch (l[2] || "d") {
                            case "d":
                            case "D":
                                r += parseInt(l[1], 10);
                                break;
                            case "w":
                            case "W":
                                r += 7 * parseInt(l[1], 10);
                                break;
                            case "m":
                            case "M":
                                o += parseInt(l[1], 10), r = Math.min(r, t.datepicker._getDaysInMonth(a, o));
                                break;
                            case "y":
                            case "Y":
                                a += parseInt(l[1], 10), r = Math.min(r, t.datepicker._getDaysInMonth(a, o))
                        }
                        l = h.exec(i)
                    }
                    return new Date(a, o, r)
                },
                o = null == i || "" === i ? s : "string" == typeof i ? a(i) : "number" == typeof i ? isNaN(i) ? s : n(i) : new Date(i.getTime());
            return o = o && "Invalid Date" == "" + o ? s : o, o && (o.setHours(0), o.setMinutes(0), o.setSeconds(0), o.setMilliseconds(0)), this._daylightSavingAdjust(o)
        },
        _daylightSavingAdjust: function (t) { return t ? (t.setHours(t.getHours() > 12 ? t.getHours() + 2 : 0), t) : null },
        _setDate: function (t, e, i) {
            var s = !e,
                n = t.selectedMonth,
                a = t.selectedYear,
                o = this._restrictMinMax(t, this._determineDate(t, e, new Date));
            t.selectedDay = t.currentDay = o.getDate(), t.drawMonth = t.selectedMonth = t.currentMonth = o.getMonth(), t.drawYear = t.selectedYear = t.currentYear = o.getFullYear(), n === t.selectedMonth && a === t.selectedYear || i || this._notifyChange(t), this._adjustInstDate(t), t.input && t.input.val(s ? "" : this._formatDate(t))
        },
        _getDate: function (t) { var e = !t.currentYear || t.input && "" === t.input.val() ? null : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay)); return e },
        _attachHandlers: function (e) {
            var i = this._get(e, "stepMonths"),
                s = "#" + e.id.replace(/\\\\/g, "\\");
            e.dpDiv.find("[data-handler]").map(function () {
                var e = { prev: function () { t.datepicker._adjustDate(s, -i, "M") }, next: function () { t.datepicker._adjustDate(s, +i, "M") }, hide: function () { t.datepicker._hideDatepicker() }, today: function () { t.datepicker._gotoToday(s) }, selectDay: function () { return t.datepicker._selectDay(s, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1 }, selectMonth: function () { return t.datepicker._selectMonthYear(s, this, "M"), !1 }, selectYear: function () { return t.datepicker._selectMonthYear(s, this, "Y"), !1 } };
                t(this).on(this.getAttribute("data-event"), e[this.getAttribute("data-handler")])
            })
        },
        _generateHTML: function (t) {
            var e, i, s, n, a, o, r, h, l, u, c, d, p, f, m, g, v, _, b, y, k, w, x, D, C, T, M, S, N, I, P, A, H, z, F, O, E, W, j, L = new Date,
                R = this._daylightSavingAdjust(new Date(L.getFullYear(), L.getMonth(), L.getDate())),
                Y = this._get(t, "isRTL"),
                B = this._get(t, "showButtonPanel"),
                K = this._get(t, "hideIfNoPrevNext"),
                q = this._get(t, "navigationAsDateFormat"),
                U = this._getNumberOfMonths(t),
                V = this._get(t, "showCurrentAtPos"),
                J = this._get(t, "stepMonths"),
                Q = 1 !== U[0] || 1 !== U[1],
                X = this._daylightSavingAdjust(t.currentDay ? new Date(t.currentYear, t.currentMonth, t.currentDay) : new Date(9999, 9, 9)),
                G = this._getMinMaxDate(t, "min"),
                $ = this._getMinMaxDate(t, "max"),
                Z = t.drawMonth - V,
                te = t.drawYear;
            if (0 > Z && (Z += 12, te--), $)
                for (e = this._daylightSavingAdjust(new Date($.getFullYear(), $.getMonth() - U[0] * U[1] + 1, $.getDate())), e = G && G > e ? G : e; this._daylightSavingAdjust(new Date(te, Z, 1)) > e;) Z--, 0 > Z && (Z = 11, te--);
            for (t.drawMonth = Z, t.drawYear = te, i = this._get(t, "prevText"), i = q ? this.formatDate(i, this._daylightSavingAdjust(new Date(te, Z - J, 1)), this._getFormatConfig(t)) : i, s = this._canAdjustMonth(t, -1, te, Z) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "e" : "w") + "'>" + i + "</span></a>" : K ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "e" : "w") + "'>" + i + "</span></a>", n = this._get(t, "nextText"), n = q ? this.formatDate(n, this._daylightSavingAdjust(new Date(te, Z + J, 1)), this._getFormatConfig(t)) : n, a = this._canAdjustMonth(t, 1, te, Z) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + n + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "w" : "e") + "'>" + n + "</span></a>" : K ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + n + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "w" : "e") + "'>" + n + "</span></a>", o = this._get(t, "currentText"), r = this._get(t, "gotoCurrent") && t.currentDay ? X : R, o = q ? this.formatDate(o, r, this._getFormatConfig(t)) : o, h = t.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(t, "closeText") + "</button>", l = B ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (Y ? h : "") + (this._isInRange(t, r) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + o + "</button>" : "") + (Y ? "" : h) + "</div>" : "", u = parseInt(this._get(t, "firstDay"), 10), u = isNaN(u) ? 0 : u, c = this._get(t, "showWeek"), d = this._get(t, "dayNames"), p = this._get(t, "dayNamesMin"), f = this._get(t, "monthNames"), m = this._get(t, "monthNamesShort"), g = this._get(t, "beforeShowDay"), v = this._get(t, "showOtherMonths"), _ = this._get(t, "selectOtherMonths"), b = this._getDefaultDate(t), y = "", w = 0; U[0] > w; w++) {
                for (x = "", this.maxRows = 4, D = 0; U[1] > D; D++) {
                    if (C = this._daylightSavingAdjust(new Date(te, Z, t.selectedDay)), T = " ui-corner-all", M = "", Q) {
                        if (M += "<div class='ui-datepicker-group", U[1] > 1) switch (D) {
                            case 0:
                                M += " ui-datepicker-group-first", T = " ui-corner-" + (Y ? "right" : "left");
                                break;
                            case U[1] - 1:
                                M += " ui-datepicker-group-last", T = " ui-corner-" + (Y ? "left" : "right");
                                break;
                            default:
                                M += " ui-datepicker-group-middle", T = ""
                        }
                        M += "'>"
                    }
                    for (M += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + T + "'>" + (/all|left/.test(T) && 0 === w ? Y ? a : s : "") + (/all|right/.test(T) && 0 === w ? Y ? s : a : "") + this._generateMonthYearHeader(t, Z, te, G, $, w > 0 || D > 0, f, m) + "</div><table class='ui-datepicker-calendar'><thead>" + "<tr>", S = c ? "<th class='ui-datepicker-week-col'>" + this._get(t, "weekHeader") + "</th>" : "", k = 0; 7 > k; k++) N = (k + u) % 7, S += "<th scope='col'" + ((k + u + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + ">" + "<span title='" + d[N] + "'>" + p[N] + "</span></th>";
                    for (M += S + "</tr></thead><tbody>", I = this._getDaysInMonth(te, Z), te === t.selectedYear && Z === t.selectedMonth && (t.selectedDay = Math.min(t.selectedDay, I)), P = (this._getFirstDayOfMonth(te, Z) - u + 7) % 7, A = Math.ceil((P + I) / 7), H = Q ? this.maxRows > A ? this.maxRows : A : A, this.maxRows = H, z = this._daylightSavingAdjust(new Date(te, Z, 1 - P)), F = 0; H > F; F++) {
                        for (M += "<tr>", O = c ? "<td class='ui-datepicker-week-col'>" + this._get(t, "calculateWeek")(z) + "</td>" : "", k = 0; 7 > k; k++) E = g ? g.apply(t.input ? t.input[0] : null, [z]) : [!0, ""], W = z.getMonth() !== Z, j = W && !_ || !E[0] || G && G > z || $ && z > $, O += "<td class='" + ((k + u + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (W ? " ui-datepicker-other-month" : "") + (z.getTime() === C.getTime() && Z === t.selectedMonth && t._keyEvent || b.getTime() === z.getTime() && b.getTime() === C.getTime() ? " " + this._dayOverClass : "") + (j ? " " + this._unselectableClass + " ui-state-disabled" : "") + (W && !v ? "" : " " + E[1] + (z.getTime() === X.getTime() ? " " + this._currentClass : "") + (z.getTime() === R.getTime() ? " ui-datepicker-today" : "")) + "'" + (W && !v || !E[2] ? "" : " title='" + E[2].replace(/'/g, "&#39;") + "'") + (j ? "" : " data-handler='selectDay' data-event='click' data-month='" + z.getMonth() + "' data-year='" + z.getFullYear() + "'") + ">" + (W && !v ? "&#xa0;" : j ? "<span class='ui-state-default'>" + z.getDate() + "</span>" : "<a class='ui-state-default" + (z.getTime() === R.getTime() ? " ui-state-highlight" : "") + (z.getTime() === X.getTime() ? " ui-state-active" : "") + (W ? " ui-priority-secondary" : "") + "' href='#'>" + z.getDate() + "</a>") + "</td>", z.setDate(z.getDate() + 1), z = this._daylightSavingAdjust(z);
                        M += O + "</tr>"
                    }
                    Z++, Z > 11 && (Z = 0, te++), M += "</tbody></table>" + (Q ? "</div>" + (U[0] > 0 && D === U[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""), x += M
                }
                y += x
            }
            return y += l, t._keyEvent = !1, y
        },
        _generateMonthYearHeader: function (t, e, i, s, n, a, o, r) {
            var h, l, u, c, d, p, f, m, g = this._get(t, "changeMonth"),
                v = this._get(t, "changeYear"),
                _ = this._get(t, "showMonthAfterYear"),
                b = "<div class='ui-datepicker-title'>",
                y = "";
            if (a || !g) y += "<span class='ui-datepicker-month'>" + o[e] + "</span>";
            else {
                for (h = s && s.getFullYear() === i, l = n && n.getFullYear() === i, y += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", u = 0; 12 > u; u++)(!h || u >= s.getMonth()) && (!l || n.getMonth() >= u) && (y += "<option value='" + u + "'" + (u === e ? " selected='selected'" : "") + ">" + r[u] + "</option>");
                y += "</select>"
            }
            if (_ || (b += y + (!a && g && v ? "" : "&#xa0;")), !t.yearshtml)
                if (t.yearshtml = "", a || !v) b += "<span class='ui-datepicker-year'>" + i + "</span>";
                else {
                    for (c = this._get(t, "yearRange").split(":"), d = (new Date).getFullYear(), p = function (t) { var e = t.match(/c[+\-].*/) ? i + parseInt(t.substring(1), 10) : t.match(/[+\-].*/) ? d + parseInt(t, 10) : parseInt(t, 10); return isNaN(e) ? d : e }, f = p(c[0]), m = Math.max(f, p(c[1] || "")), f = s ? Math.max(f, s.getFullYear()) : f, m = n ? Math.min(m, n.getFullYear()) : m, t.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; m >= f; f++) t.yearshtml += "<option value='" + f + "'" + (f === i ? " selected='selected'" : "") + ">" + f + "</option>";
                    t.yearshtml += "</select>", b += t.yearshtml, t.yearshtml = null
                }
            return b += this._get(t, "yearSuffix"), _ && (b += (!a && g && v ? "" : "&#xa0;") + y), b += "</div>"
        },
        _adjustInstDate: function (t, e, i) {
            var s = t.selectedYear + ("Y" === i ? e : 0),
                n = t.selectedMonth + ("M" === i ? e : 0),
                a = Math.min(t.selectedDay, this._getDaysInMonth(s, n)) + ("D" === i ? e : 0),
                o = this._restrictMinMax(t, this._daylightSavingAdjust(new Date(s, n, a)));
            t.selectedDay = o.getDate(), t.drawMonth = t.selectedMonth = o.getMonth(), t.drawYear = t.selectedYear = o.getFullYear(), ("M" === i || "Y" === i) && this._notifyChange(t)
        },
        _restrictMinMax: function (t, e) {
            var i = this._getMinMaxDate(t, "min"),
                s = this._getMinMaxDate(t, "max"),
                n = i && i > e ? i : e;
            return s && n > s ? s : n
        },
        _notifyChange: function (t) {
            var e = this._get(t, "onChangeMonthYear");
            e && e.apply(t.input ? t.input[0] : null, [t.selectedYear, t.selectedMonth + 1, t])
        },
        _getNumberOfMonths: function (t) { var e = this._get(t, "numberOfMonths"); return null == e ? [1, 1] : "number" == typeof e ? [1, e] : e },
        _getMinMaxDate: function (t, e) { return this._determineDate(t, this._get(t, e + "Date"), null) },
        _getDaysInMonth: function (t, e) { return 32 - this._daylightSavingAdjust(new Date(t, e, 32)).getDate() },
        _getFirstDayOfMonth: function (t, e) { return new Date(t, e, 1).getDay() },
        _canAdjustMonth: function (t, e, i, s) {
            var n = this._getNumberOfMonths(t),
                a = this._daylightSavingAdjust(new Date(i, s + (0 > e ? e : n[0] * n[1]), 1));
            return 0 > e && a.setDate(this._getDaysInMonth(a.getFullYear(), a.getMonth())), this._isInRange(t, a)
        },
        _isInRange: function (t, e) {
            var i, s, n = this._getMinMaxDate(t, "min"),
                a = this._getMinMaxDate(t, "max"),
                o = null,
                r = null,
                h = this._get(t, "yearRange");
            return h && (i = h.split(":"), s = (new Date).getFullYear(), o = parseInt(i[0], 10), r = parseInt(i[1], 10), i[0].match(/[+\-].*/) && (o += s), i[1].match(/[+\-].*/) && (r += s)), (!n || e.getTime() >= n.getTime()) && (!a || e.getTime() <= a.getTime()) && (!o || e.getFullYear() >= o) && (!r || r >= e.getFullYear())
        },
        _getFormatConfig: function (t) { var e = this._get(t, "shortYearCutoff"); return e = "string" != typeof e ? e : (new Date).getFullYear() % 100 + parseInt(e, 10), { shortYearCutoff: e, dayNamesShort: this._get(t, "dayNamesShort"), dayNames: this._get(t, "dayNames"), monthNamesShort: this._get(t, "monthNamesShort"), monthNames: this._get(t, "monthNames") } },
        _formatDate: function (t, e, i, s) { e || (t.currentDay = t.selectedDay, t.currentMonth = t.selectedMonth, t.currentYear = t.selectedYear); var n = e ? "object" == typeof e ? e : this._daylightSavingAdjust(new Date(s, i, e)) : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay)); return this.formatDate(this._get(t, "dateFormat"), n, this._getFormatConfig(t)) }
    }), t.fn.datepicker = function (e) {
        if (!this.length) return this;
        t.datepicker.initialized || (t(document).on("mousedown", t.datepicker._checkExternalClick), t.datepicker.initialized = !0), 0 === t("#" + t.datepicker._mainDivId).length && t("body").append(t.datepicker.dpDiv);
        var i = Array.prototype.slice.call(arguments, 1);
        return "string" != typeof e || "isDisabled" !== e && "getDate" !== e && "widget" !== e ? "option" === e && 2 === arguments.length && "string" == typeof arguments[1] ? t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this[0]].concat(i)) : this.each(function () { "string" == typeof e ? t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this].concat(i)) : t.datepicker._attachDatepicker(this, e) }) : t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this[0]].concat(i))
    }, t.datepicker = new i, t.datepicker.initialized = !1, t.datepicker.uuid = (new Date).getTime(), t.datepicker.version = "1.12.1", t.datepicker
});