package io.hexlet.mapper;

import io.hexlet.dto.AuthResponse;
import io.hexlet.dto.RegistrationDTO;
import io.hexlet.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        componentModel = MappingConstants.ComponentModel.SPRING,
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public abstract class UserMapper {

    public abstract User map(RegistrationDTO registrationDTO);

    @Mapping(target = "accessToken", ignore = true)
    @Mapping(target = "fullName", source = "fullName")
    public abstract AuthResponse toAuthResponse(User user);
}
