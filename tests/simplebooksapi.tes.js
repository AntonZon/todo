//tests for https://simple-books-api.glitch.me/api/books
const console = require('console'); // import { log, error } from "console";

const axios = require('axios');
const baseURL = "https://simple-books-api.glitch.me";
const randomEmail = Math.random().toString(36).substring(7) + "@test.com";
const randomName = Math.random().toString(36).substring(7);
const bookId = 3; //Math.floor(Math.random()*6) + 1;
let token;
let orderId;

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

const patchData = async (url, data, config) => {
    try {
        const response = await axios.patch(url, data, config);
        return response;
    } catch (error) {
        throw error;
    }
};

const delData = async (url, config) => {
    try {
        const response = await axios.delete(url, config);
        return response;
    } catch (error) {
        throw error;
    }
};


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
            console.log("List of books: ");
            console.log(response.data);

        });
    });

    describe('Check Get Book', () => {

        it('fetches user data successfully', async () => {
            // Arrange

            // Act
            const response = await fetchData(baseURL + "/books/" + bookId);

            // Assert
            expect(response.status).toBe(200);

            console.log(`Book #${bookId} info: `);
            console.log(response.data);
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
            console.log("Authorization token: " + response.data.accessToken);
        });
    });

    describe('Order book', () => {

        it('Order book successfully', async () => {
            // Arrange

            // Act
            const response = await postData(baseURL + "/orders", {
                "bookId": bookId,
                "customerName": randomName
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Assert
            expect(response.status).toBe(201);
            expect(response.data).toHaveProperty("orderId");
            orderId = response.data.orderId;
            console.log("New order ID: " + orderId);
        });
    });

    describe('Check Order book fail', () => {

        it('Order book successfully fail (id=100)', async () => {
            // Arrange

            // Act
            try {
                const response = await postData(baseURL + "/orders", {
                    "bookId": 100,
                    "customerName": "Anton"
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } catch (error) {
                // Assert
                expect(error.response.status).toBe(400);
                console.log("Book not found.");
            }
        });

        it('Order book successfully fail No authorisation', async () => {

            try {
                const response = await postData(baseURL + "/orders", {
                    "bookId": 2,
                    "customerName": "Anton"
                });
                console.log(response.error);
            } catch (error) {
                // Assert
                expect(error.response.status).toBe(401);

            }
        });

        it('Order book successfully fail NoAvailible #2', async () => {
            try {
                const response = await postData(baseURL + "/orders", {
                    "bookId": 2,
                    "customerName": "Anton"
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log(response.error);
            } catch (error) {
                // Assert
                expect(error.response.status).toBe(404);
            };
            // Assert
            console.log("No new order");
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
            console.log("Orders List: ");
            console.log(response.data);
        });
    });

    describe('Check update the order', () => {

        it('fetches user order successfully', async () => {
            // Arrange

            // Act
            const response = await patchData(baseURL + `/orders/${orderId}`,
                { "customerName": `Anton ${orderId}` },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            // Assert
            expect(response.status).toBe(204);
            console.log(`New name for order:  Anton ${orderId}`);
        });
    });


    describe('Check Get The Order', () => {

        it('fetches user order successfully', async () => {
            // Arrange
            const bookId = 1;
            // Act
            const response = await fetchData(baseURL + `/orders/${orderId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Assert
            expect(response.status).toBe(200);
            expect(response.data.customerName).toBe(`Anton ${orderId}`);
        });
    });

    describe('Check deleting the order', () => {

        it('delete user order successfully', async () => {
            // Arrange

            // Act
            const response = await delData(baseURL + `/orders/${orderId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            // Assert
            expect(response.status).toBe(204);
            console.log(`Order ${orderId} sucsesfully deleted.`);
        });
    });

    describe('Check fail deleting Order', () => {

        it('deleting user order successfully failed', async () => {
            // Arrange

            // Act
            expect(async () => { 
                const response = await fetchData(baseURL + `/orders/${orderId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                }); 
            }).rejects.toThrow('Request failed with status code 404');


 /*           try {
                const response = await fetchData(baseURL + `/orders/${orderId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
*///         } catch (error) {
                // Assert
               
    //            expect(error.status).toBe(404);
    //           console.log(error.status + `. Order ${orderId} not found.`);
   //         }
        
        });
    });
});