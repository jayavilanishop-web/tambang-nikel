export const SUPABASE_SQL_INIT_SCRIPT = `-- ==========================================
-- NickelSmart AI - Supabase Database Schema
-- Run this in Supabase SQL Editor (SQL Query)
-- ==========================================

-- 1. Mining Sites Master
CREATE TABLE IF NOT EXISTS public.mining_sites (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  region TEXT NOT NULL,
  center_lat TEXT NOT NULL,
  center_lng TEXT NOT NULL,
  iup_number TEXT NOT NULL,
  status TEXT DEFAULT 'ACTIVE',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Weighbridge & Truck Tickets
CREATE TABLE IF NOT EXISTS public.weighbridge_tickets (
  id TEXT PRIMARY KEY,
  ticket_no TEXT NOT NULL UNIQUE,
  truck_code TEXT NOT NULL,
  driver_name TEXT,
  gross_kg INTEGER NOT NULL,
  tare_kg INTEGER NOT NULL,
  net_kg INTEGER NOT NULL,
  origin_pit TEXT NOT NULL,
  destination_stockpile TEXT NOT NULL,
  ore_grade_ni TEXT,
  rfid_scanned BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Stockpile Inventory
CREATE TABLE IF NOT EXISTS public.stockpile_inventory (
  id TEXT PRIMARY KEY,
  stockpile_name TEXT NOT NULL,
  location_code TEXT NOT NULL,
  ore_tonnage INTEGER NOT NULL,
  ni_grade REAL NOT NULL,
  fe_grade REAL NOT NULL,
  mc_percent REAL NOT NULL,
  status TEXT DEFAULT 'READY_TO_SHIP',
  last_updated TIMESTAMPTZ DEFAULT now()
);

-- 4. Fleet Telemetry Logs
CREATE TABLE IF NOT EXISTS public.fleet_telemetry_logs (
  id BIGSERIAL PRIMARY KEY,
  unit_code TEXT NOT NULL,
  operator_name TEXT,
  lat TEXT NOT NULL,
  lng TEXT NOT NULL,
  speed_kmh INTEGER DEFAULT 0,
  fuel_percent INTEGER DEFAULT 100,
  status TEXT DEFAULT 'OPERATIONAL',
  logged_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Blending Batches
CREATE TABLE IF NOT EXISTS public.blending_batches (
  id TEXT PRIMARY KEY,
  batch_code TEXT NOT NULL UNIQUE,
  target_ni REAL NOT NULL,
  result_ni REAL NOT NULL,
  target_smelter TEXT NOT NULL,
  total_tonnage INTEGER NOT NULL,
  status TEXT DEFAULT 'COMPLETED',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Users Profile
CREATE TABLE IF NOT EXISTS public.users (
  id BIGSERIAL PRIMARY KEY,
  uid TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL,
  display_name TEXT,
  role TEXT DEFAULT 'OPERATOR',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS) & Allow public read/write for demo
ALTER TABLE public.mining_sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weighbridge_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stockpile_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fleet_telemetry_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blending_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Setup basic open policies for API access
CREATE POLICY IF NOT EXISTS "Allow public access to mining_sites" ON public.mining_sites FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Allow public access to weighbridge_tickets" ON public.weighbridge_tickets FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Allow public access to stockpile_inventory" ON public.stockpile_inventory FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Allow public access to fleet_telemetry_logs" ON public.fleet_telemetry_logs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Allow public access to blending_batches" ON public.blending_batches FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Allow public access to users" ON public.users FOR ALL USING (true) WITH CHECK (true);

-- Seed Initial Concession Data
INSERT INTO public.mining_sites (id, name, region, center_lat, center_lng, iup_number, status)
VALUES 
  ('site-morowali', 'Morowali Concession Site (Sulteng)', 'Bahodopi, Morowali', '-2.8285', '122.1642', 'IUP-OP No. 540/128/ESDM', 'ACTIVE'),
  ('site-kolaka', 'Pomalaa Kolaka Concession Site (Sultra)', 'Pomalaa, Kolaka', '-4.1812', '121.6115', 'IUP-OP No. 540/882/DPE', 'ACTIVE'),
  ('site-wedabay', 'Weda Bay Concession Site (Halmahera)', 'Halmahera Tengah, Maluku Utara', '0.4682', '127.9625', 'IUP-OP No. 540/412/ESDM', 'ACTIVE'),
  ('site-sorowako', 'Sorowako Concession Site (Sulsel)', 'Luwu Timur, Sulawesi Selatan', '-2.5412', '121.3654', 'KK No. 102/ESDM/2020', 'ACTIVE')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.stockpile_inventory (id, stockpile_name, location_code, ore_tonnage, ni_grade, fe_grade, mc_percent, status)
VALUES
  ('stk-efo-01', 'Stockpile EFO 01 (Export Final Ore)', 'EFO-MOROWALI-01', 48500, 1.82, 21.0, 31.5, 'READY_TO_SHIP'),
  ('stk-eto-01', 'Stockpile ETO Central Transit', 'ETO-MOROWALI-02', 62000, 1.65, 24.5, 33.0, 'BLENDING_IN_PROGRESS'),
  ('stk-limonite-01', 'Stockpile Limonite HPAL Feed', 'LIM-MOROWALI-03', 95000, 1.32, 44.0, 35.2, 'READY_TO_SHIP')
ON CONFLICT (id) DO NOTHING;
`;
