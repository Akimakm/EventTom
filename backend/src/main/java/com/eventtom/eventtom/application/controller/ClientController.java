package com.eventtom.eventtom.application.controller;

import com.eventtom.eventtom.persistence.handlers.ClientJsonHandler;
import com.eventtom.eventtom.application.model.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clients")
public class ClientController {
    @Autowired
    private ClientJsonHandler clientJsonHandler;

    @GetMapping
    public List<Client> getAllClients() {
        return clientJsonHandler.readAll();
    }

    @PostMapping
    public void createClient(@RequestBody Client client) {
        List<Client> clients = clientJsonHandler.readAll();
        clients.add(client);
        clientJsonHandler.writeAll(clients);
    }

    @GetMapping("/{id}")
    public Client getClientById(@PathVariable Long id) {
        return clientJsonHandler.readAll().stream()
                .filter(client -> client.getName().equals(id))
                .findFirst()
                .orElse(null);
    }

    @PutMapping("/{id}")
    public void updateClient(@PathVariable Long id, @RequestBody Client updatedClient) {
        List<Client> clients = clientJsonHandler.readAll();
        for (int i = 0; i < clients.size(); i++) {
            if (clients.get(i).getName().equals(updatedClient.getName())) {
                clients.set(i, updatedClient);
                break;
            }
        }
        clientJsonHandler.writeAll(clients);
    }

    @DeleteMapping("/{id}")
    public void deleteClient(@PathVariable Long id) {
        List<Client> clients = clientJsonHandler.readAll();
        clients.removeIf(client -> client.getName().equals(id));
        clientJsonHandler.writeAll(clients);
    }
}
