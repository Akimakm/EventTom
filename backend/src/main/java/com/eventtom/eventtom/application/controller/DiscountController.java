package com.eventtom.eventtom.application.controller;

import com.eventtom.eventtom.persistence.handlers.DiscountJsonHandler;
import com.eventtom.eventtom.application.model.Discount;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/discounts")
public class DiscountController {
    @Autowired
    private DiscountJsonHandler discountJsonHandler;

    @GetMapping
    public List<Discount> getAllDiscounts() {
        return discountJsonHandler.readAll();
    }

    @PostMapping
    public void createDiscount(@RequestBody Discount discount) {
        List<Discount> discounts = discountJsonHandler.readAll();
        discounts.add(discount);
        discountJsonHandler.writeAll(discounts);
    }

    @GetMapping("/{id}")
    public Discount getDiscountById(@PathVariable Long id) {
        return discountJsonHandler.readAll().stream()
                .filter(discount -> discount.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    @PutMapping("/{id}")
    public void updateDiscount(@PathVariable Long id, @RequestBody Discount updatedDiscount) {
        List<Discount> discounts = discountJsonHandler.readAll();
        for (int i = 0; i < discounts.size(); i++) {
            if (discounts.get(i).getId().equals(id)) {
                discounts.set(i, updatedDiscount);
                break;
            }
        }
        discountJsonHandler.writeAll(discounts);
    }

    @DeleteMapping("/{id}")
    public void deleteDiscount(@PathVariable Long id) {
        List<Discount> discounts = discountJsonHandler.readAll();
        discounts.removeIf(discount -> discount.getId().equals(id));
        discountJsonHandler.writeAll(discounts);
    }
}
