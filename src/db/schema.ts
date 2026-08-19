import { integer, pgTable, serial, text, timestamp, real, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users table matching Firebase Auth UID
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(),
  email: text('email').notNull(),
  displayName: text('display_name'),
  role: text('role').default('OPERATOR'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Mining Sites concession master
export const miningSites = pgTable('mining_sites', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  region: text('region').notNull(),
  centerLat: text('center_lat').notNull(),
  centerLng: text('center_lng').notNull(),
  iupNumber: text('iup_number').notNull(),
  status: text('status').default('ACTIVE'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Weighbridge & Truck tickets
export const weighbridgeTickets = pgTable('weighbridge_tickets', {
  id: text('id').primaryKey(),
  ticketNo: text('ticket_no').notNull().unique(),
  truckCode: text('truck_code').notNull(),
  driverName: text('driver_name'),
  grossKg: integer('gross_kg').notNull(),
  tareKg: integer('tare_kg').notNull(),
  netKg: integer('net_kg').notNull(),
  originPit: text('origin_pit').notNull(),
  destinationStockpile: text('destination_stockpile').notNull(),
  oreGradeNi: text('ore_grade_ni'),
  rfidScanned: boolean('rfid_scanned').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

// Stockpile Inventory records
export const stockpileInventory = pgTable('stockpile_inventory', {
  id: text('id').primaryKey(),
  stockpileName: text('stockpile_name').notNull(),
  locationCode: text('location_code').notNull(),
  oreTonnage: integer('ore_tonnage').notNull(),
  niGrade: real('ni_grade').notNull(),
  feGrade: real('fe_grade').notNull(),
  mcPercent: real('mc_percent').notNull(),
  status: text('status').default('READY_TO_SHIP'),
  lastUpdated: timestamp('last_updated').defaultNow(),
});

// Heavy Equipment Telemetry logs
export const fleetTelemetryLogs = pgTable('fleet_telemetry_logs', {
  id: serial('id').primaryKey(),
  unitCode: text('unit_code').notNull(),
  operatorName: text('operator_name'),
  lat: text('lat').notNull(),
  lng: text('lng').notNull(),
  speedKmh: integer('speed_kmh').default(0),
  fuelPercent: integer('fuel_percent').default(100),
  status: text('status').default('OPERATIONAL'),
  loggedAt: timestamp('logged_at').defaultNow(),
});

// Blending batch formulas
export const blendingBatches = pgTable('blending_batches', {
  id: text('id').primaryKey(),
  batchCode: text('batch_code').notNull().unique(),
  targetNi: real('target_ni').notNull(),
  resultNi: real('result_ni').notNull(),
  targetSmelter: text('target_smelter').notNull(),
  totalTonnage: integer('total_tonnage').notNull(),
  status: text('status').default('COMPLETED'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Table relations
export const usersRelations = relations(users, ({ many }) => ({
  tickets: many(weighbridgeTickets),
}));

export const weighbridgeTicketsRelations = relations(weighbridgeTickets, ({ one }) => ({
  user: one(users, {
    fields: [weighbridgeTickets.driverName],
    references: [users.displayName],
  }),
}));
