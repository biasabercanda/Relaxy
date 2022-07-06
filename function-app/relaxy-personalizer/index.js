'use strict';

const Personalizer = require('@azure/cognitiveservices-personalizer');
const CognitiveServicesCredentials = require('@azure/ms-rest-azure-js').CognitiveServicesCredentials;

const serviceKey = "8c5da198f3a7457dbe9286b570c1ed24";
const baseUri = "https://relazy-personanlizer.cognitiveservices.azure.com/";

function getActionsList() {
    return [
      {
        "id": "Piano on the rain",
        "features": [
          {
            "category" : "instrument",
            
            "activity" : "study"
          }
        ],
        "playlist" : ["piano","rain"]
      },
      {
        "id": "Cafe crowd",
        "features": [
          {
            "category" : "instrument",
            
            "activity" : "work"
          }
        ],
        "playlist" : ["coffe","guitar"]
      },
      {
        "id": "Guitar on the rain",
        "features": [
          {
            "category" : "instrument",
            
            "activity" : "sleep"
          }
        ],
        "playlist" : ["rain","guitar"]
      },
      {
        "id": "Guitar in the forest",
        "features": [
          {
            "category" : "instrument",
            
            "activity" : "work"
          }
        ],
        "playlist" : ["forest","guitar"]
      },
      {
        "id": "Rain with thuderstorm",
        "features": [
          {
            "category" : "nature",
            
            "activity" : "sleep"
          }
        ],
        "playlist" : ["rain","thunderstorm"]
      },
      {
        "id": "Rain in the forest",
        "features": [
          {
            "category" : "nature",
            "activity" : "study"
          }
        ],
        "playlist" : ["rain","forest"]
      },
      {
        "id": "Rain in the river",
        "features": [
          {
            "category" : "nature",
            
            "activity" : "sleep"
          }
        ],
        "playlist" : ["rain","waterstream"]
      },
      {
        "id": "Forest ambience",
        "features": [
          {
            "category" : "nature",
            
            "activity" : "work"
          }
        ],
        "playlist" : ["forest","water"]
      },
      {
        "id": "Cafe ambience",
        "features": [
          {
            "category" : "people",
            
            "activity" : "work"
          }
        ],
        "playlist" : ["coffee","fan"]
      },
      {
        "id": "Train trip",
        "features": [
          {
            "category" : "people",
           
            "activity" : "work"
          }
        ],
        "playlist" : ["train","rain"]
      },
      {
        "id": "Camping on the beach",
        "features": [
          {
            "category" : "people",
            
            "activity" : "work"
          }
        ],
        "playlist" : ["fire","seaside","water"]
      },
      {
        "id": "Camping night",
        "features": [
          {
            "category" : "nature",
            
            "activity" : "study"
          }
        ],
        "playlist" : ["fire","water","waterstream"]
      },
      
    ];
  }

module.exports = async function (context, req) {

    const credentials = new CognitiveServicesCredentials(serviceKey);
    const personalizerClient = new Personalizer.PersonalizerClient(credentials, baseUri);

    let rankRequest = {}
    rankRequest.eventId = req.body.id;

    rankRequest.contextFeatures = [{
        "category":req.body.category,
        "activity":req.body.activity
    }];

    rankRequest.actions = getActionsList();

    const rankResponse = await personalizerClient.rank(rankRequest);
    
    console.log("\nPersonalization service thinks you would like to have:\n")
    console.log(rankResponse.rewardActionId);

  let  list = {
    "Piano on the rain":{ 
      "id":"Piano on the rain",
      "playlist" : ["piano","rain"]
    },
    "Cafe crowd":{
      "id":"Cafe crowd",
      "playlist" : ["coffee","guitar"]
    },
    "Guitar on the rain":{
      "id":"Guitar on the rain",
      "playlist" : ["rain","guitar"]
    },
    "Guitar in the forest":{
      "id":"Guitar in the forest",
      "playlist" : ["forest","guitar"]
    },
    "Rain with thuderstorm":{
      "id":"Rain with thuderstorm",
      "playlist" : ["rain","thunderstorm"]
    },
    "Rain in the forest":{
      "id":"Rain in the forest",
      "playlist" : ["rain","forest"]
    },
    "Rain in the river":{
      "id":"Rain in the river",
      "playlist" : ["rain","waterstream"]
    },
    "Forest ambience":{
      "id":"Forest ambience",
      "playlist" : ["forest","water"]
    },
    "Cafe ambience":{
      "id":"Cafe ambience",
      "playlist" : ["coffee","fan"]
    },
    "Train trip":{
      "id":"Train trip",
      "playlist" : ["train","rain"]
    },
    "Camping on the beach":{
      "id":"Camping on the beach",
      "playlist" : ["fire","seaside","water"]
    },
    "Camping night":{
      "id":"Camping night",
      "playlist" : ["fire","water","waterstream"]
    }, 
  }
  
  let pass = []
  
  for (let i=0;i<3;i++){
    pass[i]=list[rankResponse.ranking[i].id]
  }
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: pass
    };
}

