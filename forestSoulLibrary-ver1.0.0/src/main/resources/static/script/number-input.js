(function ($) {
    $.extend({
        numberInputInit: function (options) {
            var defaults = {
                numberSeletctor: ".numberInputBox",
                max: 999,
                min: 0,
                interval: 1
            }
            var opts = $.extend({}, defaults, options);
            var $numberTag = $(opts.numberSeletctor)
            var setMax = opts.max;//设定最大值
            var setMin = opts.min;
            var setInterval = opts.interval;//设定间隔
            $.each($numberTag, function (key, box) {
                $(box.children[0]).click(function () {
                    if (box.children[1].value == setMin) {
                        $(box.children[0]).css({
                            "cursor": "not-allowed",
                            "color": "#ccc"
                        })
                    } else {
                        box.children[1].value = Number(box.children[1].value) - setInterval;
                        $(box.children[0]).css({
                            "cursor": "pointer",
                            "color": "#333"
                        })
                        $(box.children[2]).css({
                            "cursor": "pointer",
                            "color": "#333"
                        })
                        if (box.children[1].value < setMin) {
                            box.children[1].value = setMin;
                        }
                        if (box.children[1].value > setMax) {
                            box.children[1].value = setMax;
                        }
                    }

                })
                $(box.children[2]).click(function () {

                    if (box.children[1].value == setMax) {
                        $(box.children[2]).css({
                            "cursor": "not-allowed",
                            "color": "#ccc"
                        })
                    } else {
                        box.children[1].value = Number(box.children[1].value) + setInterval;
                        $(box.children[2]).css({
                            "cursor": "pointer",
                            "color": "#333"
                        })
                        $(box.children[0]).css({
                            "cursor": "pointer",
                            "color": "#333"
                        })
                        if (box.children[1].value > setMax) {
                            box.children[1].value = setMax;
                        }
                        if (box.children[1].value < setMin) {
                            box.children[1].value = setMin;
                        }
                    }
                })
                $(box.children[1]).on("blur", function () {
                    if (box.children[1].value > setMax) {
                        box.children[1].value = setMax;
                    }
                    if (box.children[1].value < setMin) {
                        box.children[1].value = setMin
                    }
                    box.children[1].value = Number(box.children[1].value)
                    if ((box.children[1].value) == "NaN") {
                        box.children[1].value = setMin;
                    }

                })
            })
        }
    });
});

