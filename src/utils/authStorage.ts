import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  private namespace: string;

  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  private getKey(): string {
    return `${this.namespace}:accessToken`;
  }

  async getAccessToken(): Promise<string | null> {
    return AsyncStorage.getItem(this.getKey());
  }

  async setAccessToken(accessToken: string): Promise<void> {
    await AsyncStorage.setItem(this.getKey(), accessToken);
  }

  async removeAccessToken(): Promise<void> {
    await AsyncStorage.removeItem(this.getKey());
  }
}

export default AuthStorage;
