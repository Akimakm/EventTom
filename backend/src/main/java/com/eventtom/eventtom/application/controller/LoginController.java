package com.eventtom.eventtom.application.controller;

import com.eventtom.eventtom.persistence.UserJsonHandler;
import com.eventtom.eventtom.application.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class LoginController {
    @Autowired
    private UserJsonHandler userJsonHandler;

    // Session store to track logged-in users
    private final Map<String, String> sessionStore = new HashMap<>();

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        List<User> users = userJsonHandler.readAll();
        for (User user : users) {
            if (user.getUsername().equals(username) && user.getPassword().equals(password)) {
                // Generate a simple session token
                String sessionId = username + "-session";
                sessionStore.put(sessionId, username);

                // Return success with session token
                Map<String, String> response = new HashMap<>();
                response.put("message", "Login successful");
                response.put("sessionId", sessionId);
                return response;
            }
        }

        // Return failure if credentials are invalid
        throw new RuntimeException("Invalid username or password");
    }

    @PostMapping("/logout")
    public Map<String, String> logout(@RequestBody Map<String, String> request) {
        String sessionId = request.get("sessionId");

        if (sessionStore.containsKey(sessionId)) {
            sessionStore.remove(sessionId);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Logout successful");
            return response;
        }

        throw new RuntimeException("Invalid session ID");
    }

    @GetMapping("/validate")
    public Map<String, String> validateSession(@RequestParam String sessionId) {
        if (sessionStore.containsKey(sessionId)) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Session valid");
            response.put("username", sessionStore.get(sessionId));
            return response;
        }

        throw new RuntimeException("Invalid session ID");
    }
}
