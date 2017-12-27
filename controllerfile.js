/**
 * Created by HISP-WS19 on 16-12-2016.
 */

var app = angular.module('testapp', ['jsonFormatter', 'd2HeaderBar']);
app.controller('testcontroller', function ($scope, $http, $timeout, $window) {

  var getUrl = $window.location.href;
  var urlPart = getUrl.split('=');
  var urlUid = urlPart[1];


  $scope.showHide = function (value) {
    if (document.getElementById(value).style.display == "block") {
      document.getElementById(value).style.display == "none";
    }
    else {
      document.getElementById(value).style.display == "block"
    }
  };
  $(".checkboxx").change(function () {
    alert("Handler for .change() called.");
  });

  $scope.getSchemas = function (input, x) {

    if (x == 1) {
      $http.get("../../schemas.json?paging=false")
        .then(function (data1) {
          var data = data1.data;
          if (x == 1) {
            $scope.callSchemaEndPoint(0, data, input);
          } else {
            $scope.callSchemaEndPoint2(0, data, input);
          }


        });

    } else {
      $http.get("../../resources.json?paging=false")
        .then(function (data1) {
          var data = data1.data;
          if (x == 1) {
            $scope.callSchemaEndPoint(0, data, input);
          } else {
            $scope.callSchemaEndPoint2(0, data, input);
          }

        });

    }

  }
  // initial check for URL if uid is passsed as argument or not !

  if (urlPart.length == 1) { } else if (urlUid == "") {
    alert("Enter Uid");
  } else {
    // validating length of UID
    if (urlUid.length == 11) {
      $scope.uid = urlUid;
      document.getElementById("overlay").style.display = "block";
      document.getElementById("loader").style.display = "block";
      document.getElementById("loading").style.display = "block";
      $scope.getSchemas($scope.uid);
    } else {
      alert("Uid must be of 11 characters.");
    }
  }

  $scope.callSchemaEndPoint = function (i, dataSchemas, uid, uidFound) {

    //terminating recursion (if uid not found in whole json)
    if (i >= dataSchemas.schemas.length) {
      document.getElementById("loader").style.display = "none";
      document.getElementById("loading").style.display = "none";
      document.getElementById("loading").innerHTML = "";
      //    document.getElementById("data").style.display = "none";
      document.getElementById("overlay").style.display = "none";
      document.getElementById("Type").style.display = "none";
      //window.alert("Uid is not valid !");
      //window.location.replace("../../../api/apps/Angular-test/index.html");
      return;
    }
    var j = i - 1;
    //terminating recursion (if uid is found)
    if (uidFound) {
      document.getElementById("loader").style.display = "none";
      document.getElementById("loading").style.display = "none";
      document.getElementById("loading").innerHTML = "";
      //document.getElementById("data").style.display = "n";
      document.getElementById("overlay").style.display = "none";
      document.getElementById("Type").style.display = "none";
      //  document.getElementById("Type").innerHTML = "<b>UID Type : " + dataSchemas.schemas[j].displayName + "</b>";
      return;
    }

    var endPointName = dataSchemas.schemas[i].collectionName;

    // printing current searching domain

    document.getElementById("loading").innerHTML = "<p id='loadtext'> Searching in : " + endPointName + "</p>";

    $.getJSON("../../" + endPointName + "/" + uid + ".json?fields=*&paging=false", function (response) {

      if (response !== undefined) {
        console.log(response);

        //    $scope.namess = response;
        document.getElementById("Type").style.display = "block";
        var elm = '<tr style="font:15px;background-color:#f5f5f5"><td colspan="4"><b>UID Type : ' + dataSchemas.schemas[i].displayName + '</b></td></tr>';
        //    $('.reporttable').append(elmm);
        elm = elm + '<tr style="background-color:#dfe9f4"><th>Uid</th><th>Name</th><th>Code</th><th>Short Name</th></tr>';
        //	$('.reporttable').append(elmmm);
        //    $timeout(function() {
        //      for (var p = 0; p < response[endPointName].length; p++) {
        var shortname = response.shortName;
        var code = response.code;
        if (shortname === undefined) {
          shortname = "";
        }
        if (code === undefined) {
          code = "";
        }
        elm = elm + '<tr class="info"><td>' + response.id + '</td><td>' + response.displayName + '</td><td>' + code + '</td><td>' + shortname + '</td></tr>';
        //      });
        //    }
        $('.reporttable').append(elm);
        $scope.callSchemaEndPoint(i + 1, dataSchemas, uid, true);
      }
      //  $scope.callSchemaEndPoint(i + 1, dataSchemas, uid, false);

    })
      .error(function (e, x) {
        // calling same function (sending boolean "false" as uid is not found)
        $scope.callSchemaEndPoint(i + 1, dataSchemas, uid, false);
      });

  }
  // function on button
  $scope.submit = function () {

    if ($scope.uid == "" || typeof $scope.uid === undefined || $scope.uid === undefined) {
      var input = $scope.namee;
      if (input == undefined || input == "") {
        alert("Please enter the valid uid");
      } else {
        document.getElementById("overlay").style.display = "block";
        document.getElementById("loader").style.display = "block";
        document.getElementById("loading").style.display = "block";
        //    document.getElementById("data").style.display = "none";
        document.getElementById("Type").style.display = "none";
        $('.reporttable tr').remove();
        $('.reporttable tr').detach();
        $scope.getSchemas($scope.namee, 2);
      }
    } else {
      var input = $scope.uid;
      if (input == undefined || input == "") {
        alert("Please enter the valid uid");
      } else {
        document.getElementById("overlay").style.display = "block";
        document.getElementById("loader").style.display = "block";
        document.getElementById("loading").style.display = "block";
        //  document.getElementById("data").style.display = "none";
        document.getElementById("Type").style.display = "none";
        $('.reporttable tr').remove();
        $('.reporttable tr').detach();
        $scope.getSchemas($scope.uid, 1);
      }
    }


    // validations check




  };


  $scope.callSchemaEndPoint2 = function (i, dataSchemas, uid, uidFound) {

    //terminating recursion (if uid not found in whole json)
    if (i >= dataSchemas.resources.length) {
      document.getElementById("loader").style.display = "none";
      document.getElementById("loading").style.display = "none";
      document.getElementById("loading").innerHTML = "";
      //  document.getElementById("data").style.display = "none";
      document.getElementById("overlay").style.display = "none";
      document.getElementById("Type").style.display = "none";
      //    window.alert("Uid is not valid !");
      //window.location.replace("../../../api/apps/Angular-test/index.html");
      return;
    }
    var j = i - 1;
    //terminating recursion (if uid is found)
    if (uidFound) {
      document.getElementById("loader").style.display = "none";
      document.getElementById("loading").style.display = "none";
      document.getElementById("loading").innerHTML = "";
      //    document.getElementById("data").style.display = "block";
      document.getElementById("overlay").style.display = "none";

      return;
    }

    var endPointName = dataSchemas.resources[i].plural;

    // printing current searching domain

    document.getElementById("loading").innerHTML = "<p id='loadtext'> Searching in : " + endPointName + "</p>";

    $.getJSON("../../" + endPointName + ".json?fields=*&filter=displayName:like:" + uid + "&paging=false", function (response) {


      if (response[endPointName].length != 0) {
        console.log(response);

        $scope.namess = response;
        document.getElementById("Type").style.display = "block";
        var row = "<div class='checkbox cc'><label><input type='checkbox' class='checkboxx' id='" + dataSchemas.resources[i].displayName + "'>" + dataSchemas.resources[i].displayName + "</label></div>";
        $('.c').append(row);
        var elm = '<table id="' + dataSchemas.resources[i].displayName + '" class="table table-bordered table-hover"><tr style="font:15px;background-color:#f5f5f5"><td colspan="4" id="' + dataSchemas.resources[i].displayName + '"><b>UID Type : ' + dataSchemas.resources[i].displayName + '</b></td></tr>';

        elm = elm + '<tr style="background-color:#dfe9f4"><th>Uid</th><th>Name</th><th>Code</th><th>Short Name</th></tr>';

        for (var p = 0; p < response[endPointName].length; p++) {
          var shortname = response[endPointName][p].shortName;
          var code = response[endPointName][p].code;
          if (shortname === undefined) {
            shortname = "";
          }
          if (code === undefined) {
            code = "";
          }
          elm = elm + '<tr class="info"><td>' + response[endPointName][p].id + '</td><td>' + response[endPointName][p].displayName + '</td><td>' + code + '</td><td>' + shortname + '</td></tr>';

        }
        $('.reporttable').append(elm + "</table>");

      }
      $scope.callSchemaEndPoint2(i + 1, dataSchemas, uid, false);
      $(".reporttable").mark(uid);
    })
      .error(function (e, x) {
        $scope.callSchemaEndPoint2(i + 1, dataSchemas, uid, false);
      });

  }



  $scope.submit2 = function () {


  }; $scope.checkIfEnterKeyWasPressed = function ($event) {
    var keyCode = $event.which || $event.keyCode;
    if (keyCode === 13) {
      submit();
    }

  };
});
