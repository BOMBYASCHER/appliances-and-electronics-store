package io.hexlet.service;

import io.hexlet.dto.ReturnDTO;
import io.hexlet.dto.ReturnRequestDTO;
import io.hexlet.exception.AccessDeniedException;
import io.hexlet.exception.ResourceNotFoundException;
import io.hexlet.mapper.ReturnMapper;
import io.hexlet.model.entity.Purchase;
import io.hexlet.model.entity.Return;
import io.hexlet.model.entity.User;
import io.hexlet.repository.PurchaseRepository;
import io.hexlet.repository.ReturnRepository;
import io.hexlet.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    @Autowired
    private ReturnMapper returnMapper;

    @Transactional
    public void createReturn(int userId, ReturnRequestDTO request, MultipartFile photoFile) throws IOException {
        User user = getUserOrThrow(userId);

        Purchase purchase = purchaseRepository.findByIdAndOrderId(request.getPurchaseId(), request.getOrderId())
                .orElseThrow(() -> new ResourceNotFoundException("Purchase not found in this order"));

        if (purchase.getOrder().getUser().getId() != userId) {
            throw new AccessDeniedException("You are not allowed to create return for this purchase");
        }

        Return returnEntity = returnMapper.toReturnEntity(request, user);
        returnEntity.setPhoto(photoFile.getOriginalFilename());
        returnEntity.setPhotoType(photoFile.getContentType());
        returnEntity.setPhotoDate(photoFile.getBytes());

        returnRepository.save(returnEntity);
    }

    public List<ReturnDTO> getReturnsForUser(int userId) {
        User user = getUserOrThrow(userId);
        List<Return> returns = returnRepository.findByUser(user);

        return returns.stream()
                .map(returnItem -> {
                    Purchase purchase = purchaseRepository.findById(returnItem.getPurchaseId())
                            .orElseThrow(() -> new ResourceNotFoundException("Purchase not found"));

                    return returnMapper.toReturnDTO(returnItem, purchase);
                })
                .collect(Collectors.toList());
    }

    public User getUserOrThrow(Integer userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
    }
}
