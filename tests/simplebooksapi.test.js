//tests for https://simple-books-api.glitch.me/api/books
const axios = require('axios');

const fetchData = async (url) => {
    try {
        const response = await axios.get(url);
        return response;
    } catch (error) {
        throw error;
    }
};

const baseURL = "https://simple-books-api.glitch.me";

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
});