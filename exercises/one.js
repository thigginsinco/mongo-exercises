/*jshint esversion:6*/
module.exports = function(mongoose, Checkout, Movie) {
	// What user(s) had the most checkouts?
	
	Checkout.aggregate([
    {
        $group: {
            _id: '$userId',  //$region is the column name in collection
            count: {$sum: 1}
        }
    }
	], function (err, result) {
    	if (err) {
      	  next(err);
   	 } else {
        result.sort(function(obj1, obj2) {
        	return obj2.count - obj1.count;
        });
        console.log("The user " + result[0]._id + " had " + result[0].count + " checkouts.");
    }
});
};
