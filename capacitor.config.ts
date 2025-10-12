import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.5192ec24c02745b7bc9e25a155020c30',
  appName: 'impact-tagger',
  webDir: 'dist',
  server: {
    url: 'https://5192ec24-c027-45b7-bc9e-25a155020c30.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    BarcodeScannerScanner: {
      cameraDirection: 'back'
    }
  }
};

export default config;
