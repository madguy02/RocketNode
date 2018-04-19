Comments = new Mongo.Collection('rocketchat_federationmessage');

  Meteor.publish('rocketchat_federationmessage', function () {
	console.log(Comments.find({}));
      return Comments.find({});
       
  });

