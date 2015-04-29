module.exports = {
    context: {
        selector: '.saldo',
        index: 0
    },
    props: {
        lastInvoiceDate: function($scope, $) {            
            var row = $scope.$find('tr', 0);

            return row.$find('td', 1).text();
        },
        lastDueDate: function($scope, $) {
            var row = $scope.$find('tr', 1);

            return row.$find('td', 1).text();
        },
        dueWaterAmount: function($scope, $) {
            var row = $scope.$find('tr', 2);

            //return row.$find('td', 1).text();
            return parseFloat(row.$find('td').eq(1).text().substring(3), 10);
        },
        dateFormatISO: function () {
            return 'es-pa';
        }
    }
};