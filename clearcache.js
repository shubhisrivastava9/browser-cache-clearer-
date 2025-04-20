import fs from 'fs';
import path from 'path';
import os from 'os';

function getMacCachePaths(browser) {
  const home = os.homedir();

  if (browser === 'chrome') {
    return [
      path.join(home, 'Library', 'Caches', 'Google', 'Chrome', 'Default', 'Cache'),
      path.join(home, 'Library', 'Caches', 'Google', 'Chrome', 'Default', 'Cache_Data'),
      path.join(home, 'Library', 'Caches', 'Google', 'Chrome', 'Default', 'Code Cache'),
      path.join(home, 'Library', 'Caches', 'Google', 'Chrome', 'Default', 'GPUCache'),
    ];
  } else if (browser === 'edge') {
    return [
      path.join(home, 'Library', 'Caches', 'Microsoft Edge', 'Default', 'Cache'),
      path.join(home, 'Library', 'Caches', 'Microsoft Edge', 'Default', 'Cache_Data'),
      path.join(home, 'Library', 'Caches', 'Microsoft Edge', 'Default', 'Code Cache'),
      path.join(home, 'Library', 'Caches', 'Microsoft Edge', 'Default', 'GPUCache'),
    ];
  }
  return [];
}

function getWindowsCachePaths(browser) {
  const home = os.homedir();

  if (browser === 'chrome') {
    return [
      path.join(home, 'AppData', 'Local', 'Google', 'Chrome', 'User Data', 'Default', 'Cache'),
      path.join(home, 'AppData', 'Local', 'Google', 'Chrome', 'User Data', 'Default', 'Cache_Data'),
      path.join(home, 'AppData', 'Local', 'Google', 'Chrome', 'User Data', 'Default', 'Code Cache'),
      path.join(home, 'AppData', 'Local', 'Google', 'Chrome', 'User Data', 'Default', 'GPUCache'),
      path.join(home, 'AppData', 'Local', 'Google', 'Chrome', 'User Data', 'Default', 'Service Worker', 'CacheStorage'),
      path.join(home, 'AppData', 'Local', 'Google', 'Chrome', 'User Data', 'Default', 'Application Cache'),
    ];
  } else if (browser === 'edge') {
    return [
      path.join(home, 'AppData', 'Local', 'Microsoft', 'Edge', 'User Data', 'Default', 'Cache'),
      path.join(home, 'AppData', 'Local', 'Microsoft', 'Edge', 'User Data', 'Default', 'Cache_Data'),
      path.join(home, 'AppData', 'Local', 'Microsoft', 'Edge', 'User Data', 'Default', 'Code Cache'),
      path.join(home, 'AppData', 'Local', 'Microsoft', 'Edge', 'User Data', 'Default', 'GPUCache'),
    ];
  }
  return [];
}

function getCacheFolders(browser) {
  const platform = os.platform();
  if (platform === 'darwin') return getMacCachePaths(browser);
  if (platform === 'win32') return getWindowsCachePaths(browser);
  return [];
}

function deleteFolderContents(folderPath) {
  console.log(`📂 Checking: ${folderPath}`);
  if (!fs.existsSync(folderPath)) {
    console.log(`⚠️ Folder not found: ${folderPath}`);
    return;
  }

  try {
    const entries = fs.readdirSync(folderPath);
    for (const entry of entries) {
      const entryPath = path.join(folderPath, entry);
      fs.rmSync(entryPath, { recursive: true, force: true });
    }
    console.log(`✅ Cleared contents of: ${folderPath}`);
  } catch (err) {
    console.error(`❌ Error clearing ${folderPath}: ${err.message}`);
  }
}

function clearBrowserCache(browser) {
  console.log(`\n🧹 Clearing ${browser.toUpperCase()} cache...`);
  const folders = getCacheFolders(browser);
  if (folders.length === 0) {
    console.log(`❌ Unsupported platform or browser: ${browser}`);
    return;
  }

  folders.forEach(deleteFolderContents);
}

// Exportable function
export function clear() {
  clearBrowserCache('chrome');
  clearBrowserCache('edge');
}

// CLI Entry
if (process.argv[1] === new URL(import.meta.url).pathname) {
  clear();
}
