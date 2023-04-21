package pl.app.timeline.api.service;


import org.springframework.security.core.userdetails.UserDetailsService;
import pl.app.timeline.api.model.entity.User;

public interface UserService extends UserDetailsService {

    Long registerUser(String login, String password);

    User findById(Long userId);

    User findByLogin(String login);
}
