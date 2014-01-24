var application = angular.module('application', ['meteor', 'ngRoute']);
application.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/rate/:model', {
            template: '' +
                    '<div>' +
                    '<p>' +
                    'Rates from the "{{modelName}}" Mongo entity:' +
                    '</p>' +
                    '<div id="d3ChartContainer"></div>' +
                    '</div>',
            controller: 'RateController'
        }).otherwise({
            template: '' +
                    '<div>' +
                    '<p>Charts for the following <b>{{rates.length}}</b> rates are available:</p>' +
                    '<div ng-repeat="rate in rates">' +
                    '<input type="button" name="{{rate.model}}" value=\'Mongo entity "{{rate.name}}" mapped into "{{rate.model}}"\' onclick=\'document.location = "#/rate/" + this.name + "/";\' class="btn" />' +
                    '<br /><br />' +
                    '</div>',
            controller: 'RateListController'
        });
    }]);
application.controller('RateListController', function($scope) {
    $scope.autorun('rates', function() {
        return Rates.find().fetch();
    });
});
application.controller('RateController', function($scope, $route) {
    var parameters = $route.current.params;
    var modelName = parameters.model;
    $scope.autorun('items', function() {
        var model = eval(modelName);
        return model.find().fetch();
    });
    $scope.modelName = modelName;
    // Initialize the chart and attach it to the context
    $scope.d3Chart = d3.chart(moment);
    $scope.d3Chart.init({
        container: '#d3ChartContainer',
        xDim: 'DateTime'
    });
    $scope.d3Chart.addGraph({
        id: 'chart-1',
        type: 'analog',
        name: 'Data from "' + modelName + '"',
        dataId: 1,
        yVal: ['value'],
        data: (function convert(items) {
            var result = new Array();
            items.forEach(function(item) {
                // "D3" requires data to come in such a field
                item.DateTime = item.time;
                result.push(item);
            });
            return result;
        })($scope.items)
    });
    $scope.d3Chart.render();
    setInterval(function() {
        $scope.d3Chart.reorderGraph('chart-1', 'up');
    }, 3000);
});