module.exports = {
    context: '#idaan-temporal-nicform',
    props: {
        op: function ($scope) {
            return $scope.find('input[name="op"]').val();
        },
        form_build_id: function ($scope) {
            return $scope.find('input[name="form_build_id"]').val();
        },
        form_id: function ($scope) {
            return $scope.find('input[name="form_id"]').val();
        }
    }
};