package io.hexlet.service;

import io.hexlet.model.entity.User;
import io.hexlet.model.entity.CustomUserDetails;
import io.hexlet.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String phone) throws UsernameNotFoundException {
        User user = userRepository.findByPhone(phone);

        if (user == null) {
            throw new UsernameNotFoundException("user not found");
        }

        return new CustomUserDetails(user);
    }
}
