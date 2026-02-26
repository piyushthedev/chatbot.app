package com.example.demo;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final ChatClient chatClient;

    public ChatController(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    @GetMapping("/stream")
    public Flux<String> streamChat(@RequestParam String message) {
        return chatClient.prompt()
                .user(message)
                .stream()
                .content();
    }

    @PostMapping
    public String chat(@RequestBody ChatRequest request) {
        return chatClient.prompt()
                .user(request.message())
                .call()
                .content();
    }
}

record ChatRequest(String message) {
}
