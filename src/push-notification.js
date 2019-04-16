import firebase from 'firebase';

export const initializeFirebase = () => {
    firebase.initializeApp({
        messagingSenderId: "825710094724" // troque pelo seu sender id 
    });

    // use other service worker
    // navigator.serviceWorker
    //   .register('/my-sw.js')
    //   .then((registration) => {
    //     firebase.messaging().useServiceWorker(registration);
    //   });
}

export const askForPermissioToReceiveNotifications = async () => {
    try {
        let token;
        const messaging = firebase.messaging();

        messaging.requestPermission()
            .then(async () => {
                console.log('Notification permission granted.');
                // TODO(developer): Retrieve a Instance ID token for use with FCM.
                // ...
                token = await messaging.getToken();
                console.log('user token: ', token);
                localStorage.setItem('notification-token', token);

            })
            .catch(function (err) {
                console.log('Unable to get permission to notify. ', err);
            });

        return token;
    } catch (error) {
        console.error(error);
    }
}