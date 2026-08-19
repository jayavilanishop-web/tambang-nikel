export interface DbMiningSite {
  id: string;
  name: string;
  region: string;
  centerLat: string;
  centerLng: string;
  iupNumber: string;
  status: string;
  createdAt: string;
}

export interface DbWeighbridgeTicket {
  id: string;
  ticketNo: string;
  truckCode: string;
  driverName?: string;
  grossKg: number;
  tareKg: number;
  netKg: number;
  originPit: string;
  destinationStockpile: string;
  oreGradeNi?: string;
  rfidScanned?: boolean;
  createdAt: string;
}

export interface DbStockpileInventory {
  id: string;
  stockpileName: string;
  locationCode: string;
  oreTonnage: number;
  niGrade: number;
  feGrade: number;
  mcPercent: number;
  status: string;
  lastUpdated: string;
}

export interface DbFleetTelemetry {
  id: number;
  unitCode: string;
  operatorName?: string;
  lat: string;
  lng: string;
  speedKmh: number;
  fuelPercent: number;
  status: string;
  loggedAt: string;
}

export interface DbBlendingBatch {
  id: string;
  batchCode: string;
  targetNi: number;
  resultNi: number;
  targetSmelter: string;
  totalTonnage: number;
  status: string;
  createdAt: string;
}

export async function fetchSqlMiningSites(): Promise<DbMiningSite[]> {
  try {
    const res = await fetch('/api/db/sites');
    if (!res.ok) throw new Error('Failed to fetch sites from SQL');
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error('fetchSqlMiningSites error:', err);
    return [];
  }
}

export async function fetchSqlWeighbridgeTickets(): Promise<DbWeighbridgeTicket[]> {
  try {
    const res = await fetch('/api/db/weighbridge');
    if (!res.ok) throw new Error('Failed to fetch tickets from SQL');
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error('fetchSqlWeighbridgeTickets error:', err);
    return [];
  }
}

export async function saveSqlWeighbridgeTicket(ticket: {
  truckCode: string;
  driverName?: string;
  grossKg: number;
  tareKg: number;
  originPit: string;
  destinationStockpile: string;
  oreGradeNi?: string;
}): Promise<{ success: boolean; data?: DbWeighbridgeTicket }> {
  try {
    const res = await fetch('/api/db/weighbridge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ticket),
    });
    const json = await res.json();
    return json;
  } catch (err) {
    console.error('saveSqlWeighbridgeTicket error:', err);
    return { success: false };
  }
}

export async function fetchSqlStockpiles(): Promise<DbStockpileInventory[]> {
  try {
    const res = await fetch('/api/db/stockpiles');
    if (!res.ok) throw new Error('Failed to fetch stockpiles from SQL');
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error('fetchSqlStockpiles error:', err);
    return [];
  }
}

export async function fetchSqlTelemetry(): Promise<DbFleetTelemetry[]> {
  try {
    const res = await fetch('/api/db/telemetry');
    if (!res.ok) throw new Error('Failed to fetch telemetry from SQL');
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error('fetchSqlTelemetry error:', err);
    return [];
  }
}

export async function logSqlTelemetry(log: {
  unitCode: string;
  operatorName?: string;
  lat: string;
  lng: string;
  speedKmh?: number;
  fuelPercent?: number;
  status?: string;
}): Promise<{ success: boolean; data?: DbFleetTelemetry }> {
  try {
    const res = await fetch('/api/db/telemetry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(log),
    });
    const json = await res.json();
    return json;
  } catch (err) {
    console.error('logSqlTelemetry error:', err);
    return { success: false };
  }
}

export async function fetchSqlBlendingBatches(): Promise<DbBlendingBatch[]> {
  try {
    const res = await fetch('/api/db/blending');
    if (!res.ok) throw new Error('Failed to fetch blending from SQL');
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error('fetchSqlBlendingBatches error:', err);
    return [];
  }
}

export async function saveSqlBlendingBatch(batch: {
  targetNi: number;
  resultNi: number;
  targetSmelter: string;
  totalTonnage: number;
}): Promise<{ success: boolean; data?: DbBlendingBatch }> {
  try {
    const res = await fetch('/api/db/blending', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(batch),
    });
    const json = await res.json();
    return json;
  } catch (err) {
    console.error('saveSqlBlendingBatch error:', err);
    return { success: false };
  }
}
