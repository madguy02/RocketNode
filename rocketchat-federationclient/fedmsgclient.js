Comments = new Mongo.Collection('rocketchat_federationmessage');



  Meteor.subscribe('rocketchat_federationmessage');


  Template.federation.helpers({
    federationmessage: function () {
	console.log(Comments.find({}).fetch());
      return Comments.find({}).fetch();
  }
      
    
  });

  



