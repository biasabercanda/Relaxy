'use strict';

const Personalizer = require('@azure/cognitiveservices-personalizer');
const CognitiveServicesCredentials = require('@azure/ms-rest-azure-js').CognitiveServicesCredentials;

const serviceKey = "8c5da198f3a7457dbe9286b570c1ed24";
const baseUri = "https://relazy-personanlizer.cognitiveservices.azure.com/";


module.exports = async function (context, req) {

    const credentials = new CognitiveServicesCredentials(serviceKey);
    const personalizerClient = new Personalizer.PersonalizerClient(credentials, baseUri);

    let rankRequest = {}
    rankRequest.eventId = req.body.id;

    const reward = 1;

    const rewardRequest = {
        value: reward
      }
    
      await personalizerClient.events.reward(rankRequest.eventId, rewardRequest);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: "success"
    };
}

