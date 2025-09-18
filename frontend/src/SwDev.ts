// /*
//  * Converts a VAPID public key from URL-safe Base64 to a Uint8Array.
//  * @param base64String The URL-safe Base64 encoded string.
//  * @returns A Uint8Array representation of the key.
// */

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

/**
 * Returns the application server key for Push API.
 */
function determineAppServerKey(): ArrayBuffer {
  const vapidPublicKey = "BOb-7oG3X97Uvm8ivyhwVSk_y9ja5MJpvSsrq4Rt0DzCSKpsD9VGYcJ45oAr2sw0PLYG42s6mZ544-aoml72LKs";
  const uint8Array = urlBase64ToUint8Array(vapidPublicKey);
  
  // Create a new ArrayBuffer and copy the data
  const arrayBuffer = new ArrayBuffer(uint8Array.length);
  const view = new Uint8Array(arrayBuffer);
  view.set(uint8Array);
  
  return arrayBuffer;
}
/**
 * Checks if push messaging is supported
 */
function isPushSupported(): boolean {
  return (
    'serviceWorker' in navigator &&
    'PushManager' in window &&
    'Notification' in window
  );
}


async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  try {
    const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
    const registration = await navigator.serviceWorker.register(swUrl, {
      scope: '/',
    });
    
    console.log("Service Worker registered with scope:", registration.scope);
    return registration;
  } catch (error) {
    console.error("Service Worker registration failed:", error);
    return null;
  }
}


async function requestNotificationPermission(): Promise<boolean> {
  try {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  } catch (error) {
    console.error("Notification permission request failed:", error);
    return false;
  }
}


export async function initializePushNotifications(): Promise<void> {
  // Check if push is supported
  if (!isPushSupported()) {
    console.warn("Push notifications are not supported in this browser.");
    return;
  }

  // Check if we're on HTTPS (required for push notifications)
  if (window.location.protocol !== 'https:' && !window.location.hostname.includes('localhost')) {
    console.warn("Push notifications require HTTPS. Current protocol:", window.location.protocol);
    return;
  }

  try {
    // Register service worker
    const registration = await registerServiceWorker();
    if (!registration) return;

    // Wait for service worker to be ready
    await navigator.serviceWorker.ready;

    // Request notification permission
    const hasPermission = await requestNotificationPermission();
    if (!hasPermission) {
      console.warn("Notification permission was not granted.");
      return;
    }

    // Check existing subscription
    let subscription = await registration.pushManager.getSubscription();
    
    if (!subscription) {
      try {
        // Subscribe to push notifications
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: determineAppServerKey(),
        });
        
        console.log('Push Subscription created:', subscription);
        // Send subscription to your server here
        // await sendSubscriptionToServer(subscription);
        
      } catch (subscribeError) {
        console.error('Push subscription failed:', subscribeError);
        // This might be a VAPID key issue or browser compatibility
      }
    } else {
      console.log('User is already subscribed:', subscription);
    }

  } catch (error) {
    console.error("Push notification initialization failed:", error);
  }
}

// Optional: Function to send subscription to your backend
async function sendSubscriptionToServer(subscription: PushSubscription): Promise<void> {
  try {
    const response = await fetch('/api/save-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscription),
    });
    
    if (!response.ok) {
      throw new Error('Failed to save subscription');
    }
    
    console.log('Subscription saved to server');
  } catch (error) {
    console.error('Error saving subscription to server:', error);
  }
}

