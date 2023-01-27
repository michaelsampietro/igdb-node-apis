import NodeCache from "node-cache";

class CacheUtil {
  private cache: NodeCache;

  constructor() {
    this.cache = new NodeCache();
  }

  public get(key: string): any {
    return this.cache.get(key);
  }

  public set(key: string, value: any, ttl: number): boolean {
    return this.cache.set(key, value, ttl);
  }

  public del(keys: string | string[]): number {
    return this.cache.del(keys);
  }

  public flush(): void {
    this.cache.flushAll();
  }
}

export default new CacheUtil()