/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

AppRegistry.registerComponent(appName, () => App);

exports.addMessage = functions.https.onRequest(async(request, response) => {
    const originalText = request.query.text;

    const writeResult = await admin.firestore().collection('messages').add({ original: originalText });

    response.json({ result: 'Message with ID: ${writeResult.id} added.'});
});

exports.makeUppercase = functions.firestore.document('/messages/{documentId}')
    .onCreate((snapshot, context) => {

        const originalText = snapshot.data().original;

        console.log('Uppercasing', context.params.documentId, originalText);

        const uppercase = originalText.toUppercase();

        return snapshot.ref.set({ uppercase }, { merge: true });

    });
