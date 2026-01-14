/**
 * Global video cache manager for optimizing video preloading
 * Prevents re-downloading videos and ensures smooth playback
 */

interface CachedVideo {
  videoElement: HTMLVideoElement;
  isReady: boolean;
  loadPromise: Promise<void>;
}

class VideoCache {
  private cache: Map<string, CachedVideo> = new Map();
  private preloadQueue: Set<string> = new Set();

  /**
   * Preload a video and cache it
   */
  async preload(videoUrl: string): Promise<HTMLVideoElement> {
    // Return cached video if exists and ready
    const cached = this.cache.get(videoUrl);
    if (cached) {
      await cached.loadPromise;
      return cached.videoElement;
    }

    // Check if already in preload queue
    if (this.preloadQueue.has(videoUrl)) {
      // Wait for the existing preload to complete
      const existing = this.cache.get(videoUrl);
      if (existing) {
        await existing.loadPromise;
        return existing.videoElement;
      }
    }

    // Add to preload queue
    this.preloadQueue.add(videoUrl);

    // Create new video element
    const video = document.createElement("video");
    video.src = videoUrl;
    video.preload = "auto";
    video.muted = true;
    video.playsInline = true;
    video.crossOrigin = "anonymous";

    // Create load promise
    const loadPromise = new Promise<void>((resolve, reject) => {
      const onCanPlayThrough = () => {
        cleanup();
        const cached = this.cache.get(videoUrl);
        if (cached) {
          cached.isReady = true;
        }
        this.preloadQueue.delete(videoUrl);
        resolve();
      };

      const onError = (e: Event) => {
        cleanup();
        this.preloadQueue.delete(videoUrl);
        console.error("Video preload failed:", videoUrl, e);
        reject(new Error(`Failed to preload video: ${videoUrl}`));
      };

      const cleanup = () => {
        video.removeEventListener("canplaythrough", onCanPlayThrough);
        video.removeEventListener("error", onError);
      };

      video.addEventListener("canplaythrough", onCanPlayThrough, { once: true });
      video.addEventListener("error", onError, { once: true });

      // Set timeout to prevent hanging
      setTimeout(() => {
        if (!this.cache.get(videoUrl)?.isReady) {
          cleanup();
          this.preloadQueue.delete(videoUrl);
          // Still resolve but mark as timeout
          console.warn("Video preload timeout:", videoUrl);
          resolve();
        }
      }, 10000); // 10 second timeout
    });

    // Cache the video
    this.cache.set(videoUrl, {
      videoElement: video,
      isReady: false,
      loadPromise,
    });

    // Start loading
    video.load();

    return video;
  }

  /**
   * Get cached video if exists
   */
  get(videoUrl: string): HTMLVideoElement | null {
    const cached = this.cache.get(videoUrl);
    return cached?.isReady ? cached.videoElement : null;
  }

  /**
   * Check if video is in cache and ready
   */
  isReady(videoUrl: string): boolean {
    const cached = this.cache.get(videoUrl);
    return cached?.isReady || false;
  }

  /**
   * Check if video is currently loading
   */
  isLoading(videoUrl: string): boolean {
    return this.preloadQueue.has(videoUrl);
  }

  /**
   * Clear cache for a specific video
   */
  clear(videoUrl: string): void {
    const cached = this.cache.get(videoUrl);
    if (cached) {
      cached.videoElement.src = "";
      this.cache.delete(videoUrl);
    }
    this.preloadQueue.delete(videoUrl);
  }

  /**
   * Clear all cache
   */
  clearAll(): void {
    this.cache.forEach((cached) => {
      cached.videoElement.src = "";
    });
    this.cache.clear();
    this.preloadQueue.clear();
  }

  /**
   * Get cache size
   */
  getSize(): number {
    return this.cache.size;
  }

  /**
   * Get cache info for debugging
   */
  getCacheInfo(): { url: string; isReady: boolean; isLoading: boolean }[] {
    return Array.from(this.cache.entries()).map(([url, cached]) => ({
      url,
      isReady: cached.isReady,
      isLoading: this.preloadQueue.has(url),
    }));
  }
}

// Export singleton instance
export const videoCache = new VideoCache();
