$(function() {
    var tobj = null;
    var freqs = [
        15000, 16000, 17000, 17500, 18000, 18500, 19000, 19500,
        20000, 20500, 21000, 21500, 22000
    ];

    freqs.forEach(function (value, index, context) {
        $('div#beeps').append(
            '<div class="play" data-freq="' + value + '">'+ value + ' Hz</div>'
        );
    });

    $('.play').click(function () {
        if (tobj) {
            tobj.pause();
            tobj = null;
        } else {
            var freq = this.getAttribute('data-freq');
            tobj = T('sin').play();
            tobj.set({freq:parseInt(freq, 10)});
        }
    });
});
