package pl.app.timeline.api.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import pl.app.timeline.api.model.dto.UserLoginDTO;
import pl.app.timeline.api.model.entity.User;
import pl.app.timeline.api.service.UserService;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@AllArgsConstructor
public class CustomUsernamePasswordAuthFilter extends UsernamePasswordAuthenticationFilter {
    UserService userService;
    Environment environment;

    public CustomUsernamePasswordAuthFilter(UserService userService, Environment environment, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.environment = environment;
        super.setAuthenticationManager(authenticationManager);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                                HttpServletResponse response) throws AuthenticationException {
        try {
            UserLoginDTO creds = new ObjectMapper().readValue(request.getInputStream(), UserLoginDTO.class);
            return getAuthenticationManager().authenticate(
                    new UsernamePasswordAuthenticationToken(
                            creds.login(),
                            creds.password(),
                            new ArrayList<>()
                    )
            );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication auth) throws IOException, ServletException {
        String userName = ((org.springframework.security.core.userdetails.User) auth.getPrincipal()).getUsername();
        User user = userService.findByLogin(userName);
        String tokenSecret = environment.getProperty("token.secret");
        Long tokenExpirationTime = Long.parseLong(environment.getProperty("token.expiration_time"));

        Algorithm algorithm = Algorithm.HMAC256(tokenSecret.getBytes());
        String token = JWT.create()
                .withSubject(user.getUserId().toString())
                .withExpiresAt(new Date(System.currentTimeMillis() + tokenExpirationTime))
                .withIssuer(request.getRequestURL().toString())
                .withClaim("user-name", userName)
                .sign(algorithm);

//        response.addHeader("token", token);
        response.addHeader("user-id", user.getUserId().toString());
        response.addHeader("user-name", user.getLogin());

        Map<String, String> tokenResponse = new HashMap<>();
        tokenResponse.put("access_token", token);
        response.setContentType(APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(), tokenResponse);
    }
}