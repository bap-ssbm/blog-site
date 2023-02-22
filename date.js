//jshint esversion:6
exports.getDate = function() {

    const today = new Date();
    const currentDay = today.getDay();

    const options = {
        weekday: "short",
        day: "numeric",
        month: "short"
    };
    return today.toLocaleDateString("en-US", options);

    

};
