var url = 'https://restcountries.eu/rest/v2/name/',
    $countriesList = $('#countries'),
    $info = $('#info'); 

var response;    

$('#search').on('click', searchCountries);


$('#country-name').on('keypress', function(event) {
    var keycode = event.keyCode || event.which;
    if(keycode == '13' || keycode == '10') {
        searchCountries();
    }
});

$('#full').on('change', function(event) {
    if(response) {
        show(response);
    }
});


function searchCountries () {
    var countryName = $('#country-name').val();
    if(!countryName.length) countryName = '';
    $.ajax({
        url: url + countryName,
        method: 'GET',
        success: show,
        //success: showCountriesList,
        statusCode : {
            404: showNotFound
        }
    });
}

function show(resp) {
    response = resp;

    if ($('#full').is(':checked')) {
        showFull(response);
        
    } else {
        showCountriesList(response);
    }
    $info.text('Match found: ' + resp.length );
} 

function showCountriesList(resp) {
    $countriesList.empty();
    $info.empty();
    resp.forEach(function(element) {
        $('<li>').text('Name: ' + element.name + ' -> Capital City: ' + element.capital).appendTo($countriesList);    
    });
    
}
function showFull(resp) {
    $countriesList.empty();
    $countriesList.addClass('type-list-none');
    resp.forEach(function(element) {

        var $listItem = $('<li>').addClass('country__item'),
            $name = $('<h3>').addClass('country__name col-8').text(element.name),
            $capital = $('<span>').addClass('country__capital').text(element.capital),
            $flag = ($('<img>').addClass('flag').attr('src', element.flag));

        $countriesList
        .append($listItem
            .append($('<div>').addClass('row')
                .append($('<div>').addClass('col-3').append($flag))
                .append($('<div>').addClass('col-9').append($name))
            )
            .append($('<div>').addClass('row')
                .append($('<div>').addClass('col-2').text('Capital:'))
                .append($('<div>').addClass('col-8').append($capital))
            )
            .append($('<div>').addClass('row')
                .append($('<div>').addClass('col-2').text('Currency:'))
                .append($('<div>').addClass('col-4 value').text(element.currencies[0].name))
                .append($('<div>').addClass('col-2').text('Time zones:'))
                .append($('<div>').addClass('col-4 value').text(element.timezones.join(', ')))
            )
            .append($('<div>').addClass('row')
                .append($('<div>').addClass('col-2').text('Population:'))
                .append($('<div>').addClass('col-4 value').text(element.population))
                .append($('<div>').addClass('col-2').text('Subregion:'))
                .append($('<div>').addClass('col-4 value').text(element.subregion))
            )
            .append($('<div>').addClass('row')
                .append($('<div>').addClass('col-2').text('Borders'))
                .append($('<div>').addClass('col-10 value').text(element.borders.join(', ')))
            )
        );
    });
}

function showNotFound() {
    $countriesList.empty();
    $info.empty();
    $('<p>').text('No match found').css({
        color: "red",
        fontSize: "18px"
    }).appendTo($info);   
}

String.prototype.packInTag = function(tag) {
    return '<' + tag + '>'+ this + '</' + tag + '>';
};