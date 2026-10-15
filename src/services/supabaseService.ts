import { getSupabase } from '../lib/supabase';
import { 
  DbMiningSite, 
  DbWeighbridgeTicket, 
  DbStockpileInventory, 
  DbFleetTelemetry, 
  DbBlendingBatch 
} from './sqlDbService';

export async function fetchSupabaseSites(): Promise<DbMiningSite[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  try {
    const { data, error } = await supabase
      .from('mining_sites')
      .select('*')
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    return (data || []).map((row: any) => ({
      id: row.id,
      name: row.name,
      region: row.region,
      centerLat: row.center_lat,
      centerLng: row.center_lng,
      iupNumber: row.iup_number,
      status: row.status,
      createdAt: row.created_at,
    }));
  } catch (err) {
    console.error('fetchSupabaseSites error:', err);
    return [];
  }
}

export async function fetchSupabaseTickets(): Promise<DbWeighbridgeTicket[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  try {
    const { data, error } = await supabase
      .from('weighbridge_tickets')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);
    
    if (error) throw error;
    return (data || []).map((row: any) => ({
      id: row.id,
      ticketNo: row.ticket_no,
      truckCode: row.truck_code,
      driverName: row.driver_name,
      grossKg: row.gross_kg,
      tareKg: row.tare_kg,
      netKg: row.net_kg,
      originPit: row.origin_pit,
      destinationStockpile: row.destination_stockpile,
      oreGradeNi: row.ore_grade_ni,
      rfidScanned: row.rfid_scanned,
      createdAt: row.created_at,
    }));
  } catch (err) {
    console.error('fetchSupabaseTickets error:', err);
    return [];
  }
}

export async function saveSupabaseTicket(ticket: {
  truckCode: string;
  driverName?: string;
  grossKg: number;
  tareKg: number;
  originPit: string;
  destinationStockpile: string;
  oreGradeNi?: string;
}): Promise<{ success: boolean; data?: any }> {
  const supabase = getSupabase();
  if (!supabase) return { success: false };

  try {
    const netKg = Number(ticket.grossKg) - Number(ticket.tareKg);
    const row = {
      id: `TKT-${Date.now()}`,
      ticket_no: `WB-${Math.floor(100000 + Math.random() * 900000)}`,
      truck_code: ticket.truckCode,
      driver_name: ticket.driverName || 'Operator Truk',
      gross_kg: Number(ticket.grossKg),
      tare_kg: Number(ticket.tareKg),
      net_kg: netKg,
      origin_pit: ticket.originPit,
      destination_stockpile: ticket.destinationStockpile,
      ore_grade_ni: ticket.oreGradeNi || '1.82% Ni',
      rfid_scanned: true,
    };

    const { data, error } = await supabase
      .from('weighbridge_tickets')
      .insert([row])
      .select();

    if (error) throw error;
    return { success: true, data: data?.[0] };
  } catch (err) {
    console.error('saveSupabaseTicket error:', err);
    return { success: false };
  }
}

export async function fetchSupabaseStockpiles(): Promise<DbStockpileInventory[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  try {
    const { data, error } = await supabase
      .from('stockpile_inventory')
      .select('*')
      .order('ore_tonnage', { ascending: false });

    if (error) throw error;
    return (data || []).map((row: any) => ({
      id: row.id,
      stockpileName: row.stockpile_name,
      locationCode: row.location_code,
      oreTonnage: row.ore_tonnage,
      niGrade: row.ni_grade,
      feGrade: row.fe_grade,
      mcPercent: row.mc_percent,
      status: row.status,
      lastUpdated: row.last_updated,
    }));
  } catch (err) {
    console.error('fetchSupabaseStockpiles error:', err);
    return [];
  }
}

export async function logSupabaseTelemetry(log: {
  unitCode: string;
  operatorName?: string;
  lat: string;
  lng: string;
  speedKmh?: number;
  fuelPercent?: number;
  status?: string;
}): Promise<{ success: boolean; data?: any }> {
  const supabase = getSupabase();
  if (!supabase) return { success: false };

  try {
    const row = {
      unit_code: log.unitCode,
      operator_name: log.operatorName || 'Operator',
      lat: String(log.lat),
      lng: String(log.lng),
      speed_kmh: Number(log.speedKmh) || 0,
      fuel_percent: Number(log.fuelPercent) || 100,
      status: log.status || 'OPERATIONAL',
    };

    const { data, error } = await supabase
      .from('fleet_telemetry_logs')
      .insert([row])
      .select();

    if (error) throw error;
    return { success: true, data: data?.[0] };
  } catch (err) {
    console.error('logSupabaseTelemetry error:', err);
    return { success: false };
  }
}
