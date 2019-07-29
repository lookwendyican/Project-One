/////////////////////////////////////////////////////////////////////////////////////
// .NAME
//   league.js
// .WHAT
//   Contains the logic calling the API's and populating the regions 
//   for the sports Leagues page. 
// .AUTHOR
//   SportsFan App team. 
// .DATE
//   27-JUL-2019
// .NOTES
//   There is one function for each section in the page. Each function calls the
//   SportsDB API and fetches the data, and populates the HTML elements in the page.
//////////////////////////////////////////////////////////////////////////////////////

//functions
function getTeamsInLeague( leagueName ) {

    //Given the passed leagueName, return all the teams in that league.
    // leagueName must be one of:
    // "MLB" - Mayor League Baseball (US).
    // "NBA" - National Basketball Association (US)
    // "NFL" - National Football League (US) 
    // "NHL" - National Hockey League (US) 

    //event.preventDefault(); // Prevent default form processing.

    var queryURL = "https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=" + leagueName ;
    
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then( function (response)  { 
          renderTeamsCallback(response) ; 
      } );

}

// Function to render the data from the API call to the page.
// This version sends the data to the test-table in index.html
// The JQuery selectors must be changed to send the data to the correct page. 
function renderTeamsCallback( ajaxResult ) {

    $( "#test_table thead" ).empty();
    $( "#test_table tbody" ).empty();
    
    //Create the table headings and append to <thead>:
      var th_tr1     = $("<th scope='col'>") ;
      th_tr1.text("Team Name"); 
      var th_tr2     = $("<th scope='col'>") ;
      th_tr2.text("Team Logo"); 
      $( "#test_table thead" ).append(th_tr1).append(th_tr2);

    //Create each row in the table and append to <tbody>
    for (var i = 0; i < ajaxResult.teams.length; i++) {
        //Create the row element for the table
        var tr = $("<tr>"); 
        tr.attr("data-rowkey", ajaxResult.teams[i].idTeam); 
        //Create a <td> element the remaining elements from the ajaxResult
        var column1 = $("<td id='" + ajaxResult.teams[i].idTeam +"'>");
        column1.text(ajaxResult.teams[i].strTeam);
        column1.addClass("team_name");

        var column2 = $("<td>").html("<a href='output_test.html?idTeam="  +
                                      ajaxResult.teams[i].idTeam          +
                                      "' target='_blank'><img src = '"    + 
                                      ajaxResult.teams[i].strTeamBadge    + 
                                      "' style='width:100px;height:100px' ></a>");
        column2.addClass("team_logo");
        //Append the <td>'s to the <tr>
        tr.append(column1).append(column2);
 
        //Append the row to the <tbody>
        $("#test_table tbody").append(tr);
    };
}

$( function () { 

    console.log("league.js: Javascript OK");
    
    // Bind the function to the <a> link in the navbar.
    $( ".league_link" ).click(function() {
    // Hides the landing page, then displays the leauge page.  
        $('.div1').hide();
        $('.div2').show();
        getTeamsInLeague($(this).attr("data-leagueName"));
    });

});



 
