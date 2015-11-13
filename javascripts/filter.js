define(["jquery"], function($) {

console.log("we're here");

$("#select").change(function(e) {
        var filteredType = $("#select option:selected").text();
        console.log("selected type", filteredType);

        $(".book").each(function() {
            if (filteredType === "Show All") {
                $(".book").show();
            } else if (filteredType === "Science & Technology") {
                $(".type0").show();
                $(".type1").hide();
            } else if (filteredType === "Fiction") {
                $(".type1").show();
                $(".type0").hide();
            }
        });
    });
});