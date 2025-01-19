package com.eventtom.eventtom.application.controller;

import com.eventtom.eventtom.application.model.User;
import com.eventtom.eventtom.persistence.handlers.DataPersistence;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class LoginControllerTest {

    private LoginController loginController;
    private DataPersistence<User> mockUserJsonHandler;

    @BeforeEach
    void setUp() {
        mockUserJsonHandler = Mockito.mock(DataPersistence.class);
        loginController = new LoginController();
        loginController.setUserJsonHandler(mockUserJsonHandler);
    }

    @Test
    void testLoginSuccess() {
        // Arrange
        User user = new User();
        user.setUsername("testuser");
        user.setPassword("password123");
        user.setRole("customer");
        user.setId(1L);

        when(mockUserJsonHandler.readAll()).thenReturn(List.of(user));

        Map<String, String> credentials = Map.of("username", "testuser", "password", "password123");

        // Act
        Map<String, String> response = loginController.login(credentials);

        // Assert
        assertEquals("Login successful", response.get("message"));
        assertNotNull(response.get("sessionId"));
        assertEquals("testuser", response.get("username"));
        assertEquals("customer", response.get("role"));
    }

    @Test
    void testLoginFailureInvalidCredentials() {
        // Arrange
        when(mockUserJsonHandler.readAll()).thenReturn(List.of());

        Map<String, String> credentials = Map.of("username", "wronguser", "password", "wrongpass");

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> loginController.login(credentials));
        assertEquals("Invalid username or password", exception.getMessage());
    }
}
