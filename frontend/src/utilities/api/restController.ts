type FetchOptions = {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: Record<string, string>;
    body?: string;
};

class RestController {
    private baseUrl!: URL;
    private static instance: RestController;

    private constructor() {
        if (RestController.instance) {
            return RestController.instance;
        } else {
            const isProduction = import.meta.env.PROD;
            this.baseUrl = isProduction ? import.meta.env.VITE_BACKEND_URL : 'http://localhost:3000';

            RestController.instance = this;
        }
    }

    public static getInstance() {
        if (!RestController.instance) {
            RestController.instance = new RestController();
        }
        return RestController.instance;
    }

    private async fetch<T>(endpoint: URL, options: FetchOptions): Promise<T> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, options);
        return response.json();
    }

    public async get<T>(endpoint: URL): Promise<T> {
        return this.fetch<T>(endpoint, { method: 'GET' });
    }
    
    public async post<T>(endpoint: URL, data: unknown): Promise<T> {
        return this.fetch<T>(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
    }
    
    public async put<T>(endpoint: URL, data: unknown): Promise<T> {
        return this.fetch<T>(endpoint, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
    }
    
    public async delete<T>(endpoint: URL): Promise<T> {
        return this.fetch<T>(endpoint, { method: 'DELETE' });
    }
}

export default RestController;

// Usage
// const restController = RestController.getInstance();