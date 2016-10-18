/*jshint esversion:6*/
module.exports = function(mongoose, Checkout, Movie) {
	//What is the title of the movie(s) that was the most checked out?
	Checkout.aggregate([
    {
        $group: {
            _id: '$movieId',  //$region is the column name in collection
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
        Movie.find({_id: result[0]._id}, (err, movies) => {
        console.log("The most checked out movie is " + movies[0].title);
		});
   		}
	});
};