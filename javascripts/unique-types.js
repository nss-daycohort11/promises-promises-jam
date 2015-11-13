define(["lodash"],
    function(_) {

        return function(dataArray) {
                var uniqueTypes = _.chain(dataArray)
                                    .uniq("type")
                                    .pluck("type")
                                    .value();
                // console.log("unique-artists", uniqueTypes);
                return uniqueTypes;
        };
});