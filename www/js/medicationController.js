angular.module('starter.medicationController', ['ngCordova'])
/*----------------------------------------------------------------------------*/
/* Medication Controller
/* zyssm4
/* The comments should show "what is what" and "how to use it"
/*----------------------------------------------------------------------------*/
// Use this service like all others:
// --> Add reference to your index.html (<script src="js/medicationController.js"></script>)


.controller('medplanCtrl', function ($scope, $state, $ionicPopup, ownMidataService) {

            $scope.header = [{title:'', class:'colSize bigger'},
                             {title:'Morgen',class:'MorningColor'},
                             {title:'Mittag',class:'NoonColor'},
                             {title:'Abend',class:'EveningColor'},
                             {title:'Nacht',class:'NightColor'}];

            $scope.days = [{title:'Mo', status:"unchecked", id:"1"},
                           {title:'Di', status:"unchecked", id:"2"},
                           {title:'Mi', status:"unchecked", id:"3"},
                           {title:'Do', status:"unchecked", id:"4"},
                           {title:'Fr', status:"unchecked", id:"5"},
                           {title:'Sa', status:"unchecked", id:"6"},
                           {title:'So', status:"unchecked", id:"7"}];

            $scope.time = [  {title:'Morgen',daytime:"morning",class:'MorningColor morning'},
                           {title:'Mittag',daytime:"noon" ,class:'NoonColor  noon'},
                           {title:'Abend',daytime:"evening" ,class:'EveningColor evening '},
                           {title:'Nacht',daytime:"night" ,class:'NightColor  night'}];


            //The event retrives the element infromation
            $scope.showLocalStorage = function(event){
              var DayId = event.target.parentElement.parentElement.id;
              var TimeId = event.target.parentElement.id;
              var target = event.target.classList["0"]
              $scope.popUpDayId = event.target.parentElement.parentElement.id;
              $scope.popUpTimeId = event.target.id;

            $scope.data =[];

            var medList = JSON.parse(localStorage.getItem("MedicationList"));

            for(var i = 0; i < medList.medication.length; i++) {
                var obj = JSON.parse(medList.medication[i]);
                $scope.data.push(obj);
            }


            var customTemplate = "";


          for(var i = 0; i < $scope.data.length; i++) {

            //Steps trought each entry of the localStorage and compares the mediID with the ID of the different Buttons.
            //created by zyssm4
          if($scope.popUpTimeId == 0){
              if($scope.popUpDayId == 0){
              if($scope.data[i].schema.Morning.state == "unchecked" && $scope.data[i].interval[0] == "unchecked"){
                customTemplate += "<div class='toTakePopUp'>" +
                                    "<img class='IMGTakePopUp' src=" + $scope.data[i].img + "></img>" +
                                    "<span class='textTakePopUp'>" + $scope.data[i].name  +
                                    "  Anzahl: " +
                                    $scope.data[i].schema.Morning.amount +
                                    "</span>"+
                                  "</div>";
              }
            }
          }

          if($scope.popUpTimeId == 0){
              if($scope.popUpDayId == 1){
              if($scope.data[i].schema.Morning.state == "unchecked" && $scope.data[i].interval[1] == "unchecked"){
                customTemplate += "<div class='toTakePopUp'>" +
                                    "<img class='IMGTakePopUp' src=" + $scope.data[i].img + "></img>" +
                                    "<span class='textTakePopUp'>" + $scope.data[i].name  +
                                    "  Anzahl: " +
                                    $scope.data[i].schema.Morning.amount +
                                    "</span>"+
                                  "</div>";
              }
            }
          }

          if($scope.popUpTimeId == 0){
              if($scope.popUpDayId == 2){
              if($scope.data[i].schema.Morning.state == "unchecked" && $scope.data[i].interval[2] == "unchecked"){
                customTemplate += "<div class='toTakePopUp'>" +
                                    "<img class='IMGTakePopUp' src=" + $scope.data[i].img + "></img>" +
                                    "<span class='textTakePopUp'>" + $scope.data[i].name  +
                                    "  Anzahl: " +
                                    $scope.data[i].schema.Morning.amount +
                                    "</span>"+
                                  "</div>";
              }
            }
          }


          //Donnerstag Morgen
          if($scope.popUpTimeId == 0){
              if($scope.popUpDayId == 3){
              if($scope.data[i].schema.Morning.state == "unchecked" && $scope.data[i].interval[3] == "unchecked"){
                customTemplate += "<div class='toTakePopUp'>" +
                                    "<img class='IMGTakePopUp' src=" + $scope.data[i].img + "></img>" +
                                    "<span class='textTakePopUp'>" + $scope.data[i].name  +
                                    "  Anzahl: " +
                                    $scope.data[i].schema.Morning.amount +
                                    "</span>"+
                                  "</div>";
              }
            }
          }

          //Freitag Morgen
          if($scope.popUpTimeId == 0){
              if($scope.popUpDayId == 4){
              if($scope.data[i].schema.Morning.state == "unchecked" && $scope.data[i].interval[4] == "unchecked"){
                customTemplate += "<div class='toTakePopUp'>" +
                                    "<img class='IMGTakePopUp' src=" + $scope.data[i].img + "></img>" +
                                    "<span class='textTakePopUp'>" + $scope.data[i].name  +
                                    "  Anzahl: " +
                                    $scope.data[i].schema.Morning.amount +
                                    "</span>"+
                                  "</div>";
              }
            }
          }

          //Samstag Morgen
          if($scope.popUpTimeId == 0){
              if($scope.popUpDayId == 5){
              if($scope.data[i].schema.Morning.state == "unchecked" && $scope.data[i].interval[5] == "unchecked"){
                customTemplate += "<div class='toTakePopUp'>" +
                                    "<img class='IMGTakePopUp' src=" + $scope.data[i].img + "></img>" +
                                    "<span class='textTakePopUp'>" + $scope.data[i].name  +
                                    "  Anzahl: " +
                                    $scope.data[i].schema.Morning.amount +
                                    "</span>"+
                                  "</div>";
              }
            }
          }

          //Sonntag Morgen
          if($scope.popUpTimeId == 0){
              if($scope.popUpDayId == 6){
              if($scope.data[i].schema.Morning.state == "unchecked" && $scope.data[i].interval[6] == "unchecked"){
                customTemplate += "<div class='toTakePopUp'>" +
                                    "<img class='IMGTakePopUp' src=" + $scope.data[i].img + "></img>" +
                                    "<span class='textTakePopUp'>" + $scope.data[i].name  +
                                    "  Anzahl: " +
                                    $scope.data[i].schema.Morning.amount +
                                    "</span>"+
                                  "</div>";
              }
            }
          }

          //Montag Mittag
          if($scope.popUpTimeId == 1){
              if($scope.popUpDayId == 0){
              if($scope.data[i].schema.Noon.state == "unchecked" && $scope.data[i].interval[0] == "unchecked"){
                customTemplate += "<div class='toTakePopUp'>" +
                                    "<img class='IMGTakePopUp' src=" + $scope.data[i].img + "></img>" +
                                    "<span class='textTakePopUp'>" + $scope.data[i].name  +
                                    "  Anzahl: " +
                                    $scope.data[i].schema.Noon.amount +
                                    "</span>"+
                                  "</div>";
              }
            }
          }

          //Dienstag Mittag
          if($scope.popUpTimeId == 1){
              if($scope.popUpDayId == 1){
              if($scope.data[i].schema.Noon.state == "unchecked" && $scope.data[i].interval[1] == "unchecked"){
                customTemplate += "<div class='toTakePopUp'>" +
                                    "<img class='IMGTakePopUp' src=" + $scope.data[i].img + "></img>" +
                                    "<span class='textTakePopUp'>" + $scope.data[i].name  +
                                    "  Anzahl: " +
                                    $scope.data[i].schema.Noon.amount +
                                    "</span>"+
                                  "</div>";
              }
            }
          }

          //Mittwoch Mittag
          if($scope.popUpTimeId == 1){
              if($scope.popUpDayId == 2){
              if($scope.data[i].schema.Noon.state == "unchecked" && $scope.data[i].interval[2] == "unchecked"){
                customTemplate += "<div class='toTakePopUp'>" +
                                    "<img class='IMGTakePopUp' src=" + $scope.data[i].img + "></img>" +
                                    "<span class='textTakePopUp'>" + $scope.data[i].name  +
                                    "  Anzahl: " +
                                    $scope.data[i].schema.Noon.amount +
                                    "</span>"+
                                  "</div>";
              }
            }
          }

          //Donnerstag Mittag
          if($scope.popUpTimeId == 1){
              if($scope.popUpDayId == 3){
              if($scope.data[i].schema.Noon.state == "unchecked" && $scope.data[i].interval[3] == "unchecked"){
                customTemplate += "<div class='toTakePopUp'>" +
                                    "<img class='IMGTakePopUp' src=" + $scope.data[i].img + "></img>" +
                                    "<span class='textTakePopUp'>" + $scope.data[i].name  +
                                    "  Anzahl: " +
                                    $scope.data[i].schema.Noon.amount +
                                    "</span>"+
                                  "</div>";
              }
            }
          }

          //Freitag Mittag
          if($scope.popUpTimeId == 1){
              if($scope.popUpDayId == 4){
              if($scope.data[i].schema.Noon.state == "unchecked" && $scope.data[i].interval[4] == "unchecked"){
                customTemplate += "<div class='toTakePopUp'>" +
                                    "<img class='IMGTakePopUp' src=" + $scope.data[i].img + "></img>" +
                                    "<span class='textTakePopUp'>" + $scope.data[i].name  +
                                    "  Anzahl: " +
                                    $scope.data[i].schema.Noon.amount +
                                    "</span>"+
                                  "</div>";
              }
            }
          }

          //Samstag Mittag
          if($scope.popUpTimeId == 1){
              if($scope.popUpDayId == 5){
              if($scope.data[i].schema.Noon.state == "unchecked" && $scope.data[i].interval[5] == "unchecked"){
                customTemplate += "<div class='toTakePopUp'>" +
                                    "<img class='IMGTakePopUp' src=" + $scope.data[i].img + "></img>" +
                                    "<span class='textTakePopUp'>" + $scope.data[i].name  +
                                    "  Anzahl: " +
                                    $scope.data[i].schema.Noon.amount +
                                    "</span>"+
                                  "</div>";
              }
            }
          }

          //Sonntag Mittag
          if($scope.popUpTimeId == 1){
              if($scope.popUpDayId == 6){
              if($scope.data[i].schema.Noon.state == "unchecked" && $scope.data[i].interval[6] == "unchecked"){
                customTemplate += "<div class='toTakePopUp'>" +
                                    "<img class='IMGTakePopUp' src=" + $scope.data[i].img + "></img>" +
                                    "<span class='textTakePopUp'>" + $scope.data[i].name  +
                                    "  Anzahl: " +
                                    $scope.data[i].schema.Noon.amount +
                                    "</span>"+
                                  "</div>";
              }
            }
          }

          //Montag Abend
          if($scope.popUpTimeId == 2){
              if($scope.popUpDayId == 0){
              if($scope.data[i].schema.Evening.state == "unchecked" && $scope.data[i].interval[0] == "unchecked"){
                customTemplate += "<div class='toTakePopUp'>" +
                                    "<img class='IMGTakePopUp' src=" + $scope.data[i].img + "></img>" +
                                    "<span class='textTakePopUp'>" + $scope.data[i].name  +
                                    "  Anzahl: " +
                                    $scope.data[i].schema.Evening.amount +
                                    "</span>"+
                                  "</div>";
              }
            }
          }

          //Dienstag Abend
          if($scope.popUpTimeId == 2){
              if($scope.popUpDayId == 1){
              if($scope.data[i].schema.Evening.state == "unchecked" && $scope.data[i].interval[1] == "unchecked"){
                customTemplate += "<div class='toTakePopUp'>" +
                                    "<img class='IMGTakePopUp' src=" + $scope.data[i].img + "></img>" +
                                    "<span class='textTakePopUp'>" + $scope.data[i].name  +
                                    "  Anzahl: " +
                                    $scope.data[i].schema.Evening.amount +
                                    "</span>"+
                                  "</div>";
              }
            }
          }

          //Mittwoch Abend
          if($scope.popUpTimeId == 2){
              if($scope.popUpDayId == 2){
              if($scope.data[i].schema.Evening.state == "unchecked" && $scope.data[i].interval[2] == "unchecked"){
                customTemplate += "<div class='toTakePopUp'>" +
                                    "<img class='IMGTakePopUp' src=" + $scope.data[i].img + "></img>" +
                                    "<span class='textTakePopUp'>" + $scope.data[i].name  +
                                    "  Anzahl: " +
                                    $scope.data[i].schema.Evening.amount +
                                    "</span>"+
                                  "</div>";
              }
            }
          }

          //Donnerstag Abend
          if($scope.popUpTimeId == 2){
              if($scope.popUpDayId == 3){
              if($scope.data[i].schema.Evening.state == "unchecked" && $scope.data[i].interval[3] == "unchecked"){
                customTemplate += "<div class='toTakePopUp'>" +
                                    "<img class='IMGTakePopUp' src=" + $scope.data[i].img + "></img>" +
                                    "<span class='textTakePopUp'>" + $scope.data[i].name  +
                                    "  Anzahl: " +
                                    $scope.data[i].schema.Evening.amount +
                                    "</span>"+
                                  "</div>";
              }
            }
          }

          //Freitag Abend
          if($scope.popUpTimeId == 2){
              if($scope.popUpDayId == 4){
              if($scope.data[i].schema.Evening.state == "unchecked" && $scope.data[i].interval[4] == "unchecked"){
                customTemplate += "<div class='toTakePopUp'>" +
                                    "<img class='IMGTakePopUp' src=" + $scope.data[i].img + "></img>" +
                                    "<span class='textTakePopUp'>" + $scope.data[i].name  +
                                    "  Anzahl: " +
                                    $scope.data[i].schema.Evening.amount +
                                    "</span>"+
                                  "</div>";
              }
            }
          }

          //Samstag Abend
          if($scope.popUpTimeId == 2){
              if($scope.popUpDayId == 5){
              if($scope.data[i].schema.Evening.state == "unchecked" && $scope.data[i].interval[5] == "unchecked"){
                customTemplate += "<div class='toTakePopUp'>" +
                                    "<img class='IMGTakePopUp' src=" + $scope.data[i].img + "></img>" +
                                    "<span class='textTakePopUp'>" + $scope.data[i].name  +
                                    "  Anzahl: " +
                                    $scope.data[i].schema.Evening.amount +
                                    "</span>"+
                                  "</div>";
              }
            }
          }

          //Sonntag Abend
          if($scope.popUpTimeId == 2){
              if($scope.popUpDayId == 6){
              if($scope.data[i].schema.Evening.state == "unchecked" && $scope.data[i].interval[6] == "unchecked"){
                customTemplate += "<div class='toTakePopUp'>" +
                                    "<img class='IMGTakePopUp' src=" + $scope.data[i].img + "></img>" +
                                    "<span class='textTakePopUp'>" + $scope.data[i].name  +
                                    "  Anzahl: " +
                                    $scope.data[i].schema.Evening.amount +
                                    "</span>"+
                                  "</div>";
              }
            }
          }

          //Montag Nacht
          if($scope.popUpTimeId == 3){
              if($scope.popUpDayId == 0){
              if($scope.data[i].schema.Night.state == "unchecked" && $scope.data[i].interval[0] == "unchecked"){
                customTemplate += "<div class='toTakePopUp'>" +
                                    "<img class='IMGTakePopUp' src=" + $scope.data[i].img + "></img>" +
                                    "<span class='textTakePopUp'>" + $scope.data[i].name  +
                                    "  Anzahl: " +
                                    $scope.data[i].schema.Night.amount +
                                    "</span>"+
                                  "</div>";
              }
            }
          }

          //Dienstag Nacht
          if($scope.popUpTimeId == 3){
              if($scope.popUpDayId == 1){
              if($scope.data[i].schema.Night.state == "unchecked" && $scope.data[i].interval[1] == "unchecked"){
                customTemplate += "<div class='toTakePopUp'>" +
                                    "<img class='IMGTakePopUp' src=" + $scope.data[i].img + "></img>" +
                                    "<span class='textTakePopUp'>" + $scope.data[i].name  +
                                    "  Anzahl: " +
                                    $scope.data[i].schema.Night.amount +
                                    "</span>"+
                                  "</div>";
              }
            }
          }

          //Mittwoch Nacht
          if($scope.popUpTimeId == 3){
              if($scope.popUpDayId == 2){
              if($scope.data[i].schema.Night.state == "unchecked" && $scope.data[i].interval[2] == "unchecked"){
                customTemplate += "<div class='toTakePopUp'>" +
                                    "<img class='IMGTakePopUp' src=" + $scope.data[i].img + "></img>" +
                                    "<span class='textTakePopUp'>" + $scope.data[i].name  +
                                    "  Anzahl: " +
                                    $scope.data[i].schema.Night.amount +
                                    "</span>"+
                                  "</div>";
              }
            }
          }

          //Donnerstag Nacht
          if($scope.popUpTimeId == 3){
              if($scope.popUpDayId == 3){
              if($scope.data[i].schema.Night.state == "unchecked" && $scope.data[i].interval[3] == "unchecked"){
                customTemplate += "<div class='toTakePopUp'>" +
                                    "<img class='IMGTakePopUp' src=" + $scope.data[i].img + "></img>" +
                                    "<span class='textTakePopUp'>" + $scope.data[i].name  +
                                    "  Anzahl: " +
                                    $scope.data[i].schema.Night.amount +
                                    "</span>"+
                                  "</div>";
              }
            }
          }

          //Freitag Nacht
          if($scope.popUpTimeId == 3){
              if($scope.popUpDayId == 4){
              if($scope.data[i].schema.Night.state == "unchecked" && $scope.data[i].interval[4] == "unchecked"){
                customTemplate += "<div class='toTakePopUp'>" +
                                    "<img class='IMGTakePopUp' src=" + $scope.data[i].img + "></img>" +
                                    "<span class='textTakePopUp'>" + $scope.data[i].name  +
                                    "  Anzahl: " +
                                    $scope.data[i].schema.Night.amount +
                                    "</span>"+
                                  "</div>";
              }
            }
          }

          //Samstag Nacht
          if($scope.popUpTimeId == 3){
              if($scope.popUpDayId == 5){
              if($scope.data[i].schema.Night.state == "unchecked" && $scope.data[i].interval[5] == "unchecked"){
                customTemplate += "<div class='toTakePopUp'>" +
                                    "<img class='IMGTakePopUp' src=" + $scope.data[i].img + "></img>" +
                                    "<span class='textTakePopUp'>" + $scope.data[i].name  +
                                    "  Anzahl: " +
                                    $scope.data[i].schema.Night.amount +
                                    "</span>"+
                                  "</div>";
              }
            }
          }


        //Sonntag Nacht
        if($scope.popUpTimeId == 3){
            if($scope.popUpDayId == 6){
            if($scope.data[i].schema.Night.state == "unchecked" && $scope.data[i].interval[6] == "unchecked"){
              customTemplate += "<div class='toTakePopUp'>" +
                                  "<img class='IMGTakePopUp' src=" + $scope.data[i].img + "></img>" +
                                  "<span class='textTakePopUp'>" + $scope.data[i].name  +
                                  "  Anzahl: " +
                                  $scope.data[i].schema.Night.amount +
                                  "</span>"+
                                "</div>";
            }
          }
        }
      }


          // when a button is set to the CSS class medButtonTake the ionicPopup will be able to show up
           if(target == "medButtonNotTaken"  || target == "medButtonTaken" ){

             $ionicPopup.show({
                              template: customTemplate,
                              title: 'Medikamente',
                              subTitle: 'Bitte tragen Sie die eingenommenen Medikamente ein',
                              scope: $scope,
                              cssClass: 'mediPlanPopUp',
                              buttons: [
                                        { text: 'Cancel' },
                                        {
                                        text: '<b>Fertig</b>',
                                        type: 'button-positive',
                                        onTap: function(e) {
                                          if($scope.state = "taken"){
                                            for(var i = 0; i < $scope.data.length; i++) {
                                              if($scope.popUpTimeId == 0){
                                                    if($scope.popUpDayId == 0){
                                                      if($scope.data[i].schema.Morning.state == "unchecked"){
                                                      event.target.className = "medButtonTaken";
                                                    }
                                                  }
                                                  if($scope.popUpDayId == 1){
                                                    if($scope.data[i].schema.Morning.state == "unchecked"){
                                                     event.target.className = "medButtonTaken";
                                                  }
                                                }
                                                  if($scope.popUpDayId == 2){
                                                    if($scope.data[i].schema.Morning.state == "unchecked"){
                                                      event.target.className = "medButtonTaken";
                                                  }
                                                }
                                                  if($scope.popUpDayId == 3){
                                                    if($scope.data[i].schema.Morning.state == "unchecked"){
                                                      event.target.className = "medButtonTaken";
                                                  }
                                                }
                                                  if($scope.popUpDayId == 4){
                                                    if($scope.data[i].schema.Morning.state == "unchecked"){
                                                      event.target.className = "medButtonTaken";
                                                  }
                                                }
                                                  if($scope.popUpDayId == 5){
                                                    if($scope.data[i].schema.Morning.state == "unchecked"){
                                                      event.target.className = "medButtonTaken";
                                                  }
                                                }
                                                  if($scope.popUpDayId == 6){
                                                    if($scope.data[i].schema.Morning.state == "unchecked"){
                                                     event.target.className = "medButtonTaken";
                                                  }
                                                }
                                              }
                                              if($scope.popUpTimeId == 1){
                                                    if($scope.popUpDayId == 0){
                                                      if($scope.data[i].schema.Noon.state == "unchecked"){
                                                      event.target.className = "medButtonTaken";
                                                    }
                                                  }
                                                  if($scope.popUpDayId == 1){
                                                    if($scope.data[i].schema.Noon.state == "unchecked"){
                                                     event.target.className = "medButtonTaken";
                                                  }
                                                }
                                                  if($scope.popUpDayId == 2){
                                                    if($scope.data[i].schema.Noon.state == "unchecked"){
                                                     event.target.className = "medButtonTaken";
                                                  }
                                                }
                                                  if($scope.popUpDayId == 3){
                                                    if($scope.data[i].schema.Noon.state == "unchecked"){
                                                     event.target.className = "medButtonTaken";
                                                  }
                                                }
                                                  if($scope.popUpDayId == 4){
                                                    if($scope.data[i].schema.Noon.state == "unchecked"){
                                                     event.target.className = "medButtonTaken";
                                                  }
                                                }
                                                  if($scope.popUpDayId == 5){
                                                    if($scope.data[i].schema.Noon.state == "unchecked"){
                                                     event.target.className = "medButtonTaken";
                                                  }
                                                }
                                                  if($scope.popUpDayId == 6){
                                                    if($scope.data[i].schema.Noon.state == "unchecked"){
                                                     event.target.className = "medButtonTaken";
                                                  }
                                                }
                                              }
                                              if($scope.popUpTimeId == 2){
                                                    if($scope.popUpDayId == 0){
                                                      if($scope.data[i].schema.Evening.state == "unchecked"){
                                                      event.target.className = "medButtonTaken";
                                                    }
                                                  }
                                                  if($scope.popUpDayId == 1){
                                                    if($scope.data[i].schema.Evening.state == "unchecked"){
                                                     event.target.className = "medButtonTaken";
                                                  }
                                                }
                                                  if($scope.popUpDayId == 2){
                                                    if($scope.data[i].schema.Evening.state == "unchecked"){
                                                     event.target.className = "medButtonTaken";
                                                  }
                                                }
                                                  if($scope.popUpDayId == 3){
                                                    if($scope.data[i].schema.Evening.state == "unchecked"){
                                                     event.target.className = "medButtonTaken";
                                                  }
                                                }
                                                  if($scope.popUpDayId == 4){
                                                    if($scope.data[i].schema.Evening.state == "unchecked"){
                                                     event.target.className = "medButtonTaken";
                                                  }
                                                }
                                                  if($scope.popUpDayId == 5){
                                                    if($scope.data[i].schema.Evening.state == "unchecked"){
                                                     event.target.className = "medButtonTaken";
                                                  }
                                                }
                                                  if($scope.popUpDayId == 6){
                                                    if($scope.data[i].schema.Evening.state == "unchecked"){
                                                     event.target.className = "medButtonTaken";
                                                  }
                                                }
                                              }
                                              if($scope.popUpTimeId == 3){
                                                    if($scope.popUpDayId == 0){
                                                      if($scope.data[i].schema.Night.state == "unchecked"){
                                                      event.target.className = "medButtonTaken";
                                                    }
                                                  }
                                                  if($scope.popUpDayId == 1){
                                                    if($scope.data[i].schema.Night.state == "unchecked"){
                                                     event.target.className = "medButtonTaken";
                                                  }
                                                }
                                                  if($scope.popUpDayId == 2){
                                                    if($scope.data[i].schema.Night.state == "unchecked"){
                                                     event.target.className = "medButtonTaken";
                                                  }
                                                }
                                                  if($scope.popUpDayId == 3){
                                                    if($scope.data[i].schema.Night.state == "unchecked"){
                                                     event.target.className = "medButtonTaken";
                                                  }
                                                }
                                                  if($scope.popUpDayId == 4){
                                                    if($scope.data[i].schema.Night.state == "unchecked"){
                                                     event.target.className = "medButtonTaken";
                                                  }
                                                }
                                                  if($scope.popUpDayId == 5){
                                                    if($scope.data[i].schema.Night.state == "unchecked"){
                                                     event.target.className = "medButtonTaken";
                                                  }
                                                }
                                                  if($scope.popUpDayId == 6){
                                                    if($scope.data[i].schema.Night.state == "unchecked"){
                                                     event.target.className = "medButtonTaken";
                                                  }
                                                }
                                              }
                                            }

                                          }
                                        }
                                        }
                                        ]
                              });

            }
          };

            $scope.changesState = function(){
              if($scope.state == "unchecked"){
                  $scope.state = "taken"

                }
              else{
                $scope.state =  "unchecked";
                console.log($scope.state);
              }
            }


            $scope.id = 28;

            $scope.checkMode = function(){
              $scope.colorBlindMode = JSON.parse(localStorage.getItem("ColorBLindMode"));

              var css = document.getElementById("original")
                if($scope.colorBlindMode == true){
                  css.setAttribute('href', "css/styleMedPlanColorBlind.css");
                }else if($scope.colorBlindMode == false){
                  css.setAttribute('href', "css/styleMedPlanColorNormal.css");
                }

            }

            //This function will get
            $scope.toTakeClickAction = function (morningElement, noonElement, eveningElement, nightElement, loopNr) {

            $scope.morningElement = morningElement;
            $scope.noonElement = noonElement;
            $scope.eveningElement = eveningElement;
            $scope.nightElement = nightElement;
            $scope.loopNr = loopNr;
            $scope.interavllArr = new Array;
            $scope.dayTimeArr = new Array;
            $scope.daSta =[];
            $scope.medList = JSON.parse(localStorage.getItem("MedicationList"));




              for(var i = 0; i < $scope.medList.medication.length; i++) {
                  var obj = JSON.parse($scope.medList.medication[i]);
                $scope.interavllArr.push(obj.interval)
                $scope.dayTimeArr.push(obj.schema)
                $scope.taken = obj.taken;

                //Get state of every day
                $scope.DayMoState = $scope.interavllArr[i]["0"];
                $scope.DayDiState = $scope.interavllArr[i]["1"];
                $scope.DayMiState = $scope.interavllArr[i]["2"];
                $scope.DayDoState = $scope.interavllArr[i]["3"];
                $scope.DayFrState = $scope.interavllArr[i]["4"];
                $scope.DaySaState = $scope.interavllArr[i]["5"];
                $scope.DaySoState = $scope.interavllArr[i]["6"];

                //Get All Day Status (Evening, Morning, night, noon)
                $scope.Morningstate = new Array;
                $scope.Morningstate.push($scope.dayTimeArr[i].Morning.state);
                $scope.Noonstate = new Array;
                $scope.Noonstate.push($scope.dayTimeArr[i].Noon.state);
                $scope.Eveningstate = new Array;
                $scope.Eveningstate.push($scope.dayTimeArr[i].Evening.state);
                $scope.Nightstate = new Array;
                $scope.Nightstate.push($scope.dayTimeArr[i].Night.state);

                //Get All Day Taken states
                $scope.Morningtaken = new Array;

                $scope.Morningtaken.push($scope.dayTimeArr[i].Morning.taken);
                $scope.Noontaken = new Array;
                $scope.Noontaken.push($scope.dayTimeArr[i].Noon.taken);
                $scope.Eveningtaken = new Array;
                $scope.Eveningtaken.push($scope.dayTimeArr[i].Evening.taken);
                $scope.Nighttaken = new Array;
                $scope.Nighttaken.push($scope.dayTimeArr[i].Night.taken);

                //Sets the PopUp on the MedicationList, there are 28 loops because it happens when the View is build, so it has to repeat each step afert a new elemnt of the ng-repeat is build, which happens 28 times.
                //created by zyssm4
                if($scope.loopNr == 1){//MO
                  if($scope.DayMoState == "unchecked" && $scope.Morningstate == "unchecked" && $scope.Morningtaken["0"] == false){
                    $scope.morningElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                  else if($scope.morningElement["0"].firstElementChild.className != "medButtonNotTaken"){
                    $scope.morningElement["0"].firstElementChild.className = "medButtonTaken";
                  }
                  else{
                    $scope.morningElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                }

                if($scope.loopNr == 2){
                  if($scope.DayMoState == "unchecked" && $scope.Noonstate == "unchecked" && $scope.Noontaken["0"] == false){
                    $scope.noonElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                  else if($scope.noonElement["0"].firstElementChild.className != "medButtonNotTaken"){
                    $scope.noonElement["0"].firstElementChild.className = "medButtonTaken";
                  }
                  else{
                    $scope.noonElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                }

                if($scope.loopNr == 3){
                  if($scope.DayMoState == "unchecked" && $scope.Eveningstate == "unchecked" && $scope.Eveningtaken["0"] == false){
                    $scope.eveningElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                  else if($scope.eveningElement["0"].firstElementChild.className != "medButtonNotTaken"){
                    $scope.eveningElement["0"].firstElementChild.className = "medButtonTaken";
                  }
                  else{
                    $scope.eveningElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                }
                if($scope.loopNr == 4){
                  if($scope.DayMoState == "unchecked" &&  $scope.Nightstate == "unchecked" && $scope.Nighttaken["0"] == false){
                    $scope.nightElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                  else if($scope.nightElement["0"].firstElementChild.className != "medButtonNotTaken"){
                    $scope.nightElement["0"].firstElementChild.className = "medButtonTaken";
                  }
                  else{
                    $scope.nightElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                }

                if($scope.loopNr == 5){ //DI
                  if($scope.DayDiState == "unchecked" && $scope.Morningstate == "unchecked" &&  $scope.Morningtaken["0"] == false){
                    $scope.morningElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                  else if($scope.morningElement["0"].firstElementChild.className != "medButtonNotTaken"){
                    $scope.morningElement["0"].firstElementChild.className = "medButtonTaken";
                  }
                  else{
                    $scope.morningElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                }
                if($scope.loopNr == 6){
                  if($scope.DayDiState == "unchecked" && $scope.Noonstate == "unchecked" && $scope.Noontaken["0"] == false){
                    $scope.noonElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                  else if($scope.noonElement["0"].firstElementChild.className != "medButtonNotTaken"){
                    $scope.noonElement["0"].firstElementChild.className = "medButtonTaken";
                  }
                  else{
                    $scope.noonElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                }
                if($scope.loopNr == 7){
                  if($scope.DayDiState == "unchecked" && $scope.Eveningstate == "unchecked" && $scope.Eveningtaken["0"] == false){
                    $scope.eveningElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                  else if($scope.eveningElement["0"].firstElementChild.className != "medButtonNotTaken"){
                    $scope.eveningElement["0"].firstElementChild.className = "medButtonTaken";
                  }
                  else{
                    $scope.eveningElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                }
                if($scope.loopNr == 8){
                  if($scope.DayDiState == "unchecked" && $scope.Nightstate == "unchecked" && $scope.Nighttaken["0"] == false){
                    $scope.nightElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                  else if($scope.nightElement["0"].firstElementChild.className != "medButtonNotTaken"){
                    $scope.nightElement["0"].firstElementChild.className = "medButtonTaken";
                  }
                  else{
                    $scope.nightElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                }

                if($scope.loopNr == 9){//MI
                  if($scope.DayMiState == "unchecked" && $scope.Morningstate == "unchecked" && $scope.Morningtaken["0"] == false){
                    $scope.morningElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                  else if($scope.morningElement["0"].firstElementChild.className != "medButtonNotTaken"){
                    $scope.morningElement["0"].firstElementChild.className = "medButtonTaken";
                  }
                  else{
                    $scope.morningElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                }
                if($scope.loopNr == 10){
                  if($scope.DayMiState == "unchecked" && $scope.Noonstate == "unchecked" && $scope.Noontaken["0"] == false){
                    $scope.noonElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                  else if($scope.noonElement["0"].firstElementChild.className != "medButtonNotTaken"){
                    $scope.noonElement["0"].firstElementChild.className = "medButtonTaken";
                  }
                  else{
                    $scope.noonElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                }
                if($scope.loopNr == 11){
                  if($scope.DayMiState == "unchecked" && $scope.Eveningstate == "unchecked" && $scope.Eveningtaken["0"] == false){
                    $scope.eveningElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                  else if($scope.eveningElement["0"].firstElementChild.className != "medButtonNotTaken"){
                    $scope.eveningElement["0"].firstElementChild.className = "medButtonTaken";
                  }
                  else{
                    $scope.eveningElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                }
                if($scope.loopNr == 12){
                  if($scope.DayMiState == "unchecked" && $scope.Nightstate == "unchecked" && $scope.Nighttaken["0"] == false){
                    $scope.nightElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                  else if($scope.nightElement["0"].firstElementChild.className != "medButtonNotTaken"){
                    $scope.nightElement["0"].firstElementChild.className = "medButtonTaken";
                  }
                  else{
                    $scope.nightElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                }

                if($scope.loopNr == 13){//DO
                  if($scope.DayDoState == "unchecked" && $scope.Morningstate == "unchecked" && $scope.Morningtaken["0"] == false){
                    $scope.morningElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                  else if($scope.morningElement["0"].firstElementChild.className != "medButtonNotTaken"){
                    $scope.morningElement["0"].firstElementChild.className = "medButtonTaken";
                  }
                  else{
                    $scope.morningElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                }
                if($scope.loopNr == 14){
                  if($scope.DayDoState == "unchecked" && $scope.Noonstate == "unchecked" &&  $scope.Noontaken["0"] == false){
                    $scope.noonElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                  else if($scope.noonElement["0"].firstElementChild.className != "medButtonNotTaken"){
                    $scope.noonElement["0"].firstElementChild.className = "medButtonTaken";
                  }
                  else{
                    $scope.noonElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                }
                if($scope.loopNr == 15){
                  if($scope.DayDoState == "unchecked" && $scope.Eveningstate == "unchecked" && $scope.Eveningtaken["0"] == false){
                    $scope.eveningElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                  else if($scope.eveningElement["0"].firstElementChild.className != "medButtonNotTaken"){
                    $scope.eveningElement["0"].firstElementChild.className = "medButtonTaken";
                  }
                  else{
                    $scope.eveningElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                }
                if($scope.loopNr == 16){
                  if($scope.DayDoState == "unchecked" && $scope.Nightstate == "unchecked" && $scope.Nighttaken["0"] == false){
                    $scope.nightElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                  else if($scope.nightElement["0"].firstElementChild.className != "medButtonNotTaken"){
                    $scope.nightElement["0"].firstElementChild.className = "medButtonTaken";
                  }
                  else{
                    $scope.nightElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                }

                if($scope.loopNr == 17){//FR
                  if($scope.DayFrState == "unchecked" && $scope.Morningstate == "unchecked" && $scope.Morningtaken["0"] == false){
                    $scope.morningElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                  else if($scope.morningElement["0"].firstElementChild.className != "medButtonNotTaken"){
                    $scope.morningElement["0"].firstElementChild.className = "medButtonTaken";
                  }
                  else{
                    $scope.morningElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                }
                if($scope.loopNr == 18){
                  if($scope.DayFrState == "unchecked" && $scope.Noonstate == "unchecked" && $scope.Noontaken["0"] == false){
                    $scope.noonElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                  else if($scope.noonElement["0"].firstElementChild.className != "medButtonNotTaken"){
                    $scope.noonElement["0"].firstElementChild.className = "medButtonTaken";
                  }
                  else{
                    $scope.noonElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                }
                if($scope.loopNr == 19){
                  if($scope.DayFrState == "unchecked" && $scope.Eveningstate == "unchecked" && $scope.Eveningtaken["0"] == false){
                    $scope.eveningElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                  else if($scope.eveningElement["0"].firstElementChild.className != "medButtonNotTaken"){
                    $scope.eveningElement["0"].firstElementChild.className = "medButtonTaken";
                  }
                  else{
                    $scope.eveningElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                }
                if($scope.loopNr == 20){
                  if($scope.DayFrState == "unchecked" && $scope.Nightstate == "unchecked" && $scope.Nighttaken["0"] == false){
                    $scope.nightElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                  else if($scope.nightElement["0"].firstElementChild.className != "medButtonNotTaken"){
                    $scope.nightElement["0"].firstElementChild.className = "medButtonTaken";
                  }
                  else{
                    $scope.nightElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                }

                if($scope.loopNr == 21){//SA
                  if($scope.DaySaState == "unchecked" && $scope.Morningstate == "unchecked" && $scope.Morningtaken["0"] == false){
                    $scope.morningElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                  else if($scope.morningElement["0"].firstElementChild.className != "medButtonNotTaken"){
                    $scope.morningElement["0"].firstElementChild.className = "medButtonTaken";
                  }
                  else{
                    $scope.morningElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                }
                if($scope.loopNr == 22){
                  if($scope.DaySaState == "unchecked" && $scope.Noonstate == "unchecked" && $scope.Noontaken["0"] == false){
                    $scope.noonElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                  else if($scope.noonElement["0"].firstElementChild.className != "medButtonNotTaken"){
                    $scope.noonElement["0"].firstElementChild.className = "medButtonTaken";
                  }
                  else{
                    $scope.noonElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                }
                if($scope.loopNr == 23){
                  if($scope.DaySaState == "unchecked" && $scope.Eveningstate == "unchecked" && $scope.Eveningtaken["0"] == false){
                    $scope.eveningElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                  else if($scope.eveningElement["0"].firstElementChild.className != "medButtonNotTaken"){
                    $scope.eveningElement["0"].firstElementChild.className = "medButtonTaken";
                  }
                  else{
                    $scope.eveningElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                }
                if($scope.loopNr == 24){
                  if($scope.DaySaState == "unchecked" && $scope.Nightstate == "unchecked" && $scope.Nighttaken["0"] == false){
                    $scope.nightElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                  else if($scope.nightElement["0"].firstElementChild.className != "medButtonNotTaken"){
                    $scope.nightElement["0"].firstElementChild.className = "medButtonTaken";
                  }
                  else{
                    $scope.nightElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                }

                if($scope.loopNr == 25){//SO
                  if($scope.DaySoState == "unchecked" && $scope.Morningstate == "unchecked" && $scope.Morningtaken["0"] == false){
                    $scope.morningElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                  else if($scope.morningElement["0"].firstElementChild.className != "medButtonNotTaken"){
                    $scope.morningElement["0"].firstElementChild.className = "medButtonTaken";
                  }
                  else{
                    $scope.morningElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                }
                if($scope.loopNr == 26){
                  if($scope.DaySoState == "unchecked" && $scope.Noonstate == "unchecked" && $scope.Noontaken["0"] == false){
                    $scope.noonElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                  else if($scope.noonElement["0"].firstElementChild.className != "medButtonNotTaken"){
                    $scope.noonElement["0"].firstElementChild.className = "medButtonTaken";
                  }
                  else{
                    $scope.noonElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                }
                if($scope.loopNr == 27){
                  if($scope.DaySoState == "unchecked" && $scope.Eveningstate == "unchecked" && $scope.Eveningtaken["0"] == false){
                    $scope.eveningElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                  else if($scope.eveningElement["0"].firstElementChild.className != "medButtonNotTaken"){
                    $scope.eveningElement["0"].firstElementChild.className = "medButtonTaken";
                  }
                  else{
                    $scope.eveningElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                }
                if($scope.loopNr == 28){
                  if($scope.DaySoState == "unchecked" && $scope.Nightstate == "unchecked" && $scope.Nighttaken["0"] == false){
                    $scope.nightElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                  else if($scope.nightElement["0"].firstElementChild.className != "medButtonNotTaken"){
                    $scope.nightElement["0"].firstElementChild.className = "medButtonTaken";
                  }
                  else{
                    $scope.nightElement["0"].firstElementChild.className = "medButtonNotTaken";
                  }
                }
              }



            for(var i = 0; i < $scope.medList.medication.length; i++) {
                var obj = JSON.parse($scope.medList.medication[i]);
                  if ($scope.nightElement == "1"){

                  }
                  if (obj.interval == "default")
                  {
                    if(dayTime == 0 &&
                       obj.schema.Morning.state !== "default") {
                         $scope.data.push(obj);
                    }
                    if(dayTime == 1 &&
                       obj.schema.Noon.state !== "default") {
                         $scope.data.push(obj);
                    }
                    if(dayTime == 2 &&
                       obj.schema.Evening.state !== "default") {
                         $scope.data.push(obj);
                    }
                    if(dayTime == 3 &&
                       obj.schema.Night.state !== "default") {
                         $scope.data.push(obj);
                    }
                  }




              $scope.data =[];

          }
        }



            $scope.opentel = function () {
              $state.go('tel');
            }
            $scope.openhome = function () {
              $state.go('menu.home');
            }

            $scope.opencreateMedi = function () {
              $state.go('createMedi');
            }

            var isLoggedIn = ownMidataService.loggedIn();
              if (isLoggedIn) {
                $scope.logout = function() {
                  window.localStorage.setItem("password", '');
                  ownMidataService.logout();
                  $state.go('login');
                };
              } else {
                $state.go('login')
              }
            })

.controller('createMediCtrl', function($scope, $compile ,ownMidataService, $timeout, $state, $ionicPopup, $cordovaCamera, $window) {

            $scope.MedTempelate =
            "<div class='row MediTemplate StyleMedi' ng-repeat='mediObj in showMedList'>"+
              "<div class='Block MediNameSize'>{{mediObj.medicament.name}}</div>"+
              "<div class='row'>"+
                "<img class=' MediImg ' ng-src='{{mediObj.medicament.img}}'></img>"+
                "<div class='col'>"+
                  "<div class='row'>"+
                    "<div class='{{timeSchema.class}}' ng-repeat='timeSchema in timeSchema' id='{{ 'timeSchema'+$index}}'>{{timeSchema.title}}</div>"+
                  "</div>"+
                  "<div class='row'>"+
                    "<div class='{{buttonSchema.class}}' ng-repeat='buttonSchema in mediObj.dayTimes' ng-click='changeStatus()' id='{{ 'buttonSchema'+$index}}' ></div>"+
                  "</div>"+
                  "<div class='row'>"+
                    "<div class='{{amountSchema.class}}' ng-repeat='amountSchema in mediObj.amount'  id='{{ 'amountSchema'+$index}}'>{{amountSchema.title}}</div>"+
                  "</div>"+
                "</div>"+

                "<div class='col'>"+
                  "<div class='row'>"+
                    "<div class='{{lableIntervall.class}}' ng-repeat='lableIntervall in lableIntervall' id='{{ 'lableIntervall'+$index}}'>{{lableIntervall.title}}</div>"+
                  "</div>"+
                  "<div class='row'>"+
                    "<div class='{{buttonIntervall.class}} imgMediList' ng-repeat='buttonIntervall in mediObj.interval' ng-click='changeStatus()' id='{{ 'buttonIntervall'+$index}}'>{{buttonIntervall.title}}</div>"+
                  "</div>"+
                "</div>"+

                "<div class='col'>"+
                  "<div class='row'>"+
                    "<div class='{{startDatumMedi.class}} datumSpacerText'>Startdatum:<pre></pre> </div>"+
                    "<div class='{{startDatumMedi.class}}'  id='{{ 'startDatumMedi'+$index}}'>{{mediObj.medicament.startDate}}</div>"+
                  "</div>"+
                  "<div class='row'>"+
                    "<div class='{{endDatumMedi.class}} datumSpacerText'>Enddatum:  </div>"+
                    "<div class='{{endDatumMedi.class}}' id='{{ 'endDatumMedi'+$index}}'>{{mediObj.medicament.endDate}}</div>"+
                  "</div>"+
                "</div>"+
                "<img class='ThrashImg' id='{{mediObj.medicament.id}}' data-indetifier='{{$index}}' ng-click='deleteMedi($event)'></img>"+
              "</div>"+
            "</div>";




            $scope.timeSchema = [{title: "Morgen" , class:' labelSchemaSpacer'},
                                 {title: "Mittag" , class:' labelSchemaSpacer'},
                                 {title: "Abend" , class:' labelSchemaSpacer '},
                                 {title: "Nacht" , class:' labelSchemaSpacer '}]

            $scope.lableIntervall = [{title:"Mo", class:' labelIntervallSpacer'},
                                     {title:"Di", class:' labelIntervallSpacer fixer1'},
                                     {title:"Mi", class:' labelIntervallSpacer fixer1'},
                                     {title:"Do", class:' labelIntervallSpacer fixer1'},
                                     {title:"Fr", class:' labelIntervallSpacer fixer1'},
                                     {title:"Sa", class:' labelIntervallSpacer fixer1'},
                                     {title:"So", class:' labelIntervallSpacer fixer1'}]

            $scope.startDatumMedi = {title: "startDatumMedi", class:' datumSpacer'}

            $scope.endDatumMedi = {title: "endDatumMedi", class:' datumSpacer'}


          $scope.deleteMedi = function(event){
            $scope.data = JSON.parse(localStorage.getItem("MedicationList"));
            var targetID = event.target.id;
            var elementToDelete = event.target.dataset.indetifier;
                $scope.data.medication.splice(elementToDelete, 1); //The chosen element gets deleted out of the array
                localStorage.setItem("MedicationList", JSON.stringify($scope.data));

            $window.location.reload();

          }


          $scope.showMedList = new Array();

          $scope.medList = {
              medication: []
            }

          //This Function gets the localstorage and shows the medicaments in the given template
          $scope.loadMediList = function(divName) {
            var data = JSON.parse(localStorage.getItem("MedicationList"));
            if(data != null){
              for (var i = 0; i < data.medication.length; i++) {
                $scope.medList.medication.push(data.medication[i]);
              }
            }



            //if there is atleast one medicament it will be filled into the template
            if(data !== null){
              for(var i = 0; i < data.medication.length; i++) {
                var newElement = document.createElement('div');
                 var mediObj = JSON.parse(data.medication[i]);
                 var buttonSchema = [{title: "../img/Xnormal.png" , class:' MedibuttonStatusIMGdefault buttonSchemaSpacer fixer1'},
                                        {title: "../img/Xnormal.png" , class:' MedibuttonStatusIMGdefault buttonSchemaSpacer fixer2'},
                                        {title: "../img/Xnormal.png" , class:' MedibuttonStatusIMGdefault buttonSchemaSpacer fixer3'},
                                        {title: "../img/Xnormal.png" , class:' MedibuttonStatusIMGdefault buttonSchemaSpacer fixer4'}];

                 var amountSchema = [{title: " " , class:' buttonSchemaSpacer fixer1'},
                                        {title: " " , class:' buttonSchemaSpacer fixer2'},
                                        {title: " " , class:' buttonSchemaSpacer fixer3'},
                                        {title: " " , class:' buttonSchemaSpacer fixer4'}];

                var buttonIntervall = [{title:"Mo", class:' MedibuttonStatusIMGdefault buttonIntervallSpacer '},
                                          {title:"Di", class:' MedibuttonStatusIMGdefault buttonIntervallSpacer fixer1 '},
                                          {title:"Mi", class:' MedibuttonStatusIMGdefault buttonIntervallSpacer fixer1'},
                                          {title:"Do", class:' MedibuttonStatusIMGdefault buttonIntervallSpacer fixer1'},
                                          {title:"Fr", class:' MedibuttonStatusIMGdefault buttonIntervallSpacer fixer1'},
                                          {title:"Sa", class:' MedibuttonStatusIMGdefault buttonIntervallSpacer fixer1'},
                                          {title:"So", class:' MedibuttonStatusIMGdefault buttonIntervallSpacer fixer1'}];


                $scope.startDatumMedi.title = mediObj.startDate;
                $scope.endDatumMedi.title = mediObj.endDate;


                if(mediObj.schema.Morning.state == "unchecked"){
                  buttonSchema[0].class = " MedibuttonStatusIMGunchecked buttonSchemaSpacer fixer1";
                  amountSchema[0].title = mediObj.schema.Morning.amount;
                }
                if(mediObj.schema.Noon.state == "unchecked"){
                  buttonSchema[1].class = " MedibuttonStatusIMGunchecked buttonSchemaSpacer fixer2";
                  amountSchema[1].title = mediObj.schema.Noon.amount;
                }
                if(mediObj.schema.Evening.state == "unchecked"){
                  buttonSchema[2].class = " MedibuttonStatusIMGunchecked buttonSchemaSpacer fixer3";
                  amountSchema[2].title = mediObj.schema.Evening.amount;
                }
                if(mediObj.schema.Night.state == "unchecked"){
                  buttonSchema[3].class = " MedibuttonStatusIMGunchecked buttonSchemaSpacer fixer4";
                  amountSchema[3].title = mediObj.schema.Night.amount;
                }
                if(mediObj.interval[0] == "unchecked"){
                  buttonIntervall[0].class = " MedibuttonStatusIMGunchecked buttonIntervallSpacer";
                }
                if(mediObj.interval[1] == "unchecked"){
                  buttonIntervall[1].class = " MedibuttonStatusIMGunchecked buttonIntervallSpacer fixer1";
                }
                if(mediObj.interval[2] == "unchecked"){
                  buttonIntervall[2].class = " MedibuttonStatusIMGunchecked buttonIntervallSpacer fixer1";
                }
                if(mediObj.interval[3] == "unchecked"){
                  buttonIntervall[3].class = " MedibuttonStatusIMGunchecked buttonIntervallSpacer fixer1";
                }
                if(mediObj.interval[4] == "unchecked"){
                  buttonIntervall[4].class = " MedibuttonStatusIMGunchecked buttonIntervallSpacer fixer1";
                }
                if(mediObj.interval[5] == "unchecked"){
                  buttonIntervall[5].class = " MedibuttonStatusIMGunchecked buttonIntervallSpacer fixer1";
                }
                if(mediObj.interval[6] == "unchecked"){
                  buttonIntervall[6].class = " MedibuttonStatusIMGunchecked buttonIntervallSpacer fixer1";
                }

                var itemToShow = {
                  medicament: mediObj,
                  dayTimes: buttonSchema,
                  amount: amountSchema,
                  interval: buttonIntervall
                }

                $scope.showMedList.push(itemToShow);

              }
              newElement.innerHTML = $scope.MedTempelate;
              $compile(document.getElementById(divName).appendChild(newElement))($scope);
            }

            if(localStorage.getItem("MedicattionID") ==  null){
            localStorage.setItem("MedicattionID", 0);
            }


          };

            $scope.CheckboxStatchange = function(event){
                 var targetID = event.target.id;
                 var img1 = "img/Xnormal.png";
                 var targetElement = "amount" + targetID;
                 var targetAnzahl = "anzahl" + targetID;

                 if(document.getElementById(targetID).getAttribute("data-id") == "default"){
                  document.getElementById(targetID).src = "img/checked-checkbox-512.png";
                  document.getElementById(targetID).setAttribute("data-id", "unchecked")
                  if(targetID == "DayTimeMoring" || targetID == "DayTimeNoon" || targetID == "DayTimeEvening" || targetID == "DayTimeNight"){
                  document.getElementById(targetElement).style.visibility = "visible" ;
                  document.getElementById(targetAnzahl).style.visibility = "visible" ;
                }
                }else{
                  document.getElementById(targetID).src = "img/Xnormal.png";
                  document.getElementById(targetID).setAttribute("data-id", "default")
                  if(targetID == "DayTimeMoring" || targetID == "DayTimeNoon" || targetID == "DayTimeEvening" || targetID == "DayTimeNight"){
                  document.getElementById(targetElement).style.visibility = "hidden" ;
                  document.getElementById(targetAnzahl).style.visibility = "hidden" ;
                }
                }
            }


            $scope.addMedicament = function(){


              //Hardcoded PopUp template
            var customTemplate =
            '<div>'+
            //Header
            '<div class="row MediPopUpStyle" id="medi"/>'+
              '<div class="row">'+
                //Name
                '<div class="col PopUpLabel">'+
                  '<label class="font">Name</label>'+
                  '<input type="text" id="MediName">'+
                '</div>'+
                //Camera
                '<div class="col PopUpLabel">'+
                '<img class="CreateMediButton" ng-show="imgURI !== undefined" ng-src="{{imgURI}}" ng-click="takePicture()">' +
                '<img class="CreateMediButton" ng-show="imgURI === undefined" ng-src="img/camera.png" ng-click="takePicture()" id="PictureMedi">' +
                '</div>'+
              '</div>'+
            '</div>'+

            //Labelrow
            '<div class="row MediPopUpStyle">'+
              '<div class="row " id="top">'+
                '<div class="col PopUpLabel">'+
                  '<label class="font">Einnahmezeit</label>'+
                '</div>'+
                '<div class="col PopUpLabel">'+
                  '<label class="font">Intervall</label>'+
                '</div>'+
              '</div>'+
            '</div>'+

              //DayTime
              '<div class="row DayTimeRow">'+
              //moring
                '<div class="col gg">'+
                  '<div class="row">'+
                    '<label class="Spacer">Morgen</label>'+
                    '<label class="AnzahlSpacer" id="anzahlDayTimeMoring">Anzahl</label>'+
                  '</div>'+
                  '<div class="row">'+
                    '<img class="ImgDayPopUp Spacer" src="img/Xnormal.png" ng-click="CheckboxStatchange($event)"  data-id="default" id="DayTimeMoring">'+
                    '<input type="number" class="amountDayTime" id="amountDayTimeMoring"></input>'+
                  '</div>'+
                '</div>'+
              //Noon
                '<div class="col gg">'+
                  '<div class="row">'+
                    '<label class="Spacer">Mittag</label>'+
                    '<label class="AnzahlSpacer fixer1" id="anzahlDayTimeNoon">Anzahl</label>'+
                  '</div>'+
                  '<div class="row">'+
                    '<img class="ImgDayPopUp Spacer" src="img/Xnormal.png" ng-click="CheckboxStatchange($event)"  data-id="default" id="DayTimeNoon">'+
                    '<input type="number" class="amountDayTime" id="amountDayTimeNoon"></input>'+
                  '</div>'+
                '</div>'+
              //Evening
                '<div class="col gg">'+
                  '<div class="row">'+
                    '<label class="Spacer">Abend</label>'+
                    '<label class="AnzahlSpacer fixer1" id="anzahlDayTimeEvening">Anzahl</label>'+
                  '</div>'+
                  '<div class="row">'+
                    '<img class="ImgDayPopUp Spacer" src="img/Xnormal.png" ng-click="CheckboxStatchange($event)"  data-id="default" id="DayTimeEvening">'+
                    '<input type="number" class="amountDayTime" id="amountDayTimeEvening"></input>'+
                  '</div>'+
                '</div>'+
              //Noon
                '<div class="col gg">'+
                  '<div class="row">'+
                    '<label class="Spacer">Nacht</label>'+
                    '<label class="AnzahlSpacer fixer2" id="anzahlDayTimeNight">Anzahl</label>'+
                  '</div>'+
                  '<div class="row">'+
                    '<img class="ImgDayPopUp Spacer" src="img/Xnormal.png" ng-click="CheckboxStatchange($event)" data-id="default" id="DayTimeNight">'+
                    '<input type="number" class="amountDayTime" id="amountDayTimeNight"></input>'+
                  '</div>'+
                '</div>'+
              '</div>'+//DayTime div
              //Day
              '<div class="row DayTimeRow">'+
              //Montag
                '<div class="col gg">'+
                  '<div class="row">'+
                    '<label class="BigSpacer">Mo.</label>'+
                  '</div>'+
                  '<div class="row">'+
                    '<img class="ImgDayPopUp Spacer" src="img/Xnormal.png" ng-click="CheckboxStatchange($event)" data-id="default" id="DayMo">'+
                  '</div>'+
                '</div>'+
              //Montag
                '<div class="col gg">'+
                  '<div class="row">'+
                    '<label class="Spacer">Di.</label>'+
                  '</div>'+
                  '<div class="row">'+
                    '<img class="ImgDayPopUp Spacer" src="img/Xnormal.png" ng-click="CheckboxStatchange($event)" data-id="default" id="DayDi" >'+
                  '</div>'+
                '</div>'+
              //Mittwoch
                '<div class="col gg">'+
                  '<div class="row">'+
                    '<label class="Spacer">Mi.</label>'+
                  '</div>'+
                  '<div class="row">'+
                    '<img class="ImgDayPopUp Spacer" src="img/Xnormal.png" ng-click="CheckboxStatchange($event)" data-id="default" id="DayMi">'+
                  '</div>'+
                '</div>'+
              //Donnerstag
                '<div class="col gg">'+
                  '<div class="row">'+
                    '<label class="Spacer">Do.</label>'+
                  '</div>'+
                  '<div class="row">'+
                    '<img class="ImgDayPopUp Spacer" src="img/Xnormal.png" ng-click="CheckboxStatchange($event)" data-id="default" id="DayDo">'+
                  '</div>'+
                '</div>'+
              //Freitag
                '<div class="col gg">'+
                  '<div class="row">'+
                    '<label class="Spacer">Fr.</label>'+
                  '</div>'+
                  '<div class="row">'+
                    '<img class="ImgDayPopUp Spacer" src="img/Xnormal.png" ng-click="CheckboxStatchange($event)" data-id="default" id="DayFr">'+
                  '</div>'+
                '</div>'+
              //Samstag
                '<div class="col gg">'+
                  '<div class="row">'+
                    '<label class="Spacer">Sa.</label>'+
                  '</div>'+
                  '<div class="row">'+
                    '<img class="ImgDayPopUp Spacer" src="img/Xnormal.png" ng-click="CheckboxStatchange($event)" data-id="default" id="DaySa">'+
                  '</div>'+
                '</div>'+
              //Sonntag
                '<div class="col gg">'+
                  '<div class="row">'+
                    '<label class="Spacer ">So.</label>'+
                  '</div>'+
                  '<div class="row">'+
                    '<img class="ImgDayPopUp Spacer" src="img/Xnormal.png" ng-click="CheckboxStatchange($event)" data-id="default" id="DaySo">'+
                '</div>'+ //Sonntag div
              '</div>'+ //Day div
              '</div>'+

            '<div class="row">'+
              '<div class="col">'+
                '<div class="row MediPopUpStyle">'+
                  '<label>Startdatum</label>'+
                  '<input type="date" id="MediStartDate">'+
                '</div>'+
                '<div class="row MediPopUpStyle">'+
                  '<label>Enddatum</label>'+
                  '<input type="date" id="MediEndDate">'+
                '</div>'+
              '</div>'+
            '</div>'+
          '</div>'

            $ionicPopup.show({
                             template: customTemplate,
                             title: 'Medikament erfassen',
                             subTitle: 'Bitte geben Sie die Daten des neuen Mediamentes ein',
                             scope: $scope,
                             cssClass: 'createMediPopUp',
                             buttons: [
                                       { text: 'Zurück' },
                                       {
                                         text: '<b>Speichern</b>',
                                         type: 'button-positive',

                                         //The Inputdate will be set to various variables, so they can be saved into the localStorage with the saveMedi() function
                                         onTap: function(e) {
                                           var MediName = document.getElementById("MediName").value;
                                           var DayTimeMoring = document.getElementById("DayTimeMoring").getAttribute("data-id");
                                           var DayTimeNoon = document.getElementById("DayTimeNoon").getAttribute("data-id");
                                           var DayTimeEvening = document.getElementById("DayTimeEvening").getAttribute("data-id");
                                           var DayTimeNight = document.getElementById("DayTimeNight").getAttribute("data-id");
                                           var amountDayTimeMoring = document.getElementById("amountDayTimeMoring").value;
                                           var amountDayTimeNoon = document.getElementById("amountDayTimeNoon").value;
                                           var amountDayTimeEvening = document.getElementById("amountDayTimeEvening").value;
                                           var amountDayTimeNight = document.getElementById("amountDayTimeNight").value;
                                           var DayMo = document.getElementById("DayMo").getAttribute("data-id");
                                           var DayDi = document.getElementById("DayDi").getAttribute("data-id");
                                           var DayMi = document.getElementById("DayMi").getAttribute("data-id");
                                           var DayDo = document.getElementById("DayDo").getAttribute("data-id");
                                           var DayFr = document.getElementById("DayFr").getAttribute("data-id");
                                           var DaySa = document.getElementById("DaySa").getAttribute("data-id");
                                           var DaySo = document.getElementById("DaySo").getAttribute("data-id");
                                           var MediStartDate = document.getElementById("MediStartDate").value;
                                           var MediEndDate = document.getElementById("MediEndDate").value;
                                           var Picture = $scope.imgURI;
                                           $scope.saveMedi(MediName , DayTimeMoring, DayTimeNoon, DayTimeEvening, DayTimeNight,
                                             amountDayTimeMoring, amountDayTimeNoon, amountDayTimeEvening, amountDayTimeNight,
                                            DayMo,  DayDi,  DayMi,  DayDo,  DayFr, DaySa,  DaySo,  MediStartDate,  MediEndDate, Picture);


                                         }
                                       }
                                         ]
                               });


              };

              $scope.saveMedi = function ( MediName,
                DayTimeMoring, DayTimeNoon, DayTimeEvening, DayTimeNight,
                amountDayTimeMoring, amountDayTimeNoon, amountDayTimeEvening, amountDayTimeNight,
                DayMo, DayDi, DayMi, DayDo, DayFr, DaySa, DaySo, MediStartDate, MediEndDate, Picture
              ) {


                  $scope.data = JSON.parse(localStorage.getItem("MedicationList"));
                  $scope.id = parseInt(localStorage.getItem("MedicattionID"));
                  if($scope.data != null){

                      $scope.id = $scope.id + 1;

                      localStorage.setItem("MedicattionID", $scope.id);

                  }else if ($scope.data == null && $scope.id != 0) {
                    $scope.id = 0;
                    localStorage.setItem("MedicattionID", $scope.id);
                  }

                  //This Json wil function as an vessel which holds al the relevant data about an medicament
                  var medicament = {
                    id: $scope.id,
                    name: MediName,
                    schema: {
                      Morning: {
                        amount: amountDayTimeMoring,
                        state: DayTimeMoring,
                        taken: false
                      },
                      Noon: {
                        amount: amountDayTimeNoon,
                        state: DayTimeNoon,
                        taken: false
                      },
                      Evening: {
                        amount: amountDayTimeEvening,
                        state: DayTimeEvening,
                        taken: false
                      },
                      Night: {
                        amount: amountDayTimeNight,
                        state: DayTimeNight,
                        taken: false
                      }
                    },
                    interval: [DayMo, DayDi, DayMi, DayDo, DayFr, DaySa, DaySo],
                    startDate: MediStartDate,
                    endDate: MediEndDate,
                    img: Picture
                    }


                $scope.medList.medication.push(JSON.stringify(medicament));
                localStorage.setItem("MedicationList", JSON.stringify($scope.medList));
                $window.location.reload();
              }

        //Start the Camera, Take a Photo, Show the Picture
        $scope.takePicture = function() {
                var options = {
                    quality : 75,
                    destinationType : Camera.DestinationType.DATA_URL,
                    sourceType : Camera.PictureSourceType.CAMERA,
                    allowEdit : true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 250,
                    targetHeight: 250,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };

        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
        });
    };







            $scope.openmedi = function () {
              $state.go('medplan');
              }

            var isLoggedIn = ownMidataService.loggedIn();
            if (isLoggedIn) {
                $scope.logout = function() {
                window.localStorage.setItem("password", '');
                ownMidataService.logout();
                $state.go('login'); };
            } else {
                $state.go('login')
              }

            });
