import { OfflineSyncItem } from '../types';

const OFFLINE_QUEUE_KEY = 'smartmine_offline_queue_v1';

export function getOfflineQueue(): OfflineSyncItem[] {
  try {
    const raw = localStorage.getItem(OFFLINE_QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to read offline queue from localStorage', err);
    return [];
  }
}

export function saveOfflineQueue(items: OfflineSyncItem[]): void {
  try {
    localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(items));
  } catch (err) {
    console.error('Failed to save offline queue to localStorage', err);
  }
}

export function addOfflineItem(module: string, action: string, payload: any): OfflineSyncItem {
  const queue = getOfflineQueue();
  const newItem: OfflineSyncItem = {
    id: `OFFLINE-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    module,
    action,
    payload,
    status: 'QUEUED'
  };

  queue.unshift(newItem);
  saveOfflineQueue(queue);
  return newItem;
}

export function clearSyncedOfflineItems(): void {
  const queue = getOfflineQueue();
  const remaining = queue.filter(item => item.status !== 'SYNCED');
  saveOfflineQueue(remaining);
}
