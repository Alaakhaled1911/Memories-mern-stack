// Simple API test script
// Run with: node test-api.js

const API_BASE_URL = "https://memories-mern-stack-hvyh-qjhj7cp8x.vercel.app";

async function testAPI() {
  console.log("Testing API endpoints...\n");

  // Test posts endpoint
  try {
    console.log("Testing /api/posts...");
    const postsResponse = await fetch(`${API_BASE_URL}/posts`);
    console.log("Posts endpoint status:", postsResponse.status);
    if (postsResponse.ok) {
      const postsData = await postsResponse.json();
      console.log(
        "Posts data received:",
        Array.isArray(postsData) ? `${postsData.length} posts` : "Not an array"
      );
    }
  } catch (error) {
    console.error("Posts endpoint error:", error.message);
  }

  // Test users endpoint (signup)
  try {
    console.log("\nTesting /api/users/signUp...");
    const signupResponse = await fetch(`${API_BASE_URL}/users/signUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: "Test",
        lastName: "User",
        email: "test@example.com",
        password: "testpassword",
      }),
    });
    console.log("Signup endpoint status:", signupResponse.status);
  } catch (error) {
    console.error("Signup endpoint error:", error.message);
  }

  console.log("\nAPI test completed!");
}

testAPI();
