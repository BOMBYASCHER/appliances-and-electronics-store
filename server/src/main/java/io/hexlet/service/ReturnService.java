package io.hexlet.service;

import io.hexlet.dto.ReturnDTO;
import io.hexlet.dto.ReturnRequestDTO;
import io.hexlet.model.Purchase;
import io.hexlet.model.Return;
import io.hexlet.model.User;
import io.hexlet.repository.PurchaseRepository;
import io.hexlet.repository.ReturnRepository;
import io.hexlet.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReturnService {

    @Autowired
    private ReturnRepository returnRepository;

    @Autowired
    private PurchaseRepository purchaseRepository;

    @Autowired
    private UserRepository userRepository;

    public void createReturn(int userId, ReturnRequestDTO request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Purchase purchase = purchaseRepository.findByIdAndOrderId(request.getPurchaseId(), request.getOrderId())
                .orElseThrow(() -> new EntityNotFoundException("Purchase not found in this order"));

        if (purchase.getOrder().getUser().getId() != userId) {
            throw new ResponseStatusException(
                        HttpStatus.FORBIDDEN,
                        "You are not allowed to create return for this purchase"
                    );
        }

        Return returnEntity = new Return();
        returnEntity.setPurchaseId(request.getPurchaseId());
        returnEntity.setReason(request.getReason());
        returnEntity.setPhoto(request.getPhoto());
        returnEntity.setUser(user);
        returnEntity.setDate(null);

        returnRepository.save(returnEntity);
    }

    public List<ReturnDTO> getReturnsForUser(int userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        List<Return> returns = returnRepository.findByUser(user);
        return returns.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private ReturnDTO convertToDTO(Return returnItem) {
        Purchase purchase = purchaseRepository.findById(returnItem.getPurchaseId())
                .orElseThrow(() -> new EntityNotFoundException("Purchase not found"));

        ReturnDTO dto = new ReturnDTO();
        dto.setId(returnItem.getId());
        dto.setOrderId(purchase.getOrder().getId());
        dto.setProductId(purchase.getProduct().getId());
        dto.setOrderTitle(purchase.getOrder().getTitle());
        dto.setProductTitle(purchase.getProductTitle());
        dto.setImage(purchase.getProductImage());
        dto.setTotalAmount(purchase.getOrder().getTotalAmount());
        dto.setPrice(purchase.getProductPrice());
        dto.setQuantity(purchase.getQuantity());
        dto.setDate(null);
        dto.setReason(returnItem.getReason());
        dto.setPhoto(returnItem.getPhoto());

        return dto;
    }
}
