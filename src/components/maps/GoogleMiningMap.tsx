import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  APIProvider, 
  Map, 
  AdvancedMarker, 
  Pin, 
  InfoWindow, 
  useAdvancedMarkerRef,
  useMap
} from '@vis.gl/react-google-maps';
import { 
  Navigation, 
  Truck, 
  Pickaxe, 
  Anchor, 
  Layers, 
  Compass, 
  Radio, 
  Scale, 
  Maximize2, 
  Minimize2, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  Fuel, 
  Gauge, 
  Globe, 
  KeyRound, 
  Sliders, 
  RefreshCw,
  ExternalLink,
  ShieldAlert,
  Flame,
  Search,
  ZoomIn,
  ZoomOut,
  Crosshair,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { HeavyEquipment, MineSite, OreStockpile, PitOperation, Language } from '../../types';
import { useDevConfig } from '../../services/devConfigService';

// Resolve Google Maps Platform API Key
const ENV_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  '';

export const isActualGoogleApiKey = (key?: string): boolean => {
  if (!key) return false;
  const k = key.trim();
  if (k.length < 30) return false;
  if (!k.startsWith('AIza')) return false;
  if (
    k.includes('sample') || 
    k.includes('placeholder') || 
    k.includes('YOUR_API_KEY') || 
    k.includes('test') ||
    k.includes('AIzaSyD-sample')
  ) {
    return false;
  }
  return true;
};

export interface MiningMapLocation {
  id: string;
  name: string;
  category: 'pit' | 'stockpile' | 'jetty' | 'weighbridge' | 'workshop' | 'fleet';
  lat: number;
  lng: number;
  elevationM?: number;
  status?: string;
  details?: string;
  niGrade?: number;
  feGrade?: number;
  tonnage?: number;
  operator?: string;
  speedKmh?: number;
  fuelPercent?: number;
  unitCode?: string;
}

// Preset Concession Sites in Indonesia
export const MINING_CONCESSION_SITES = [
  {
    id: 'site-morowali',
    name: 'Morowali Concession Site (Sulteng)',
    region: 'Bahodopi, Morowali',
    center: { lat: -2.8285, lng: 122.1642 },
    zoom: 14,
    iup: 'IUP-OP No. 540/128/ESDM'
  },
  {
    id: 'site-kolaka',
    name: 'Pomalaa Kolaka Concession Site (Sultra)',
    region: 'Pomalaa, Kolaka',
    center: { lat: -4.1812, lng: 121.6115 },
    zoom: 14,
    iup: 'IUP-OP No. 540/882/DPE'
  },
  {
    id: 'site-wedabay',
    name: 'Weda Bay Concession Site (Halmahera)',
    region: 'Halmahera Tengah, Maluku Utara',
    center: { lat: 0.4682, lng: 127.9625 },
    zoom: 14,
    iup: 'IUP-OP No. 540/412/ESDM'
  },
  {
    id: 'site-sorowako',
    name: 'Sorowako Concession Site (Sulsel)',
    region: 'Luwu Timur, Sulawesi Selatan',
    center: { lat: -2.5412, lng: 121.3654 },
    zoom: 14,
    iup: 'KK No. 102/ESDM/2020'
  }
];

// Interactive Map Marker with InfoWindow Component for Google Maps API
const InteractiveMiningMarker: React.FC<{
  item: MiningMapLocation;
  isSelected: boolean;
  onSelect: (item: MiningMapLocation) => void;
}> = ({ item, isSelected, onSelect }) => {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [isOpen, setIsOpen] = useState(isSelected);

  useEffect(() => {
    setIsOpen(isSelected);
  }, [isSelected]);

  const getPinConfig = () => {
    switch (item.category) {
      case 'fleet':
        return {
          bg: item.status === 'OPERATIONAL' ? '#10B981' : item.status === 'MAINTENANCE' ? '#F59E0B' : '#EF4444',
          glyph: '🚚',
          border: '#047857'
        };
      case 'pit':
        return { bg: '#8B5CF6', glyph: '⛏️', border: '#6D28D9' };
      case 'stockpile':
        return { bg: '#F59E0B', glyph: '⛰️', border: '#D97706' };
      case 'jetty':
        return { bg: '#3B82F6', glyph: '⚓', border: '#1D4ED8' };
      case 'weighbridge':
        return { bg: '#06B6D4', glyph: '⚖️', border: '#0891B2' };
      case 'workshop':
        return { bg: '#64748B', glyph: '🔧', border: '#475569' };
      default:
        return { bg: '#4285F4', glyph: '📍', border: '#1E40AF' };
    }
  };

  const pinConfig = getPinConfig();

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={{ lat: item.lat, lng: item.lng }}
        title={item.name}
        onClick={() => {
          onSelect(item);
          setIsOpen(true);
        }}
      >
        <Pin
          background={pinConfig.bg}
          borderColor={pinConfig.border}
          glyphColor="#FFFFFF"
          scale={isSelected ? 1.25 : 1.0}
        />
      </AdvancedMarker>

      {isOpen && (
        <InfoWindow
          anchor={marker}
          onCloseClick={() => setIsOpen(false)}
          className="custom-mining-infowindow"
        >
          <div className="p-1 max-w-xs text-slate-900 font-sans">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-xs px-2 py-0.5 rounded font-bold uppercase tracking-wider text-white" style={{ backgroundColor: pinConfig.bg }}>
                {item.category}
              </span>
              {item.status && (
                <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                  {item.status}
                </span>
              )}
            </div>

            <h4 className="font-extrabold text-sm text-slate-900 leading-snug">{item.name}</h4>
            {item.unitCode && <p className="text-xs font-mono font-bold text-indigo-700">Kode Unit: {item.unitCode}</p>}

            <div className="mt-2 text-xs space-y-1 bg-slate-50 p-2 rounded-lg border border-slate-200">
              {item.operator && (
                <div className="flex justify-between text-slate-600">
                  <span>Operator:</span>
                  <strong className="text-slate-800">{item.operator}</strong>
                </div>
              )}
              {item.speedKmh !== undefined && (
                <div className="flex justify-between text-slate-600">
                  <span>Kecepatan GPS:</span>
                  <strong className="text-emerald-700 font-mono">{item.speedKmh} km/jam</strong>
                </div>
              )}
              {item.fuelPercent !== undefined && (
                <div className="flex justify-between text-slate-600">
                  <span>Fuel Level:</span>
                  <strong className="text-amber-700 font-mono">{item.fuelPercent}%</strong>
                </div>
              )}
              {item.elevationM !== undefined && (
                <div className="flex justify-between text-slate-600">
                  <span>Elevasi:</span>
                  <strong className="text-slate-800 font-mono">+{item.elevationM} m DPL</strong>
                </div>
              )}
              {item.niGrade !== undefined && (
                <div className="flex justify-between text-slate-600">
                  <span>Kadar Ni / Fe:</span>
                  <strong className="text-indigo-700 font-mono">{item.niGrade}% Ni • {item.feGrade}% Fe</strong>
                </div>
              )}
            </div>

            <p className="text-[11px] text-slate-600 mt-2 italic leading-tight">
              {item.details}
            </p>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

// Controller component to pan/zoom Google Map dynamically
const MapController: React.FC<{ center: { lat: number; lng: number }; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (map) {
      map.panTo(center);
      map.setZoom(zoom);
    }
  }, [map, center, zoom]);
  return null;
};

interface GoogleMiningMapProps {
  height?: string;
  selectedSiteId?: string;
  equipmentList?: HeavyEquipment[];
  language?: Language;
  onSelectEquipment?: (equipment: HeavyEquipment) => void;
}

export const GoogleMiningMap: React.FC<GoogleMiningMapProps> = ({
  height = '580px',
  selectedSiteId = 'site-morowali',
  equipmentList = [],
  language = 'id',
  onSelectEquipment
}) => {
  const { config } = useDevConfig();

  // Pick effective API key
  const configuredKey = ENV_KEY || config?.apiKeys?.googleMapsApiKey || '';
  const hasValidKey = isActualGoogleApiKey(configuredKey);

  // Map state
  const [mapLoadError, setMapLoadError] = useState(false);
  const [currentSiteId, setCurrentSiteId] = useState(selectedSiteId);
  const [mapType, setMapType] = useState<'hybrid' | 'satellite' | 'roadmap' | 'terrain'>('hybrid');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'ALL' | 'fleet' | 'pit' | 'stockpile' | 'jetty' | 'weighbridge'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<MiningMapLocation | null>(null);
  const [isSimulatingLiveGps, setIsSimulatingLiveGps] = useState(true);
  const [gpsSimTick, setGpsSimTick] = useState(0);
  const [showConfigHelp, setShowConfigHelp] = useState(false);

  // Interactive GIS Simulator canvas pan & zoom states
  const [simZoom, setSimZoom] = useState(1);
  const [simPan, setSimPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Global auth failure interceptor
  useEffect(() => {
    const handleAuthFailure = () => {
      console.warn('Google Maps Authentication failed or API key was invalid. Falling back to High-Precision Mining GIS Engine.');
      setMapLoadError(true);
    };
    (window as any).gm_authFailure = handleAuthFailure;
    return () => {
      if ((window as any).gm_authFailure === handleAuthFailure) {
        delete (window as any).gm_authFailure;
      }
    };
  }, []);

  const activeSite = useMemo(() => {
    return MINING_CONCESSION_SITES.find(s => s.id === currentSiteId) || MINING_CONCESSION_SITES[0];
  }, [currentSiteId]);

  // Live GPS Movement Simulation for Dump Trucks & Excavators
  useEffect(() => {
    if (!isSimulatingLiveGps) return;
    const interval = setInterval(() => {
      setGpsSimTick(t => t + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [isSimulatingLiveGps]);

  // Dynamic Locations on Selected Mining Site
  const miningLocations: MiningMapLocation[] = useMemo(() => {
    const baseLat = activeSite.center.lat;
    const baseLng = activeSite.center.lng;

    // Static Mining Infrastructure
    const infrastructure: MiningMapLocation[] = [
      {
        id: 'pit-alpha',
        name: 'Pit Alpha - High Grade Saprolite',
        category: 'pit',
        lat: baseLat + 0.0082,
        lng: baseLng - 0.0064,
        elevationM: 285,
        status: 'OPERATIONAL',
        niGrade: 1.88,
        feGrade: 19.4,
        details: 'Stripping Ratio 1:2.4. Aktif loading 4 Excavator PC2000.'
      },
      {
        id: 'pit-bravo',
        name: 'Pit Bravo - Limonite Concession',
        category: 'pit',
        lat: baseLat - 0.0094,
        lng: baseLng - 0.0088,
        elevationM: 210,
        status: 'OPERATIONAL',
        niGrade: 1.35,
        feGrade: 44.2,
        details: 'Suplai smelter HPAL. Overburden removal berjalan normal.'
      },
      {
        id: 'stockpile-efo-01',
        name: 'Stockpile EFO 01 (Export Final Ore)',
        category: 'stockpile',
        lat: baseLat + 0.0035,
        lng: baseLng + 0.0052,
        elevationM: 45,
        status: 'READY_TO_SHIP',
        tonnage: 48500,
        niGrade: 1.82,
        feGrade: 21.0,
        details: 'Ore blending siap muat ke tongkang. Moisture Content 31.5%.'
      },
      {
        id: 'stockpile-eto-central',
        name: 'Stockpile ETO Central Transit',
        category: 'stockpile',
        lat: baseLat - 0.0022,
        lng: baseLng + 0.0018,
        elevationM: 88,
        status: 'BLENDING_IN_PROGRESS',
        tonnage: 62000,
        niGrade: 1.65,
        feGrade: 24.5,
        details: 'Pencampuran ore kadar sedang dengan Saprolite High Grade.'
      },
      {
        id: 'jetty-terminal-pier-1',
        name: 'Jetty Port Terminal Pier 1 (Barge Loading)',
        category: 'jetty',
        lat: baseLat - 0.0048,
        lng: baseLng + 0.0125,
        elevationM: 8,
        status: 'LOADING_ACTIVE',
        details: 'Tongkang BG. Robby 3012 loading 10,000 MT tujuan Smelter Morowali.'
      },
      {
        id: 'weighbridge-gate-01',
        name: 'Jembatan Timbang Jembatan 01 (Inbound/Outbound)',
        category: 'weighbridge',
        lat: baseLat - 0.0015,
        lng: baseLng + 0.0075,
        elevationM: 32,
        status: 'ACTIVE_RFID',
        details: 'Sistem RFID & E-Surat Jalan otomatis. Kapasitas timbang 80 Ton.'
      },
      {
        id: 'workshop-central',
        name: 'Central Heavy Workshop & Fuel Station',
        category: 'workshop',
        lat: baseLat + 0.0020,
        lng: baseLng + 0.0025,
        elevationM: 65,
        status: '24_HOURS',
        details: 'Stock Solar B35 150,000 Liter & Unit Maintenance Bay.'
      }
    ];

    // Mobile GPS Fleet with dynamic live coordinates jitter
    const jitter = Math.sin(gpsSimTick * 0.8) * 0.0012;
    const jitterCos = Math.cos(gpsSimTick * 0.8) * 0.0015;

    const fleetMarkers: MiningMapLocation[] = [
      {
        id: 'fleet-exc-201',
        name: 'Excavator Komatsu PC2000-8 #201',
        unitCode: 'EXC-201',
        category: 'fleet',
        lat: baseLat + 0.0080 + (jitter * 0.2),
        lng: baseLng - 0.0062 + (jitterCos * 0.2),
        operator: 'Hendra Saputra',
        speedKmh: 0,
        fuelPercent: 78,
        status: 'OPERATIONAL',
        details: 'Sedang memuat Saprolite ke Dump Truck DT-801 di Pit Alpha.'
      },
      {
        id: 'fleet-dt-801',
        name: 'Dump Truck Scania P460 #801',
        unitCode: 'DT-801',
        category: 'fleet',
        lat: baseLat + 0.0025 + jitter,
        lng: baseLng - 0.0010 + jitterCos,
        operator: 'Agus Wardana',
        speedKmh: 28,
        fuelPercent: 64,
        status: 'OPERATIONAL',
        details: 'Hauling Ore dari Pit Alpha ➔ Stockpile EFO 01 (Muatan 42 MT).'
      },
      {
        id: 'fleet-dt-802',
        name: 'Dump Truck Volvo FMX 440 #802',
        unitCode: 'DT-802',
        category: 'fleet',
        lat: baseLat - 0.0065 - jitter,
        lng: baseLng - 0.0035 - jitterCos,
        operator: 'Rudi Hartono',
        speedKmh: 34,
        fuelPercent: 52,
        status: 'OPERATIONAL',
        details: 'Kembali kosongan (empty return) dari Jetty ➔ Pit Bravo.'
      },
      {
        id: 'fleet-dt-803',
        name: 'Dump Truck Mercedes Arocs 4845 #803',
        unitCode: 'DT-803',
        category: 'fleet',
        lat: baseLat - 0.0030 + (jitter * 0.7),
        lng: baseLng + 0.0080 + (jitterCos * 0.7),
        operator: 'Bambang Tri',
        speedKmh: 18,
        fuelPercent: 88,
        status: 'OPERATIONAL',
        details: 'Mendekati Jembatan Timbang Jetty Outbound (Muatan 45 MT).'
      },
      {
        id: 'fleet-grd-101',
        name: 'Motor Grader Cat 16M #101',
        unitCode: 'GRD-101',
        category: 'fleet',
        lat: baseLat + 0.0010 + (jitter * 0.3),
        lng: baseLng + 0.0040 + (jitterCos * 0.3),
        operator: 'Wahyu Nugroho',
        speedKmh: 8,
        fuelPercent: 71,
        status: 'OPERATIONAL',
        details: 'Perataan & pemeliharaan jalan Hauling Road KM 08.'
      },
      {
        id: 'fleet-exc-202',
        name: 'Excavator Hitachi EX1200 #202',
        unitCode: 'EXC-202',
        category: 'fleet',
        lat: baseLat + 0.0022,
        lng: baseLng + 0.0026,
        operator: 'Teknisi Workshop',
        speedKmh: 0,
        fuelPercent: 40,
        status: 'MAINTENANCE',
        details: 'Penggantian oli hidrolik & filter udara berkala 500 jam.'
      }
    ];

    return [...infrastructure, ...fleetMarkers];
  }, [activeSite, gpsSimTick]);

  // Filtered Locations
  const filteredLocations = useMemo(() => {
    return miningLocations.filter(loc => {
      const matchCat = activeCategoryFilter === 'ALL' || loc.category === activeCategoryFilter;
      const matchQuery = !searchQuery || 
        loc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        loc.unitCode?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.details?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [miningLocations, activeCategoryFilter, searchQuery]);

  // Handle Mouse Drag on Vector Canvas
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - simPan.x, y: e.clientY - simPan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setSimPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetSimulatorView = () => {
    setSimZoom(1);
    setSimPan({ x: 0, y: 0 });
    setSelectedLocation(null);
  };

  // Convert GPS Coordinates to Relative SVG Simulator Percentages
  const getCanvasCoords = (lat: number, lng: number) => {
    const baseLat = activeSite.center.lat;
    const baseLng = activeSite.center.lng;
    const latSpan = 0.026;
    const lngSpan = 0.032;

    const x = ((lng - (baseLng - lngSpan / 2)) / lngSpan) * 100;
    const y = (((baseLat + latSpan / 2) - lat) / latSpan) * 100;

    return {
      x: Math.max(8, Math.min(92, x)),
      y: Math.max(10, Math.min(90, y))
    };
  };

  const shouldUseGoogleMapsSdk = hasValidKey && !mapLoadError;

  return (
    <div id="google-mining-map-container" className="rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
      {/* Top Map Control Bar */}
      <div className="p-3 sm:p-4 bg-slate-950/90 border-b border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Concession Site Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 pr-2 border-r border-slate-800">
            <span className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Globe className="w-4 h-4" />
            </span>
            <div>
              <div className="text-[10px] uppercase tracking-wider font-extrabold text-indigo-400">Peta GIS Satelit Konsesi</div>
              <div className="text-xs font-bold text-slate-200">{activeSite.name}</div>
            </div>
          </div>

          <div className="flex items-center gap-1 overflow-x-auto py-1">
            {MINING_CONCESSION_SITES.map(s => (
              <button
                key={s.id}
                onClick={() => {
                  setCurrentSiteId(s.id);
                  resetSimulatorView();
                }}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  currentSiteId === s.id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {s.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Category Filter Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Cari Unit / Pit / Stockpile..."
              className="bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1 text-slate-200 text-xs focus:outline-none focus:border-indigo-500 w-36 sm:w-48"
            />
          </div>

          {/* Map Type Toggle */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-[11px] font-bold">
            <button
              onClick={() => setMapType('hybrid')}
              className={`px-2 py-1 rounded ${mapType === 'hybrid' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
              title="Citra Satelit Hybrid"
            >
              Satelit
            </button>
            <button
              onClick={() => setMapType('terrain')}
              className={`px-2 py-1 rounded ${mapType === 'terrain' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
              title="Peta Topografi & Kontur"
            >
              Topografi
            </button>
            <button
              onClick={() => setMapType('roadmap')}
              className={`px-2 py-1 rounded ${mapType === 'roadmap' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
              title="Peta Jalan"
            >
              Roadmap
            </button>
          </div>

          {/* Live GPS Telemetry Pulse Toggle */}
          <button
            onClick={() => setIsSimulatingLiveGps(!isSimulatingLiveGps)}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition-all ${
              isSimulatingLiveGps 
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' 
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title="Toggle Live GPS Telemetry Stream"
          >
            <Radio className={`w-3.5 h-3.5 ${isSimulatingLiveGps ? 'animate-pulse text-emerald-400' : ''}`} />
            <span className="hidden sm:inline">{isSimulatingLiveGps ? 'Live GPS Online' : 'GPS Paused'}</span>
          </button>

          {/* API Key Status / Setup Toggle */}
          <button
            onClick={() => setShowConfigHelp(!showConfigHelp)}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition-all ${
              shouldUseGoogleMapsSdk
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/20'
            }`}
            title="Pengaturan Google Maps Platform API Key"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{shouldUseGoogleMapsSdk ? 'Google SDK Aktif' : 'Konfigurasi Google Maps'}</span>
            {showConfigHelp ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Collapsible API Key Help Drawer */}
      {showConfigHelp && (
        <div className="bg-slate-950 p-4 border-b border-slate-800 text-xs text-slate-300 animate-in fade-in space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <strong className="text-slate-100 flex items-center gap-2 font-bold">
              <KeyRound className="w-4 h-4 text-amber-400" />
              Panduan Google Maps Platform Integration
            </strong>
            <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">
              SDK: @vis.gl/react-google-maps v1.9
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="font-bold text-slate-100 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">1</span>
                Status Engine GIS
              </div>
              <p className="text-slate-400 text-[11px]">
                {shouldUseGoogleMapsSdk ? (
                  <span className="text-emerald-400 font-semibold">✓ Citra Satelit Google Maps Platform terhubung aktif.</span>
                ) : (
                  <span className="text-amber-400 font-semibold">⚡ Engine Spatial Vector & Satellite Simulator aktif (Offline & Zero-Error Ready).</span>
                )}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="font-bold text-slate-100 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">2</span>
                Pasang API Key Cloud
              </div>
              <p className="text-slate-400 text-[11px]">
                Tambahkan secret <code className="text-amber-300 font-mono">GOOGLE_MAPS_PLATFORM_KEY</code> di Settings atau masukkan via <strong>Developer Control Panel & CRM</strong>.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="font-bold text-slate-100 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">3</span>
                API Diperlukan
              </div>
              <p className="text-slate-400 text-[11px]">
                Pastikan <strong>Maps JavaScript API</strong> aktif di Google Cloud Console project Anda.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Category Filter Badges */}
      <div className="px-4 py-2 bg-slate-950/60 border-b border-slate-800/80 flex items-center justify-between gap-2 text-xs overflow-x-auto">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-bold text-slate-400 uppercase mr-1">Layer:</span>
          {(
            [
              { id: 'ALL', label: 'Semua Objek', count: miningLocations.length },
              { id: 'fleet', label: '🚚 Armada GPS', count: miningLocations.filter(l => l.category === 'fleet').length },
              { id: 'pit', label: '⛏️ Pit Tambang', count: miningLocations.filter(l => l.category === 'pit').length },
              { id: 'stockpile', label: '⛰️ Stockpile ETO/EFO', count: miningLocations.filter(l => l.category === 'stockpile').length },
              { id: 'jetty', label: '⚓ Jetty & Port', count: miningLocations.filter(l => l.category === 'jetty').length },
              { id: 'weighbridge', label: '⚖️ Jembatan Timbang', count: miningLocations.filter(l => l.category === 'weighbridge').length }
            ] as const
          ).map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveCategoryFilter(filter.id)}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategoryFilter === filter.id
                  ? 'bg-indigo-500/30 text-indigo-200 border border-indigo-500/50 font-bold'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {filter.label} <span className="opacity-60 text-[10px]">({filter.count})</span>
            </button>
          ))}
        </div>

        <div className="text-[11px] text-slate-400 font-mono hidden md:block">
          {activeSite.iup}
        </div>
      </div>

      {/* Map Viewport Container */}
      <div className="w-full relative overflow-hidden select-none" style={{ height }}>
        {shouldUseGoogleMapsSdk ? (
          /* Real Google Maps Platform JavaScript SDK Viewport */
          <APIProvider 
            apiKey={configuredKey} 
            version="weekly"
            onLoad={() => setMapLoadError(false)}
            onError={() => {
              console.warn('Google Maps APIProvider error encountered.');
              setMapLoadError(true);
            }}
          >
            <Map
              defaultCenter={activeSite.center}
              defaultZoom={activeSite.zoom}
              mapTypeId={mapType}
              mapId="NICKEL_MINING_MAP_ID"
              internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
              style={{ width: '100%', height: '100%' }}
              gestureHandling="greedy"
              disableDefaultUI={false}
            >
              <MapController center={activeSite.center} zoom={activeSite.zoom} />

              {/* Render Advanced Markers */}
              {filteredLocations.map(loc => (
                <InteractiveMiningMarker
                  key={loc.id}
                  item={loc}
                  isSelected={selectedLocation?.id === loc.id}
                  onSelect={(item) => setSelectedLocation(item)}
                />
              ))}
            </Map>
          </APIProvider>
        ) : (
          /* High-Precision Interactive Mining Vector & Satellite GIS Simulator */
          <div 
            className="w-full h-full relative cursor-grab active:cursor-grabbing bg-slate-950 overflow-hidden"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Background Texture & Contour Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:64px_64px] opacity-30" />
            
            {/* Topography Altitude Gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950/40 via-slate-950/60 to-cyan-950/40 pointer-events-none" />

            {/* Transformable Canvas Layer */}
            <div 
              className="absolute inset-0 w-full h-full transition-transform duration-75"
              style={{
                transform: `translate(${simPan.x}px, ${simPan.y}px) scale(${simZoom})`,
                transformOrigin: 'center center'
              }}
            >
              {/* SVG Mining Spatial Infrastructure (Polygons, Roads, Pit benches) */}
              <svg className="absolute inset-0 w-full h-full overflow-visible">
                {/* Concession Boundary Polygon */}
                <polygon
                  points="8,10 92,8 90,88 12,92"
                  fill="rgba(16, 185, 129, 0.04)"
                  stroke="#10b981"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                />

                {/* Pit Alpha Excavation Polygon */}
                <polygon
                  points="18,18 42,15 48,38 22,42"
                  fill="rgba(139, 92, 246, 0.15)"
                  stroke="#8b5cf6"
                  strokeWidth="2"
                  className="hover:fill-purple-500/30 transition-all cursor-pointer"
                  onClick={() => setSelectedLocation(miningLocations.find(l => l.id === 'pit-alpha') || null)}
                />
                <text x="24" y="24" fill="#c084fc" fontSize="3" fontFamily="monospace" fontWeight="bold">
                  ⛏️ PIT ALPHA BENCH +285M
                </text>

                {/* Pit Bravo Excavation Polygon */}
                <polygon
                  points="16,60 38,56 44,82 20,86"
                  fill="rgba(245, 158, 11, 0.15)"
                  stroke="#f59e0b"
                  strokeWidth="2"
                  className="hover:fill-amber-500/30 transition-all cursor-pointer"
                  onClick={() => setSelectedLocation(miningLocations.find(l => l.id === 'pit-bravo') || null)}
                />
                <text x="20" y="66" fill="#fde047" fontSize="3" fontFamily="monospace" fontWeight="bold">
                  ⛏️ PIT BRAVO BENCH +210M
                </text>

                {/* Stockpile EFO Polygon */}
                <rect
                  x="60"
                  y="26"
                  width="18"
                  height="16"
                  rx="2"
                  fill="rgba(234, 179, 8, 0.18)"
                  stroke="#eab308"
                  strokeWidth="2"
                  className="hover:fill-yellow-500/30 transition-all cursor-pointer"
                  onClick={() => setSelectedLocation(miningLocations.find(l => l.id === 'stockpile-efo-01') || null)}
                />
                <text x="61" y="32" fill="#fef08a" fontSize="2.8" fontFamily="monospace" fontWeight="bold">
                  ⛰️ STOCKPILE EFO
                </text>

                {/* Jetty Port & Pier Docks */}
                <rect
                  x="78"
                  y="62"
                  width="16"
                  height="22"
                  rx="2"
                  fill="rgba(6, 182, 212, 0.20)"
                  stroke="#06b6d4"
                  strokeWidth="2"
                  className="hover:fill-cyan-500/30 transition-all cursor-pointer"
                  onClick={() => setSelectedLocation(miningLocations.find(l => l.id === 'jetty-terminal-pier-1') || null)}
                />
                <text x="79" y="68" fill="#a5f3fc" fontSize="2.8" fontFamily="monospace" fontWeight="bold">
                  ⚓ JETTY PIER 1 & 2
                </text>

                {/* Main Hauling Road Corridor Polyline */}
                <path
                  d="M 30 28 Q 50 40 55 52 T 70 34 T 84 72"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3.5"
                  strokeDasharray="4 2"
                  className="opacity-70 animate-pulse"
                />
                <path
                  d="M 30 28 Q 50 40 55 52 T 70 34 T 84 72"
                  fill="none"
                  stroke="#60a5fa"
                  strokeWidth="1.5"
                />
              </svg>

              {/* Interactive Point Markers */}
              {filteredLocations.map(loc => {
                const coords = getCanvasCoords(loc.lat, loc.lng);
                const isSelected = selectedLocation?.id === loc.id;
                const isFleet = loc.category === 'fleet';

                return (
                  <div
                    key={loc.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedLocation(loc);
                    }}
                    style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 z-20 group ${
                      isSelected ? 'scale-125 z-30' : 'hover:scale-115'
                    }`}
                  >
                    {/* Marker Pin Badge */}
                    <div className={`px-2.5 py-1 rounded-xl shadow-2xl border flex items-center gap-1.5 text-xs font-bold backdrop-blur-md ${
                      isSelected 
                        ? 'bg-indigo-600 border-white text-white shadow-indigo-500/50 ring-4 ring-indigo-500/30'
                        : isFleet
                        ? loc.status === 'OPERATIONAL'
                          ? 'bg-emerald-950/90 border-emerald-500 text-emerald-300 shadow-emerald-950/50'
                          : 'bg-amber-950/90 border-amber-500 text-amber-300'
                        : loc.category === 'pit'
                        ? 'bg-purple-950/90 border-purple-500 text-purple-200'
                        : loc.category === 'stockpile'
                        ? 'bg-amber-950/90 border-amber-500 text-amber-200'
                        : loc.category === 'jetty'
                        ? 'bg-cyan-950/90 border-cyan-500 text-cyan-200'
                        : 'bg-slate-900/90 border-slate-700 text-slate-200'
                    }`}>
                      {isFleet ? (
                        <Truck className={`w-3.5 h-3.5 ${(loc.speedKmh || 0) > 0 ? 'text-emerald-400 animate-bounce' : ''}`} />
                      ) : loc.category === 'pit' ? (
                        <Pickaxe className="w-3.5 h-3.5 text-purple-400" />
                      ) : loc.category === 'jetty' ? (
                        <Anchor className="w-3.5 h-3.5 text-cyan-400" />
                      ) : loc.category === 'stockpile' ? (
                        <Layers className="w-3.5 h-3.5 text-amber-400" />
                      ) : (
                        <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                      )}

                      <span className="font-mono text-[11px]">
                        {loc.unitCode || loc.name.split(' ')[0]}
                      </span>

                      {isFleet && (loc.speedKmh || 0) > 0 && (
                        <span className="px-1 py-0.2 rounded bg-emerald-500 text-slate-950 text-[9px] font-mono font-extrabold">
                          {loc.speedKmh}k
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Canvas Pan & Zoom Interactive HUD Controls */}
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 bg-slate-950/90 p-1.5 rounded-xl border border-slate-800 shadow-xl backdrop-blur-md">
              <button
                onClick={() => setSimZoom(z => Math.min(2.5, z + 0.25))}
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs transition-all"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setSimZoom(z => Math.max(0.75, z - 0.25))}
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs transition-all"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={resetSimulatorView}
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-indigo-400 text-xs transition-all"
                title="Center / Reset View"
              >
                <Crosshair className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Floating Mini Telemetry HUD Overlay (Top Right) */}
        <div className="absolute top-3 right-3 z-10 bg-slate-950/85 backdrop-blur-md border border-slate-800 rounded-xl p-3 shadow-xl max-w-xs hidden sm:block">
          <div className="flex items-center justify-between text-xs font-bold text-slate-200 mb-2 border-b border-slate-800 pb-1">
            <span className="flex items-center gap-1.5 text-indigo-400">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              GIS Telemetry Status
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="bg-slate-900/90 p-2 rounded border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Aktif Di Peta:</span>
              <strong className="text-slate-100 font-mono text-xs">{filteredLocations.length} Objek</strong>
            </div>
            <div className="bg-slate-900/90 p-2 rounded border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Armada Bergerak:</span>
              <strong className="text-emerald-400 font-mono text-xs">
                {miningLocations.filter(l => l.category === 'fleet' && (l.speedKmh || 0) > 0).length} Unit
              </strong>
            </div>
          </div>
          <div className="mt-2 text-[10px] text-slate-400 flex items-center justify-between">
            <span>Koordinat Center:</span>
            <span className="font-mono text-slate-300">{activeSite.center.lat.toFixed(4)}, {activeSite.center.lng.toFixed(4)}</span>
          </div>
        </div>

        {/* Floating Bottom Quick Selection Card (When a marker is tapped) */}
        {selectedLocation && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-20 sm:max-w-md bg-slate-950/95 backdrop-blur-md border border-indigo-500/40 rounded-2xl p-4 shadow-2xl animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/20 px-2 py-0.5 rounded border border-indigo-500/30">
                  {selectedLocation.category}
                </span>
                <h4 className="font-extrabold text-sm text-slate-100 mt-1">{selectedLocation.name}</h4>
                {selectedLocation.unitCode && (
                  <p className="text-xs font-mono font-bold text-emerald-400">ID Unit: {selectedLocation.unitCode}</p>
                )}
              </div>
              <button
                onClick={() => setSelectedLocation(null)}
                className="text-slate-400 hover:text-white text-xs p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300 mt-2 bg-slate-900/90 p-2 rounded-lg border border-slate-800">
              {selectedLocation.details}
            </p>

            <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-slate-800">
              <span className="text-[11px] text-slate-400 font-mono">
                GPS: {selectedLocation.lat.toFixed(5)}, {selectedLocation.lng.toFixed(5)}
              </span>
              {selectedLocation.category === 'fleet' && (
                <button
                  onClick={() => {
                    const matchedEq = equipmentList.find(e => e.code === selectedLocation.unitCode);
                    if (matchedEq && onSelectEquipment) {
                      onSelectEquipment(matchedEq);
                    }
                  }}
                  className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] transition-all"
                >
                  Detail Telemetri Unit
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Concession Info & Legend */}
      <div className="p-3 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-bold text-slate-300 flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-indigo-400" />
            Legenda Peta:
          </span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Armada Normal</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Workshop / Maint</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Pit Tambang</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-600" /> Stockpile Ore</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Jetty Pelabuhan</span>
        </div>

        <div className="text-[11px] text-slate-500 font-mono">
          Google Maps Platform • Multi-Site Geodesi WGS84 • UTM Zone 51S
        </div>
      </div>
    </div>
  );
};
