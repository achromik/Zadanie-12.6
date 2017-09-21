var url = 'https://restcountries.eu/rest/v2/name/',
    $countriesList = $('#countries'),
    $info = $('#info'); 

$('#search').on('click', searchCountries);

$('#country-name').on('keypress', function(event) {
    var keycode = event.keyCode || event.which;
    if(keycode == '13' || keycode == '10') {
        searchCountries();
    }
});

function searchCountries () {
    var countryName = $('#country-name').val();
        

    //if search field is empty then set country as POLAND
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

var full = true ;


function show(resp) {
    //response = resp;
    if (full) {
        showFull(resp);
        
    } else {
        showCountriesList(resp);
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
            $wrapper = $('<div>').addClass('country__item-wrapper'),
            $name = $('<h3>').addClass('country__name').text(element.name),
            $flag = $('<img>').addClass('flag').attr('src', element.flag),
            $capital = $('<h4>').addClass('country__capital').text(element.capital);

        $wrapper.append($name).append($flag).append($capital).appendTo($listItem).appendTo($countriesList);
                               
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