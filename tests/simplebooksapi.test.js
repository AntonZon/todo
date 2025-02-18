//tests for https://simple-books-api.glitch.me/api/books
const axios = require('axios');

const fetchData = async (url, config) => {
    try {
        const response = await axios.get(url, config);
        return response;
    } catch (error) {
        throw error;
    }
};

const postData = async (url, data, config) => {
    try {
        const response = await axios.post(url, data, config);
        return response;
    } catch (error) {
        throw error;
    }
};

const baseURL = "https://simple-books-api.glitch.me";
const randomEmail = Math.random().toString(36).substring(7) + "@test.com";
let token;
let orderId;

describe('Simple book tests', () => {

    describe('Check status', () => {

        it('fetches user data successfully', async () => {
            // Arrange

            // Act
            const response = await fetchData(baseURL + "/status");

            // Assert
            expect(response.status).toBe(200);
            expect(response.statusText).toBe("OK");
        });
    });

    describe('Check List Of Books', () => {

        it('fetches user data successfully', async () => {
            // Arrange

            // Act
            const response = await fetchData(baseURL + "/books");

            // Assert
            expect(response.status).toBe(200);
        });
    });

    describe('Check Get Book', () => {

        it('fetches user data successfully', async () => {
            // Arrange
            const bookId = 1;
            // Act
            const response = await fetchData(baseURL + "/books/" + bookId);

            // Assert
            expect(response.status).toBe(200);
        });
    });

    describe('Authorization (POST)', () => {

        it('Authorization successfully completed', async () => {
            // Arrange

            // Act
            const response = await postData(baseURL + "/api-clients", {
                "clientName": "Postman",
                "clientEmail": randomEmail,
            });

            // Assert
            expect(response.status).toBe(201);
            expect(response.data).toHaveProperty("accessToken");
            token = response.data.accessToken;
        });
    });

    describe('Order book', () => {

        it('Order book successfully', async () => {
            // Arrange

            // Act
            const response = await postData(baseURL + "/orders", {
                "bookId": 5,
                "customerName": "Anton"
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Assert
            expect(response.status).toBe(201);
            expect(response.data).toHaveProperty("orderId");
            orderId = response.data.orderId;
        });
    });
   
    describe('Check Get orders', () => {

        it('fetches orders successfully', async () => {
            // Arrange
            
            // Act
            const response = await fetchData(baseURL + "/orders", {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Assert
            expect(response.status).toBe(200);
        });
    });
    
 /*   describe('Check patch the order', () => {

        it('fetches user order successfully', async () => {
            // Arrange
            const bookId = 1;
            // Act
            const response = await fetchData(baseURL + `/orders/${orderId}`, {
                headers: { Authorization: `Bearer ${token}`}});
            // Assert
            expect(response.status).toBe(200);
        });
    });
*/

    describe('Check Get The Order', () => {

        it('fetches user order successfully', async () => {
            // Arrange
            const bookId = 1;
            // Act
            const response = await fetchData(baseURL + `/orders/${orderId}`, {
                headers: { Authorization: `Bearer ${token}`}});
            // Assert
            expect(response.status).toBe(200);
        });
    });
});