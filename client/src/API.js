const SERVER_HOST = "http://localhost";
const SERVER_PORT = 3001;

const SERVER_BASE = `${SERVER_HOST}:${SERVER_PORT}/api/`;


async function logIn(credentials) {
    //call: POST /api/...
        response = await fetch("/api/counterSessions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });

    
    if (response.ok) {
      console.log("client: login returned ok from server");
      let user = await response.json();
      return user;
    } else {
      try {
        const errDetail = await response.json();
        throw errDetail.message;
      } catch (err) {
        throw err;
      }
     }
    } 
  
  
  async function logOut() {
    await fetch("/api/logout", { method: "POST" });
  }
  
  async function getUserInfo() {
    const response = await fetch("/api/userinfo");
    const userInfo = await response.json();
    if (response.ok) {
      return userInfo;
    } else {
      throw userInfo; // an object with the error coming from the server
    }
  }

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
    logIn,
    logOut,
    getUserInfo,
    newTicket };

export default API;





  
  
