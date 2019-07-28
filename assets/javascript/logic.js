console.log('logic.js is connected');
$(document).ready(function(){
    console.log('js connected');
    $('.div2').hide();
    $('.div3').hide();
    
    //Function Declerations//
      function displayleagueInfo() {
        var queryURL = "https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id=4387";
      
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          console.log(response);
          console.log(response.teams[0]);
          console.log(response.teams[0].strTeamLogo);
        //Working 4 Loop printing out all team logos images. img size targeted by style.css though class. 
          for(var i = 0; i < response.teams.length; i++){
            var teamLogo = response.teams[i].strTeamBadge;
            var imgTag = $('<img>');
            imgTag.attr('src', teamLogo).attr('class', 'team-badge').attr('team-id', response.teams[i].idTeam);
            $('.div2').append(imgTag);
          }
          });
      }
    
      // function displayTeamInfo(){
      //   var queryURL = 
      // }
    
    
       
    //Materialize init
    $('.slider').slider({
      indicators: true,
      height: 400,
      transition: 500,
      interval: 6000
    }); 
    
     //Onclick event 
    $('.nba').on("click",function(){
      displayleagueInfo();
      console.log('clicked');
      $('.div1').hide();
      $('.div2').show();
     });
    
    //Team-img click event
    $(document).on('click', 'img', function(){ 
      console.log('clicked');
    
    });
    
    $(".dropdown-trigger").dropdown();
 
    });
    
    // Working Commented out code 
    
    //Working 4 Loop printing teamLogo img & discription ** but not displaying correct Materialize card. 
          // for(var i = 0; i < response.teams.length; i++){
          //  var teamLogo = response.teams[i].strTeamBadge;
          //  var divRow = $('<div>').attr('class','row');
          //  var divCol = $('<div>').attr('class', 'col s12 m7');
          //  var divCardImg = $('<div>').attr('class', 'card-image');
          //  var img = $('<img>').attr('src', teamLogo).attr('class', 'team-badge');
          //  var span = $('<span>').attr('class', 'card-title').text(response.teams[i].strTeam);
          //  var divContent = $('<div>').attr('class', 'card-content');
          //  var pTag = $('<p>').text(response.teams[i].strStadiumDescription);
          //  divContent = divContent.append(pTag);
          //  divCardImg = divCardImg.append(img).append(span);
          //  divCol = divCol.append(divContent).append(divCardImg);
          //  divRow = divRow.append(divCol);
          //  $('.img-container').append(divRow);
          
          // }
