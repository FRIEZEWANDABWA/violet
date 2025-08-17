// Service Worker for OZONE I.T SYSTEM Website
// Provides offline functionality and caching for PWA features

const CACHE_NAME = 'ozone-it-system-v1.0.0';
const urlsToCache = [
    '/',
    '/index.html',
    '/about.html',
    '/services.html',
    '/portfolio.html',
    '/blog.html',
    '/gallery.html',
    '/contact.html',
    '/assets/css/style.css',
    '/assets/js/main.js',
    '/assets/js/ai-chat.js',
    '/assets/js/particles.js',
    '/pics/pexels-divinetechygirl-1181354.webp',
    '/pics/pexels-pixabay-60504.jpg',
    '/pics/alex-knight-2EJCSULRwC8-unsplash (1).webp',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
    'https://unpkg.com/aos@2.3.1/dist/aos.css',
    'https://unpkg.com/aos@2.3.1/dist/aos.js'
];

// Install event - cache resources
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
            .catch(error => {
                console.error('Failed to cache resources:', error);
            })
    );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached version or fetch from network
                if (response) {
                    return response;
                }
                
                return fetch(event.request).then(response => {
                    // Check if we received a valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    
                    // Clone the response
                    const responseToCache = response.clone();
                    
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseToCache);
                        });
                    
                    return response;
                });
            })
            .catch(() => {
                // Return offline page for navigation requests
                if (event.request.destination === 'document') {
                    return caches.match('/index.html');
                }
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Background sync for form submissions
self.addEventListener('sync', event => {
    if (event.tag === 'contact-form-sync') {
        event.waitUntil(syncContactForm());
    }
    if (event.tag === 'newsletter-sync') {
        event.waitUntil(syncNewsletter());
    }
});

// Push notification handling
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'New update from OZONE I.T SYSTEM',
        icon: '/pics/pexels-divinetechygirl-1181354.webp',
        badge: '/pics/pexels-divinetechygirl-1181354.webp',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Explore',
                icon: '/pics/pexels-divinetechygirl-1181354.webp'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/pics/pexels-divinetechygirl-1181354.webp'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('OZONE I.T SYSTEM', options)
    );
});

// Notification click handling
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Sync functions
async function syncContactForm() {
    try {
        const formData = await getStoredFormData('contact-form');
        if (formData) {
            // Attempt to submit form data
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                // Remove from storage on successful submission
                await removeStoredFormData('contact-form');
                console.log('Contact form synced successfully');
            }
        }
    } catch (error) {
        console.error('Failed to sync contact form:', error);
    }
}

async function syncNewsletter() {
    try {
        const formData = await getStoredFormData('newsletter');
        if (formData) {
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                await removeStoredFormData('newsletter');
                console.log('Newsletter subscription synced successfully');
            }
        }
    } catch (error) {
        console.error('Failed to sync newsletter:', error);
    }
}

// Helper functions for IndexedDB operations
async function getStoredFormData(formType) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('OzoneFormData', 1);
        
        request.onerror = () => reject(request.error);
        
        request.onsuccess = () => {
            const db = request.result;
            const transaction = db.transaction(['forms'], 'readonly');
            const store = transaction.objectStore('forms');
            const getRequest = store.get(formType);
            
            getRequest.onsuccess = () => resolve(getRequest.result?.data);
            getRequest.onerror = () => reject(getRequest.error);
        };
        
        request.onupgradeneeded = () => {
            const db = request.result;
            if (!db.objectStoreNames.contains('forms')) {
                db.createObjectStore('forms', { keyPath: 'type' });
            }
        };
    });
}

async function removeStoredFormData(formType) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('OzoneFormData', 1);
        
        request.onerror = () => reject(request.error);
        
        request.onsuccess = () => {
            const db = request.result;
            const transaction = db.transaction(['forms'], 'readwrite');
            const store = transaction.objectStore('forms');
            const deleteRequest = store.delete(formType);
            
            deleteRequest.onsuccess = () => resolve();
            deleteRequest.onerror = () => reject(deleteRequest.error);
        };
    });
}

// Message handling for communication with main thread
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

console.log('Service Worker loaded successfully');