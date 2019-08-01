/////////////////////////////////////////////////////////////////////////////////////
// .NAME
//   team.js
// .WHAT
//   Contains the logic calling the API's and populating the regions in the
//   "Teams" page. 
// .AUTHOR
//   SportsFan App team. 
// .DATE
//   27-JUL-2019
// .NOTES
//   There is one function for each section in the page. Each function calls the
//   SportsDB API and fetches the data, and populates the HTML elements in the page.
//////////////////////////////////////////////////////////////////////////////////////

//functions
var teamName = "";

function getTeamDescription(idTeam) {

    //Given the idTeam parameter, return the team description field from the API data.
    //event.preventDefault(); // Prevent default form processing.

    var queryURL = "https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=" + idTeam;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        renderTeamDescCallback(response); 
    });
}

// Function to render the data from the API call to the page.
// This version sends the data to the test-table in index.html
// The JQuery selectors must be changed to send the data to the correct page
// when they become available. 

function renderTeamDescCallback(ajaxResult) {

    $("#team_test_table thead").empty();
    $("#team_test_table tbody").empty();

    //Create the table headings and append to <thead>:
    var th_tr1 = $("<th scope='col'>");
    th_tr1.text("Team Name");
    var th_tr2 = $("<th scope='col'>");
    th_tr2.text("Team Description");
    $("#team_test_table thead").append(th_tr1).append(th_tr2);

    //Create each row in the table and append to <tbody>

    //Create the row element for the table
    var tr = $("<tr>");
    tr.attr("data-rowkey", ajaxResult.teams[0].idTeam);
    //Create a <td> element the remaining elements from the ajaxResult
    var column1 = $("<td>").text(ajaxResult.teams[0].strTeam);
    teamName = ajaxResult.teams[0].strTeam;
    console.log(teamName);
    upcomingEvents     (teamName);
    var column2 = $("<td>").text(ajaxResult.teams[0].strDescriptionEN);
    //upcominEvents(ajaxResult.teams[0].strTeam);
    //Append the <td>'s to the <tr>
    tr.append(column1).append(column2);

    //Append the row to the <tbody>
    $("#team_test_table tbody").append(tr);
    
///////////////////////////////////////////////////////////////
            //Adding Rick-branch code
    var teamBanner = $('<img>').attr('src',ajaxResult.teams[0].strTeamBanner).attr('class', 'responsive-img');
    $('#team-banner').append(teamBanner);
    var teamName = $('<h3>').text(ajaxResult.teams[0].strTeam);
    $('#team-name').append(teamName);
    var teamStadium = $('<img>').attr('src',ajaxResult.teams[0].strStadiumThumb).attr('class','responsive-img');
    var stadiumName = $('<h5>').attr('class', 'center-align').text(ajaxResult.teams[0].strStadium);
    $('#team-stadium').append(teamStadium).append(stadiumName);
}

function getTeamRecentEvents( idTeam ) {

    //Given the idTeam parameter, return the 5 most recent events' information for the team.

    //event.preventDefault(); // Prevent default form processing.

    var queryURL = "https://www.thesportsdb.com/api/v1/json/1/eventslast.php?id=" + idTeam ;

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then( function (response)  { 
          renderTeamRecentsCallback(response); 
      });
}

// This function gets called when the ajax call in getTeamRecentEvents() completes.
// It will render the data in the page's HTML elements. 
function renderTeamRecentsCallback(ajaxResult) {
    
    $( "#team_recents_table thead" ).empty();
    $( "#team_recents_table tbody" ).empty();
    
    //Create the table headings and append to <thead>:
    var th_tr1     = $("<th scope='col'>") ;
    th_tr1.text(" Date " ).attr('class', 'team-date-for-table'); 
    var th_tr2     = $("<th scope='col'>") ;
    th_tr2.text(" Teams ").attr('class', 'team-title-for-table'); 
    $( "#team_recents_table thead" ).append(th_tr1).append(th_tr2);

    //Create each row in the table and append to <tbody>
    for (var i = 0; i < ajaxResult.results.length; i++) {

        //Create the row element for the table
        var tr = $("<tr>"); 
        tr.attr("data-rowkey", ajaxResult.results[i].idTeam); 
        //Create a <td> element the remaining elements from the ajaxResult
        var column1 = $("<td>").text(ajaxResult.results[i].dateEvent).attr('class', 'team-pastdate-events-for-table');
        //Format a string to show results, if available from the API, with format:
        // "Away Team"(score) vs "Home Team"(score)
        var teamsString  =  ajaxResult.results[i].strAwayTeam; 
        teamsString      += (ajaxResult.results[i].intAwayScore == null) ? " " : "(" + ajaxResult.results[i].intAwayScore + ")" ;
        teamsString      += " vs ";
        teamsString      += ajaxResult.results[i].strHomeTeam;
        teamsString      += (ajaxResult.results[i].intHomeScore == null) ? " " : "(" + ajaxResult.results[i].intHomeScore + ")" ;
        var column2 = $("<td>").text(teamsString).attr('class', 'team-past-events-for-table');
        //Append the <td>'s to the <tr>
        tr.append(column1).append(column2);
 
        //Append the row to the <tbody>
        $("#team_recents_table tbody").append(tr);
    }
}

function upcomingEvents(team) {

    console.log(team);
    var queryURL = "https://app.ticketmaster.com/discovery/v2/events?apikey=0phArGmYm8abdfp2VA0WZUmwUOrtVAq6&keyword=" + team + "&locale=*";

    $( "#team_next_table thead" ).empty();
    $( "#team_next_table tbody" ).empty();
    
    //Create the table headings and append to <thead>:
    var th_date= $("<th>") ;
    th_date.text("Date" ); 
    var th_time = $("<th>") ;
    th_time.text("Time"); 
    var th_name = $("<th>") ;
    th_name.text("Teams"); 
    var th_link = $("<th>") ;
    th_link.text("Tickets"); 

    $( "#team_next_table thead" ).append(th_date).append(th_time).append(th_name).append(th_link);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);
        //get the next 5 events of the team from ticket master
        for(var i=0; i<5; i++) {


            var newTr = $("<tr>");
            //date of the game
            console.log(response._embedded.events[i].dates.start.localDate); 
            //time of the game
            console.log(response._embedded.events[i].dates.start.localTime);
            //name and teams of the game
            console.log(response._embedded.events[i].name); 
            //url to buy tickets to the game
            console.log(response._embedded.events[i].url); 
            var newTd_date= $("<td>") ;
            newTd_date.text(response._embedded.events[i].dates.start.localDate); 
            var newTd_time = $("<td>") ;
            newTd_time.text(response._embedded.events[i].dates.start.localTime); 
            var newTd_name = $("<td>") ;
            newTd_name.text(response._embedded.events[i].name); 
            var ticketButton = $("<button>") ;
            ticketButton.text("Tickets"); 
            newTr.append(newTd_date).append(newTd_time).append(newTd_name).append(ticketButton);
            $( "#team_next_table tbody" ).append(newTr);
        }
    });
}

$( function() { 

    console.log("team.js: Javascript OK");
    
    $.urlParam = function (name) {

        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        
        if (results == null) {
            return null;
        }

        return decodeURI(results[1]) || 0;
    }

    getTeamDescription ( $.urlParam( "idTeam" ) );
    getTeamRecentEvents( $.urlParam( "idTeam" ) );
    //upcomingEvents     (teamName);

});
// Clears the input value on submit. 
$('#submit').on('click', function(){
    console.log('clicked');
    var rating = $('#rating').val();
      console.log(rating);
      $('#rating').val('');
      $('.modal').modal();
  });

  