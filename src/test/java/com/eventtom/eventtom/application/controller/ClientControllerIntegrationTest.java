package com.eventtom.eventtom.application.controller;

import com.eventtom.eventtom.application.model.Client;
import com.eventtom.eventtom.persistence.handlers.ClientJsonHandler;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ClientController.class)
public class ClientControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ClientJsonHandler clientJsonHandler;

    private List<Client> clientList;

    @BeforeEach
    public void setUp() {
        clientList = new ArrayList<>();
        Mockito.when(clientJsonHandler.readAll()).thenReturn(clientList);
    }

    @Test
    public void testCreateClient() throws Exception {
        // Arrange
        Client newClient = new Client();
        newClient.setName("John Doe");

        String newClientJson = "{\"name\":\"John Doe\"}";

        // Act & Assert
        mockMvc.perform(post("/api/clients")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(newClientJson))
                .andExpect(status().isOk());

        Mockito.verify(clientJsonHandler).writeAll(Mockito.argThat(clients ->
                clients.stream().anyMatch(client ->
                        client.getName().equals("John Doe"))));
    }

    @Test
    public void testGetAllClientsAfterCreation() throws Exception {
        // Arrange
        Client existingClient = new Client();
        existingClient.setName("Jane Doe");
        clientList.add(existingClient);
        Mockito.when(clientJsonHandler.readAll()).thenReturn(clientList);

        // Act & Assert
        mockMvc.perform(get("/api/clients"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].name").value("Jane Doe"));
    }
}
