// CORS test script
// Run with: node test-cors.js

const API_BASE_URL =
  "https://memories-mern-stack-hvyh-qjhj7cp8x.vercel.app/api";

async function testCORS() {
  console.log("Testing CORS configuration...\n");

  try {
    console.log("Testing OPTIONS preflight request...");
    const optionsResponse = await fetch(`${API_BASE_URL}/posts`, {
      method: "OPTIONS",
      headers: {
        Origin: "https://memories-mern-stack-hvyh-8vhp5rja7.vercel.app",
        "Access-Control-Request-Method": "GET",
        "Access-Control-Request-Headers": "Content-Type",
      },
    });

    console.log("OPTIONS response status:", optionsResponse.status);
    console.log("CORS headers:");
    console.log(
      "- Access-Control-Allow-Origin:",
      optionsResponse.headers.get("Access-Control-Allow-Origin")
    );
    console.log(
      "- Access-Control-Allow-Methods:",
      optionsResponse.headers.get("Access-Control-Allow-Methods")
    );
    console.log(
      "- Access-Control-Allow-Headers:",
      optionsResponse.headers.get("Access-Control-Allow-Headers")
    );
  } catch (error) {
    console.error("CORS test error:", error.message);
  }

  try {
    console.log("\nTesting GET request...");
    const getResponse = await fetch(`${API_BASE_URL}/posts`, {
      method: "GET",
      headers: {
        Origin: "https://memories-mern-stack-hvyh-8vhp5rja7.vercel.app",
      },
    });

    console.log("GET response status:", getResponse.status);
    console.log("Response headers:");
    console.log(
      "- Access-Control-Allow-Origin:",
      getResponse.headers.get("Access-Control-Allow-Origin")
    );
  } catch (error) {
    console.error("GET request error:", error.message);
  }

  console.log("\nCORS test completed!");
}

testCORS();
