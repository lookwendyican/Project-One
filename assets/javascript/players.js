/////////////////////////////////////////////////////////////////////////////////////
// .NAME
//   players.js
// .WHAT
//   Contains the logic calling the API's and populating the HTML page regions 
//   for anything related to a teams's players.  
// .AUTHOR
//   SportsFan App team. 
// .DATE
//   27-JUL-2019
// .NOTES
//   There is one function for each section in the page. Each function calls the
//   SportsDB API and fetches the data, and populates the HTML elements in the page.
//////////////////////////////////////////////////////////////////////////////////////

//functions:
//Retrieve all the players in a team.

function getPlayersInTeam( idTeam ) {

    //event.preventDefault(); // Prevent default form processing.

    var queryURL = "https://www.thesportsdb.com/api/v1/json/1/lookup_all_players.php?id=" + idTeam ;
    
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then( function (response)  { 
          renderPlayersCallback(response) ; 
      } );

}

// Function to render the data from the API call to the page.
// This version sends the data to the a table element.
// TODO: The JQuery selectors must be changed to send the data to the correct page. 
function renderPlayersCallback( ajaxResult ) {

    $( "#players_table thead" ).empty();
    $( "#players_table tbody" ).empty();
    
    //Create the table headings and append to <thead>:
      var th_tr1     = $("<th scope='col'>") ;
      th_tr1.text("Player Name"); 
      var th_tr2     = $("<th scope='col'>") ;
      th_tr2.text("Pic");
      th_tr3         = $("<th scope='col'>");
      th_tr3.text("Bio"); 

      $( "#players_table thead" ).append(th_tr1).append(th_tr2).append(th_tr3);

    //Create each row in the table and append to <tbody>
    for (var i = 0; i < ajaxResult.player.length; i++) {
        //Create the row element for the table

        var tr = $("<tr>"); 
        tr.attr("data-rowkey", ajaxResult.player[i].idPlayer); 
        
        //Create a <td> element the remaining elements from the ajaxResult
        var column1 = $("<td>").text(ajaxResult.player[i].strPlayer);
        //column1.addClass("team_name");

        console.log (ajaxResult.player[i].strThumb);
        var column2 = $("<td>").html("<img src='" + ajaxResult.player[i].strThumb + "' style='width:100px;height:100px'>");
        //column2.addClass("team_logo");

        var column3 = $("<td>").text(ajaxResult.player[i].strDescriptionEN);

        //Append the <td>'s to the <tr>
        tr.append(column1).append(column2).append(column3); 
 
        //Append the row to the <tbody>
        $("#players_table tbody").append(tr);
    };
}




///////////////////////////////////////////////////////////////
// Main
///////////////////////////////////////////////////////////////
$( function () { 

    console.log("Players.js: Javascript OK");    
    
    $.urlParam = function(name){
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results==null) {
           return null;
        }
        return decodeURI(results[1]) || 0;
    }
    
    getPlayersInTeam($.urlParam( "idTeam" ) ) ; 

});

  

 
