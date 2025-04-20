# browser-cache-clearer

A Node.js utility designed for clearing local file system cache directories of Chrome and Edge browsers on macOS and Windows. This tool facilitates the removal of cached data, potentially freeing up disk space or resetting browser states for development and testing purposes.

## **Installation**

To integrate browser-cache-clearer into your Node.js project, execute the following command using npm:

#### npm install browser-cache-clearer

## Usage

The browser-cache-clearer package exposes a single asynchronous function, clear, for initiating the cache removal process.


import { clear } from 'browser-cache-clearer';

console.log('Initiating browser cache cleanup...');

try {
await clear();

console.log('Successfully cleared cache for Chrome and Edge.');
} 
catch (error) {
console.error('Failed to clear browser cache:', error.message);
}


## Important Considerations

### Limitations:

1. [ ] Browser Environments: This package is incompatible with in-browser JavaScript execution (e.g., within React applications) due to its reliance on Node.js-specific modules (fs, path, os).
2. [ ] 
3. [ ] Linux Support: Currently, Linux operating systems are not supported by this utility.
4. [ ] 
5. [ ] Electron Applications: Functionality within Electron applications is contingent upon proper Node.js integration within the Electron environment.

6. [ ] 

## **Supported Environments:**

1. [ ] Node.js Command-Line Interface (CLI) scripts
2. [ ] 
3. [ ] Backend Node.js services
4. [ ] 
5. [ ] Desktop applications built with Node.js and system access capabilities

## Targeted Cache Directories

browser-cache-clearer identifies and attempts to delete the following cache-related directories for the default user profile of both Chrome and Edge browsers:

1. [ ] Cache
2. [ ] 
3. [ ] GPUCache
4. [ ] 
5. [ ] Code Cache
6. [ ] 
7. [ ] Service Worker (or CacheStorage)
8. [ ] 
9. [ ] Application Cache


## Default Profile Locations:

#### macOS:

~/Library/Caches/Google/Chrome/Default/...

~/Library/Caches/Microsoft Edge/Default/...

#### Windows:

C:\Users\YOUR_NAME\AppData\Local\Google\Chrome\User Data\Default\...

C:\Users\YOUR_NAME\AppData\Local\Microsoft\Edge\User Data\Default\...