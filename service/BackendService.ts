interface HTTPInstance {
  get<T>(
    url: string,
    config?: RequestInit,
  ): Promise<T>;
  delete<T>(
    url: string,
    config?: RequestInit,
  ): Promise<T>;
  head<T>(
    url: string,
    config?: RequestInit,
  ): Promise<T>;
  options<T>(
    url: string,
    config?: RequestInit,
  ): Promise<T>;
  post<T>(
    url: string,
    data?: unknown,
    config?: RequestInit,
  ): Promise<T>;
  put<T>(
    url: string,
    data?: unknown,
    config?: RequestInit,
  ): Promise<T>;
  patch<T>(
    url: string,
    data?: unknown,
    config?: RequestInit,
  ): Promise<T>;
}

class BackendService {
  static _instance: BackendService;

  public http: HTTPInstance;
  private readonly headers: Record<string, string>;

  constructor() {
    console.log("@@ BackendService constructor");

    this.headers = {
      csrf: 'token',
      // Referer: this.baseURL,
    };

    this.http = {
      get: this.get.bind(this),
      delete: this.delete.bind(this),
      head: this.head.bind(this),
      options: this.options.bind(this),
      post: this.post.bind(this),
      put: this.put.bind(this),
      patch: this.patch.bind(this),
    };
  }

  static instance(): BackendService {
    if (!BackendService._instance) {
      BackendService._instance = new BackendService();
    }

    return BackendService._instance;
  }

  public async request<T = unknown>(
    method: string,
    url: string,
    data?: unknown,
    config?: RequestInit,
  ): Promise<T> {
    try {
      const response = await fetch(url, {
        method,
        headers: {
          ...this.headers,
          'Content-Type': 'application/json',
          ...config?.headers,
        },
        // credentials: 'include', // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#including_credentials
        body: data ? JSON.stringify(data) : undefined,
        ...config,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  private get<T>(
    url: string,
    config?: RequestInit,
  ): Promise<T> {
    return this.request<T>('GET', url, undefined, config);
  }

  private delete<T>(
    url: string,
    config?: RequestInit,
  ): Promise<T> {
    return this.request<T>('DELETE', url, undefined, config);
  }

  private head<T>(
    url: string,
    config?: RequestInit,
  ): Promise<T> {
    return this.request<T>('HEAD', url, undefined, config);
  }

  private options<T>(
    url: string,
    config?: RequestInit,
  ): Promise<T> {
    return this.request<T>('OPTIONS', url, undefined, config);
  }

  private post<T>(
    url: string,
    data?: unknown,
    config?: RequestInit,
  ): Promise<T> {
    return this.request<T>('POST', url, data, config);
  }

  private put<T>(
    url: string,
    data?: unknown,
    config?: RequestInit,
  ): Promise<T> {
    return this.request<T>('PUT', url, data, config);
  }

  private patch<T>(
    url: string,
    data?: unknown,
    config?: RequestInit,
  ): Promise<T> {
    return this.request<T>('PATCH', url, data, config);
  }
}

export default BackendService.instance(); // todo ymkim // export default new BackendService() ?