
export const validateProfileDetailFields = (profDetails: any, toast: any) => {
    const { full_name, Experience, phone, email, city } = profDetails;

    // Validate full_name
    const nameRegex = /^(?=.*[a-zA-Z0-9])([a-zA-Z0-9 !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*)$/;
    if (!nameRegex.test(full_name) || /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(full_name)) {
        toast({
            variant: "destructive",
            description: "Invalid full name",
        });
        return false;
    }

    // Validate Experience
    const experienceNumber = parseInt(Experience, 10);
    if (isNaN(experienceNumber) || experienceNumber < 0) {
        toast({
            variant: "destructive",
            description: "Experience must be a positive number",
        });
        return false;
    }

    // Validate phone (simple regex for illustration, adjust as needed)
    const phoneRegex = /^\+\d \(\d{3}\) \d{3}-\d{4}$/;
    if (!phoneRegex.test(phone)) {
        toast({
            variant: "destructive",
            description: "Invalid phone number",
        });
        return false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        toast({
            variant: "destructive",
            description: "Invalid email address",
        });
        return false;
    }

    // Validate city
    const cityRegex = /^(?=.*[a-zA-Z0-9])([a-zA-Z0-9 !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*)$/;
    if (!cityRegex.test(city) || /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(city)) {
        toast({
            variant: "destructive",
            description: "Invalid city name",
        });
        return false;
    }

    return true;
};


export const validateProfileAgentFields = (profAgentDetails: any, toast: any) => {
    const { Agency_name, Agency_bio, Expertise, Tax_number, Service_area } = profAgentDetails;

    const alphanumericRegex = /^(?=.*[a-zA-Z0-9])([a-zA-Z0-9 !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*)$/;
    const specialCharactersOnlyRegex = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;

    const validateField = (field: string, fieldName: string) => {
        if (field && (!alphanumericRegex.test(field) || specialCharactersOnlyRegex.test(field))) {
            toast({
                variant: "destructive",
                description: `${fieldName} cannot be only special characters`,
            });
            return false;
        }
        return true;
    };

    // Validate each field individually
    if (!validateField(Agency_name, "Agency name") ||
        !validateField(Agency_bio, "Agency bio") ||
        !validateField(Expertise, "Expertise") ||
        !validateField(Tax_number, "Tax number") ||
        !validateField(Service_area, "Service area")) {
        return false;
    }

    return true;
};


export const isOnlySpecialCharacters = (input: string): boolean => {
    const specialCharactersOnlyRegex = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
    return specialCharactersOnlyRegex.test(input);
};

export const isNumeric = (input: string): boolean => {
    const numericRegex = /^\d+$/;
    return numericRegex.test(input);
};

export const containsAlphabet = (input: string): boolean => {
    const alphabetRegex = /[a-zA-Z]/;
    return alphabetRegex.test(input);
};

export const validateNewListingFields = (fields: any): string | null => {
    if (!fields.name || isOnlySpecialCharacters(fields.name.trim()) || !containsAlphabet(fields.name.trim())) {
        return "Name must contain at least one alphabet character and cannot be only special characters";
    }

    if (!fields.location || isOnlySpecialCharacters(fields.location.trim()) || !containsAlphabet(fields.location.trim())) {
        return "Location must contain at least one alphabet character and cannot be only special characters";
    }

    if (!fields.price || isNaN(Number(fields.price))) {
        return "Price must be a valid number";
    }

    if (!fields.description || isOnlySpecialCharacters(fields.description.trim()) || !containsAlphabet(fields.description.trim())) {
        return "Description must contain at least one alphabet character and cannot be only special characters";
    }

    if (!fields.address || isOnlySpecialCharacters(fields.address.trim()) || !containsAlphabet(fields.address.trim())) {
        return "Address must contain at least one alphabet character and cannot be only special characters";
    }

    if (!fields.city || isOnlySpecialCharacters(fields.city.trim()) || !containsAlphabet(fields.city.trim())) {
        return "City must contain at least one alphabet character and cannot be only special characters";
    }

    if (!fields.country || isOnlySpecialCharacters(fields.country.trim()) || !containsAlphabet(fields.country.trim())) {
        return "Country must contain at least one alphabet character and cannot be only special characters";
    }

    if (!fields.zip || !isNumeric(fields.zip.trim())) {
        return "Zip code must be numeric";
    }

    return null;
};


export const validateNewServiceFields = (fields: any): string | null => {
    // Validate name
    if (!fields.name || isOnlySpecialCharacters(fields.name.trim()) || isNumeric(fields.name.trim())) {
        return "Name cannot be only special characters or only numbers";
    }

    // Validate location
    if (!fields.location || isOnlySpecialCharacters(fields.location.trim()) || isNumeric(fields.location.trim())) {
        return "Location cannot be only special characters or only numbers";
    }

    // Validate price
    if (!fields.price || isNaN(Number(fields.price))) {
        return "Price must be a valid number";
    }

    // Validate description
    if (!fields.description || isOnlySpecialCharacters(fields.description.trim()) || isNumeric(fields.description.trim())) {
        return "Description cannot be only special characters or only numbers";
    }

    return null;
};


export const validateArticleFields = (fields: any): string | null => {
    // Validate title
    if (!fields.title || isOnlySpecialCharacters(fields.title.trim()) || isNumeric(fields.title.trim())) {
        return "Title cannot be empty, consist only of special characters, or only numbers";
    }

    // Validate description
    if (!fields.description || isOnlySpecialCharacters(fields.description.trim())) {
        return "Description cannot be empty or consist only of special characters";
    }

    return null;
};

export const validatePortfolioFields = (fields: any): string | null => {
    // Validate name
    if (!fields.name || isOnlySpecialCharacters(fields.name.trim()) || isNumeric(fields.name.trim())) {
        return "Name cannot be empty, consist only of special characters, or only numbers";
    }

    // Validate location
    if (!fields.location || isOnlySpecialCharacters(fields.location.trim()) || isNumeric(fields.location.trim())) {
        return "Location cannot be empty, consist only of special characters, or only numbers";
    }

    // Validate price
    if (!fields.price || isNaN(Number(fields.price))) {
        return "Price must be a valid number";
    }

    // Validate description
    if (!fields.description || isOnlySpecialCharacters(fields.description.trim())) {
        return "Description cannot be empty or consist only of special characters";
    }

    return null;
};

