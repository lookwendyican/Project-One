
var teams = [];
$(document).ready(function(){
    console.log('js connected');
  //Hides the leauge page on load
    $('.div2').hide();
    $('.div3').hide();
    

 //Materialize init
    $('.slider').slider({
      indicators: true,
      height: 400,
      transition: 500,
      interval: 6000
    }); 
    
    
    function getTeamsInLeague(leagueName) {

      //Given the passed leagueName, return all the teams in that league.
      // leagueName must be one of:
      // "MLB" - Mayor League Baseball (US).
      // "NBA" - National Basketball Association (US)
      // "NFL" - National Football League (US) 
      // "NHL" - National Hockey League (US) 
  
      //event.preventDefault(); // Prevent default form processing.
  
      var queryURL = "https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=" + leagueName;
  
      $.ajax({
          url: queryURL,
          method: "GET"
      }).then(function (response) {
          renderTeamsCallback(response);
          console.log(response);
      });
  }


  function renderTeamsCallback(ajaxResult) {

    $("#test_table thead").empty();
    $("#test_table tbody").empty();

    //Create the table headings and append to <thead>:
    var th_tr1 = $("<th scope='col'>");
    th_tr1.text("Team Name");
    var th_tr2 = $("<th scope='col'>");
    th_tr2.text("Team Logo");
    $("#test_table thead").append(th_tr1).append(th_tr2);

    //Create each row in the table and append to <tbody>
    for (var i = 0; i < ajaxResult.teams.length; i++) {
        //Create the row element for the table
        var tr = $("<tr>");
        tr.attr("data-rowkey", ajaxResult.teams[i].idTeam);
        //Create a <td> element the remaining elements from the ajaxResult
        var column1 = $("<td id='" + ajaxResult.teams[i].idTeam + "'>");
        column1.text(ajaxResult.teams[i].strTeam);
        column1.addClass("team_name");

        var column2 = $("<td>").html("<a href='#'?idTeam=" + ajaxResult.teams[i].idTeam + "><img src = '" + ajaxResult.teams[i].strTeamBadge + "' style='width:100px;height:100px' ></a>");
        column2.addClass("team_logo");
        //Append the <td>'s to the <tr>
        tr.append(column1).append(column2);

        //Append the row to the <tbody>
        $("#test_table tbody").append(tr);
    };
}
   
  $(function () {

    console.log("league.js: Javascript OK");

    // Bind the function to the <a> link in the navbar.
    $(".league_link").click(function () {
        // Hides the landing page, then displays the leauge page.  
        $('.div1').hide();
        $('.div2').show();
        getTeamsInLeague($(this).attr("data-leagueName"));
    });

});
    
///////////////////////////////////////////////////////////////

  $(document).on('click', '.team_logo',function(){
    $('.div2').hide();
    $('.div3').show();
    console.log('clicked');
  
  });


}); // Ending document.ready tag

  //   var leagues = ["nba", "nfl", "mlb", "American Major League Soccer"];
  //   for(var i = 0; i < leagues.length; i++){
  //     console.log(leagues[i]);
  //   var queryURL = "https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=" + leagues[i];


  //   $.ajax({
  //       url: queryURL,
  //       method: "GET"
  //   }).then(function (response) {
  //     //console.log(response);
  //     for(var j = 0; j < response.teams.length;j++){
  //       //console.log(response.teams[j].strTeam);
  //       teams.push(response.teams[j].strTeam);
       
  //     }  
      
  //   });
  //   //console.log(teams);
  // }
    
  // console.log(teams);