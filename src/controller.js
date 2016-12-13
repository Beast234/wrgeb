// from root
// page_token=<MY PAGE TOKEN> verify_token=<MY_VERIFY_TOKEN> node facebook_bot.js [--lt [--ltsubdomain LOCALTUNNEL_SUBDOMAIN]]
//

import Botkit from 'botkit';
import alexa from 'alexa-botkit';

// define routes for connecting to various gardens
const alexaEars = alexa({});
const fbEars = Botkit.facebookbot({
    debug: true,
    log: true,
    access_token: process.env.page_token,
    verify_token: process.env.verify_token,
});

// spawn Ears for each of the routes
const fbConnection = fbEars.spawn({});
const alexaConnection = alexaEars.spawn({});

// start listening to your Ears!
fbEars.setupWebserver(3001, function(err, webserver) {
    fbEars.createWebhookEndpoints(webserver, fbConnection, function() {
        console.log('FB MESSENGER LISTENING!');
    });
});
alexaEars.setupWebserver(3000, (err, webserver) => {
  alexaEars.createWebhookEndpoints(webserver, alexaConnection, () => {
    console.log('ALEXA LISTENING!');
  });
});

export fbConnection, alexaConnection, fbEars, alexaRoute from default;



// export default controller;
