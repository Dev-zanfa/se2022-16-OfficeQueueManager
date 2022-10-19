const SERVER_HOST = "http://localhost";
const SERVER_PORT = 3001;

const SERVER_BASE = `${SERVER_HOST}:${SERVER_PORT}/api/`;

const newTicket = async service => {
    try {
      const response = await fetch(
        new URL("ticket", SERVER_BASE), {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body:  JSON.stringify({service: service}),
        }
      );
    } catch (e) {
      throw e;
    }
};

  
const API = {
    newTicket,
};

export default API;
  