package com.piranyaHub.landLordBackend.model.subModel;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document

public class Contact {

    private String name;
    private String phoneNumber;
    private String email;
    private String lineId;

}
