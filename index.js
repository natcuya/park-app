'use strict';

const searchUrl = 'https://api.nps.gov/api/v1/parks'
const apiKey = 'voFVKpBi1Knkv3QOeQWrJv7ZpY8v8LjT5dds1EDA'

function formatQueryParams(params) {
    const queryItems = Object.keys(params).map(key => `${[encodeURIComponent(key)]}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
}

function displayResults(responseJson, maxResults) {
    console.log(responseJson);
    //empties result list for new response
    $('.results-list').empty();
    //loops through array and appends a description,full,and url to list for each park
    for (let i = 0; i < responseJson.data.length & i < maxResults; i++) {
        $('.results-list').append(`<li><h3><a href="${responseJson.data[i].url}">${responseJson.data[i].fullName}</a></h3>
        <p>${responseJson.data[i].description}</p></li>`);
    }
    $('.results').removeClass('hidden');
}

function getParks( stateName, maxResults) {
   //paramaters to be considered is state code and limit of results
    const params = {
        stateCode: stateName,
        limit: maxResults
    };
    //creates url for get request
    const queryString = formatQueryParams(params);
    const url = searchUrl + '?' + queryString;
    console.log(url);

    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
        $('.js-error').text(`Something went wrong: please try again - ${err.message}`);
    });
}

function watchForm() {
    $('.js-form').submit(event =>{
        event.preventDefault();
        const stateName = $('.js-state').val();
        const maxResults = $('.js-result').val();
        getParks(stateName, maxResults);
    });
}

$(watchForm);