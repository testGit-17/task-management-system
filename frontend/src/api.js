const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/$/, "");

async function request(path, options = {}) {
    const token = localStorage.getItem("token");
    const headers = new Headers(options.headers);

    if (options.body && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }

    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers,
    });
    const responseText = await response.text();
    let payload = null;

    if (responseText) {
        try {
            payload = JSON.parse(responseText);
        } catch {
            throw new Error("The server returned an invalid response.");
        }
    }

    if (!response.ok) {
        const message = payload?.message || payload?.error || `Request failed (${response.status}).`;
        throw new Error(message);
    }

    return payload;
}

const api = {
    get(path) {
        return request(path);
    },
    post(path, body) {
        return request(path, {
            method: "POST",
            body: JSON.stringify(body),
        });
    },
    put(path, body) {
        return request(path, {
            method: "PUT",
            body: JSON.stringify(body),
        });
    },
    delete(path) {
        return request(path, { method: "DELETE" });
    },
};

export default api;
