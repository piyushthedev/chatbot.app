package com.example.demo;

import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final Map<String, String> otpStorage = new HashMap<>();

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/send-otp")
    public Map<String, String> sendOtp(@RequestBody AuthRequest request) {
        String otp = String.format("%06d", new Random().nextInt(1000000));
        otpStorage.put(request.identifier(), otp);

        // In a real app, send the OTP via email or SMS service
        System.out.println("Generated OTP for " + request.identifier() + ": " + otp);

        Map<String, String> response = new HashMap<>();
        response.put("message", "OTP sent successfully (Check console for mock OTP)");
        return response;
    }

    @PostMapping("/verify-otp")
    public Map<String, Object> verifyOtp(@RequestBody OtpVerificationRequest request) {
        String storedOtp = otpStorage.get(request.identifier());
        Map<String, Object> response = new HashMap<>();

        if (storedOtp != null && storedOtp.equals(request.otp())) {
            // Check if user exists
            boolean userExists = userRepository.findByIdentifier(request.identifier()).isPresent();

            if (!userExists) {
                // Auto-create user for signup flow (or simple first-time login)
                User newUser = new User(request.identifier());
                userRepository.save(newUser);
                System.out.println("Created new user: " + request.identifier());
            }

            response.put("success", true);
            response.put("token", "mock-jwt-token-" + System.currentTimeMillis());
            otpStorage.remove(request.identifier());
        } else {
            response.put("success", false);
            response.put("message", "Invalid OTP");
        }
        return response;
    }
}

record AuthRequest(String identifier) {
}

record OtpVerificationRequest(String identifier, String otp) {
}
