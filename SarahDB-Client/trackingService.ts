// lib/trackingService.ts
import { dbORM } from './db';

class TrackingService {
  private intervalId: NodeJS.Timeout | null = null;
  private userId: string | null = null;

  startTracking(userId: string) {
    this.userId = userId;
    this.intervalId = setInterval(this.updateLocation.bind(this), 60000); // Update every minute
  }

  stopTracking() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.userId = null;
  }

  private async updateLocation() {
    if (!this.userId) return;

    try {
      // Get current location
      const position = await this.getCurrentPosition();

      // Update all devices for this user
      const devices = await dbORM.findAll('DeviceSKPT', 'userId', this.userId);
      for (const device of devices) {
        await dbORM.updateEntry('DeviceSKPT', 'id', {
          id: device.id,
          lastSeen: new Date().toISOString(),
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }, true);
      }
    } catch (error) {
      console.error('Error updating location:', error);
    }
  }

  private getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser.'));
      } else {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      }
    });
  }
}

export const trackingService = new TrackingService();