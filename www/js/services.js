angular.module('starter.services', [])
.factory('StateMachine', function(){
         var states = [{
                       id: "default",
                       name: 'idle',
                       cssClass: 'medIdle'
         }, {
                       id: "unchecked",
                       name: 'toTake',
                       cssClass: 'medToTake'
         }, {
                       id: 2,
                       name: 'checked',
                       cssClass: 'medTaken'
         }, {
                       id: 3,
                       name: 'notchecked',
                       cssClass: 'medDepricated'
         }];

         return {
         all: function() {
            return states;
         },
         get: function(chatId) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].id === parseInt(chatId)) {
                    return chats[i];
                }
            }
            return null;
         }
        };
});
