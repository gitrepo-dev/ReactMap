import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Pin } from '../types/pin';
import L from 'leaflet';

interface PinContextType {
  pins: Pin[];
  addPin: (pin: Pin) => void;
  removePin: (id: string) => void;
  updatePin: (id: string, updated: Partial<Pin>) => void;
  markerRefs: React.MutableRefObject<{ [key: string]: L.Marker | null }>;
}

const PinContext = createContext<PinContextType | undefined>(undefined);

export const PinProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pins, setPins] = useState<Pin[]>(() => {
    const stored = localStorage.getItem('pins');
    return stored ? JSON.parse(stored) : [];
  });

  const markerRefs = useRef<{ [key: string]: L.Marker | null }>({});

  useEffect(() => {
    localStorage.setItem('pins', JSON.stringify(pins));
  }, [pins]);

  const addPin = (pin: Pin) => setPins([...pins, pin]);
  const removePin = (id: string) => setPins(pins.filter((p) => p.id !== id));
  const updatePin = (id: string, updated: Partial<Pin>) =>
    setPins(pins.map((p) => (p.id === id ? { ...p, ...updated } : p)));

  return (
    <PinContext.Provider value={{ pins, addPin, removePin, updatePin, markerRefs }}>
      {children}
    </PinContext.Provider>
  );
};

export const usePins = () => {
  const context = useContext(PinContext);
  if (!context) throw new Error('usePins must be used within PinProvider');
  return context;
};
