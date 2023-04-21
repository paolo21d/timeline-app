package pl.app.timeline.api.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.app.timeline.api.repository.UserRepository;
import pl.app.timeline.api.model.entity.User;
import pl.app.timeline.api.model.excpetion.UserAlreadyExistsException;
import pl.app.timeline.api.model.excpetion.UserEntityNotFoundException;

import java.util.ArrayList;
import java.util.Optional;

@Service
@Slf4j
class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Long registerUser(String login, String password) {
        Optional<User> existingUser = userRepository.findByLogin(login);
        if (existingUser.isPresent()) {
            throw new UserAlreadyExistsException(login);
        }

        User createdUser = userRepository.save(new User(login, passwordEncoder.encode(password)));
        return createdUser.getUserId();
    }

    @Override
    public User findById(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> UserEntityNotFoundException.notFoundId(userId));
    }

    @Override
    public User findByLogin(String login) {
        return userRepository.findByLogin(login)
                .orElseThrow(() -> UserEntityNotFoundException.notFoundLogin(login));
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = findByLogin(username);

        return new org.springframework.security.core.userdetails.User(
                user.getLogin(),
                user.getPassword(),
                true, //3. argument to czy konto jest aktywne, można ustawić na false dopóki nie zostanie potwierdzony email po rejestracji
                true,
                true,
                true,
                new ArrayList<>() //authorities
        );
    }
}
