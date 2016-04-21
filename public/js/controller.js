angular.module('formApp', [])
    .controller('mainController', function ($scope, $http) {
    
    $scope.showSummary = function () {
        $http({
            method : 'GET',
            url : 'http://localhost:1337/getallpersons'
        })
        .success(function (data) {
            console.log(data);

            //$scope.formData.persons = data;
            //console.log($scope.formData);
        })
        .error(console.log("Get error"));
    };

    $scope.formData = {};
    $scope.date = new Date();
    
    $scope.onSubmit = function (req, err) {
        var input =  {
            fname: $scope.formData.fname,
            lname: $scope.formData.lname,
            age: $scope.formData.age,
            email: $scope.formData.email,
            country: $scope.formData.country,
            phone: $scope.formData.phone,
            date: $scope.formData.date
        };   
        console.log(input);
        $http({
            method  : 'Post',
            url     : 'http://localhost:1337/save',
            data    : input, //forms user object
            //headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .success(function (input) {
            console.log("Record Inserted");
            window.redirect("/summary.html");
        })        
       
    };
   
    //variables for Sorting       
    //$scope.sortText = "fname";
    $scope.reverseSort = false;
    $scope.sortData = function (col) {
        console.log("Inside sortData");
        //$scope.allpersons = showSummary(req, res);
        $scope.reverseSort = ($scope.sortCol == col) ? !$scope.reverseSort : false;
        $scope.sortCol = text;
    }

});