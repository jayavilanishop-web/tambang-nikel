import { db } from './index.ts';
import { 
  miningSites, 
  weighbridgeTickets, 
  stockpileInventory, 
  fleetTelemetryLogs, 
  blendingBatches 
} from './schema.ts';
import { desc, eq } from 'drizzle-orm';

// Mining Sites
export async function getMiningSites() {
  try {
    return await db.select().from(miningSites);
  } catch (error) {
    console.error('Database query getMiningSites failed:', error);
    throw new Error('Failed to retrieve mining sites.', { cause: error });
  }
}

// Weighbridge Tickets
export async function getWeighbridgeTickets(limitCount: number = 50) {
  try {
    return await db
      .select()
      .from(weighbridgeTickets)
      .orderBy(desc(weighbridgeTickets.createdAt))
      .limit(limitCount);
  } catch (error) {
    console.error('Database query getWeighbridgeTickets failed:', error);
    throw new Error('Failed to retrieve weighbridge tickets.', { cause: error });
  }
}

export async function createWeighbridgeTicket(ticketData: {
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
}) {
  try {
    const result = await db.insert(weighbridgeTickets)
      .values(ticketData)
      .returning();
    return result[0];
  } catch (error) {
    console.error('Database query createWeighbridgeTicket failed:', error);
    throw new Error('Failed to create weighbridge ticket.', { cause: error });
  }
}

// Stockpile Inventory
export async function getStockpileInventory() {
  try {
    return await db.select().from(stockpileInventory);
  } catch (error) {
    console.error('Database query getStockpileInventory failed:', error);
    throw new Error('Failed to retrieve stockpile inventory.', { cause: error });
  }
}

// Fleet Telemetry Logs
export async function getRecentFleetTelemetry(limitCount: number = 20) {
  try {
    return await db
      .select()
      .from(fleetTelemetryLogs)
      .orderBy(desc(fleetTelemetryLogs.loggedAt))
      .limit(limitCount);
  } catch (error) {
    console.error('Database query getRecentFleetTelemetry failed:', error);
    throw new Error('Failed to retrieve fleet telemetry logs.', { cause: error });
  }
}

export async function logFleetTelemetry(logData: {
  unitCode: string;
  operatorName?: string;
  lat: string;
  lng: string;
  speedKmh?: number;
  fuelPercent?: number;
  status?: string;
}) {
  try {
    const result = await db.insert(fleetTelemetryLogs)
      .values(logData)
      .returning();
    return result[0];
  } catch (error) {
    console.error('Database query logFleetTelemetry failed:', error);
    throw new Error('Failed to log fleet telemetry.', { cause: error });
  }
}

// Blending Batches
export async function getBlendingBatches() {
  try {
    return await db
      .select()
      .from(blendingBatches)
      .orderBy(desc(blendingBatches.createdAt));
  } catch (error) {
    console.error('Database query getBlendingBatches failed:', error);
    throw new Error('Failed to retrieve blending batches.', { cause: error });
  }
}

export async function createBlendingBatch(batchData: {
  id: string;
  batchCode: string;
  targetNi: number;
  resultNi: number;
  targetSmelter: string;
  totalTonnage: number;
  status?: string;
}) {
  try {
    const result = await db.insert(blendingBatches)
      .values(batchData)
      .returning();
    return result[0];
  } catch (error) {
    console.error('Database query createBlendingBatch failed:', error);
    throw new Error('Failed to create blending batch.', { cause: error });
  }
}
