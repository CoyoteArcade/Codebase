export default class RestController {
    constructor() {
        if (RestController.instance) {
            return RestController.instance;
        }

        const isProduction = import.meta.env.PROD;
        this.baseUrl = isProduction ? import.meta.env.VITE_BACKEND_URL : 'http://localhost:3000';

        RestController.instance = this;
    }

    static getInstance() {
        if (!RestController.instance) {
            RestController.instance = new RestController();
        }
        return RestController.instance;
    }
    
    async get(path) {
        const response = await fetch(`${this.baseUrl}${path}`);
        return response.json();
    }
    
    async post(path, body) {
        const response = await fetch(`${this.baseUrl}${path}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        return response.json();
    }
    
    async put(path, body) {
        const response = await fetch(`${this.baseUrl}${path}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        return response.json();
    }
    
    async delete(path) {
        const response = await fetch(`${this.baseUrl}${path}`, { method: 'DELETE' });
        return response.json();
    }
}

// Usage
// const restController = RestController.getInstance();